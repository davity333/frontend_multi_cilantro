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
    <div className="w-full h-full p-20 bg-gradient-to-br from-green-50 to-orange-50 rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex items-center mb-4 md:mb-0">
          <svg className="w-8 h-8 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
          </svg>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
            Estado del Cilantro
          </h1>
        </div>
        
        <div className="flex flex-col gap-2 w-full md:w-auto">
          {moistureAlertActive && (
            <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700 flex items-center rounded-r-lg shadow-sm">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <span className="font-medium">¡ALERTA! Nivel de humedad bajo</span>
            </div>
          )}
          
          {tempAlertActive && (
            <div className="p-3 bg-orange-100 border-l-4 border-orange-500 text-orange-700 flex items-center rounded-r-lg shadow-sm">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <span className="font-medium">¡ALERTA! Temperatura elevada</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 7a1 1 0 11-2 0 1 1 0 012 0zm-3 3a1 1 0 11-2 0 1 1 0 012 0zm-3 3a1 1 0 11-2 0 1 1 0 012 0z"></path>
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
            </svg>
            <span className="font-semibold text-gray-700">Estado de Humedad</span>
          </div>
          <div className={`px-3 py-2 rounded-md ${lastMoistureMessage?.includes('ALERTA') ? 'bg-red-50' : 'bg-green-50'}`}>
            <span className={`text-lg ${lastMoistureMessage?.includes('ALERTA') ? 'text-red-600 font-bold' : 'text-green-600'}`}>
              {lastMoistureMessage || "Esperando datos..."}
            </span>
          </div>
        </div>
        
        <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-md border-l-4 border-orange-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 mr-2 text-orange-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 000-12v12z" clipRule="evenodd"></path>
            </svg>
            <span className="font-semibold text-gray-700">Estado de Temperatura</span>
          </div>
          <div className={`px-3 py-2 rounded-md ${lastTempMessage?.includes('ALERTA') ? 'bg-orange-50' : 'bg-green-50'}`}>
            <span className={`text-lg ${lastTempMessage?.includes('ALERTA') ? 'text-orange-600 font-bold' : 'text-green-600'}`}>
              {lastTempMessage || "Esperando datos..."}
            </span>
          </div>
        </div>
      </div>
      
      <div className="bg-white bg-opacity-90 p-4 rounded-lg shadow-md h-64 md:h-80">
        <Line data={data} options={{
          ...options,
          plugins: {
            ...options.plugins,
            legend: {
              ...options.plugins?.legend,
              labels: {
                ...options.plugins?.legend?.labels,
                usePointStyle: true,
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              ...options.plugins?.tooltip,
              backgroundColor: 'rgba(52, 211, 153, 0.8)',
              titleColor: 'white',
              bodyColor: 'white',
              borderColor: '#34D399',
              borderWidth: 1,
              padding: 10,
              boxPadding: 5,
              usePointStyle: true
            }
          }
        }} />
      </div>
    </div>
  );
}

export default GraficaEstruct;