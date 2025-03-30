import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import useWebSocket from '../../Pages/WebSocket';

// Register required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function GraficaEstruct() {
  // Estado para almacenar las últimas 7 lecturas de humedad
  const [humedadData, setHumedadData] = useState([40, 35, 35, 45, 30, 50, 40]);
  // Estado para almacenar las últimas 7 lecturas de temperatura
  const [temperaturaData, setTemperaturaData] = useState([90, 38, 25, 48, 40, 105, 98]);
  // Estado para almacenar timestamps o etiquetas de tiempo
  const [timeLabels, setTimeLabels] = useState(['', '', '', '', '', '', '']);
  // Estado para el último mensaje de humedad
  const [lastMoistureMessage, setLastMoistureMessage] = useState("");
  // Estado para el último mensaje de temperatura
  const [lastTempMessage, setLastTempMessage] = useState("");
  // Estado para la alerta de humedad
  const [moistureAlertActive, setMoistureAlertActive] = useState(false);
  // Estado para la alerta de temperatura
  const [tempAlertActive, setTempAlertActive] = useState(false);
  
  // Conectar al WebSocket
  const { messages } = useWebSocket("ws://welcomw:4000/ws");
  
  // Manejar los nuevos mensajes del WebSocket
  useEffect(() => {    
    console.log(messages);
    
    if (messages.length > 0) {
      try {

        // Intentar parsear el último mensaje recibido
        const lastMessage = messages[messages.length - 1];
        const parsedData = JSON.parse(lastMessage);
        
        // Obtener la hora actual para la etiqueta de tiempo
        const now = new Date();
        const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        // Verificar si es un mensaje de humedad del suelo
        if (parsedData.type === "soil_moisture") {
          // Actualizar el estado con la nueva lectura
          setHumedadData(prevData => {
            const newData = [...prevData.slice(1), parsedData.quantity];
            return newData;
          });
          
          // Actualizar las etiquetas de tiempo
          setTimeLabels(prevLabels => {
            const newLabels = [...prevLabels.slice(1), timeString];
            return newLabels;
          });
          
          // Guardar el mensaje de texto
          setLastMoistureMessage(parsedData.text);
          
          // Activar la alerta si es necesario
          setMoistureAlertActive(parsedData.quantity < 20);
        }
        // Verificar si es un mensaje de temperatura
        else if (parsedData.type === "temperature") {
          // Actualizar el estado con la nueva lectura de temperatura
          setTemperaturaData(prevData => {
            const newData = [...prevData.slice(1), parsedData.quantity];
            return newData;
          });
          
          // Guardar el mensaje de texto de temperatura
          setLastTempMessage(parsedData.text);
          
          // Activar la alerta de temperatura si es necesario (por ejemplo, si es mayor a 95)
          setTempAlertActive(parsedData.quantity > 95);
        }
      } catch (error) {
        console.error("Error al parsear el mensaje:", error);
      }
    }
  }, [messages]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    tension: 0.2,
    scales: {
      y: {
        beginAtZero: true,
        max: 120,
        ticks: {
          stepSize: 20
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 10,
          usePointStyle: true,
        }
      },
    },
  };
  
  const data = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Temperatura',
        data: temperaturaData,
        borderColor: 'rgb(255, 225, 0)',
        backgroundColor: 'rgba(255, 213, 0, 0.2)',
        fill: true,
        borderWidth: 3,
        pointRadius: 0,
      },
      {
        label: 'Humedad',
        data: humedadData,
        borderColor: 'rgb(40, 123, 167)',
        backgroundColor: 'rgba(0, 221, 255, 0.2)',
        fill: true,
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  return (
    <div className="w-[150vh] h-[60vh] px-4 bg-[#ceffd143]">
      <div className="flex justify-between items-center">
        <p className='p-7 text-[3.6vh] font-bold text-[#7ab37f]'>Estado del cilantro</p>
        
        <div className="flex flex-col gap-2">
          {moistureAlertActive && (
            <div className="p-4 bg-red-100 border-l-4 border-red-500 text-red-700 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <span>¡ALERTA! Nivel de humedad bajo</span>
            </div>
          )}
          
          {tempAlertActive && (
            <div className="p-4 bg-amber-100 border-l-4 border-amber-500 text-amber-700 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <span>¡ALERTA! Temperatura elevada</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex gap-4">
        <div className="mb-4 p-2 bg-white bg-opacity-70 rounded-lg flex-1">
          <span className="font-medium">Estado de humedad: </span>
          <span className={`${lastMoistureMessage.includes('ALERTA') ? 'text-red-600 font-bold' : 'text-green-600'}`}>
            {lastMoistureMessage || "Esperando datos..."}
          </span>
        </div>
        
        <div className="mb-4 p-2 bg-white bg-opacity-70 rounded-lg flex-1">
          <span className="font-medium">Estado de temperatura: </span>
          <span className={`${lastTempMessage.includes('ALERTA') ? 'text-amber-600 font-bold' : 'text-green-600'}`}>
            {lastTempMessage || "Esperando datos..."}
          </span>
        </div>
      </div>
      
      <div className="h-[45vh]">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default GraficaEstruct;