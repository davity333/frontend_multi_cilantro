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
  // NEW: Estado para almacenar las últimas 7 lecturas de luz
  const [lightData, setLightData] = useState([600, 650, 700, 680, 720, 750, 680]);
  // NEW: Estado para almacenar las últimas 7 lecturas de conductividad eléctrica
  const [ecData, setEcData] = useState([1.2, 1.3, 1.4, 1.2, 1.1, 1.3, 1.2]);
  // Estado para almacenar timestamps o etiquetas de tiempo
  const [timeLabels, setTimeLabels] = useState(['', '', '', '', '', '', '']);
  // Estado para el último mensaje de humedad
  const [lastMoistureMessage, setLastMoistureMessage] = useState("");
  // Estado para el último mensaje de temperatura
  const [lastTempMessage, setLastTempMessage] = useState("");
  // NEW: Estado para el último mensaje de luz
  const [lastLightMessage, setLastLightMessage] = useState("");
  // NEW: Estado para el último mensaje de conductividad eléctrica
  const [lastEcMessage, setLastEcMessage] = useState("");
  // Estado para la alerta de humedad
  const [moistureAlertActive, setMoistureAlertActive] = useState(false);
  // Estado para la alerta de temperatura
  const [tempAlertActive, setTempAlertActive] = useState(false);
  // NEW: Estado para la alerta de luz
  const [lightAlertActive, setLightAlertActive] = useState(false);
  // NEW: Estado para la alerta de conductividad eléctrica
  const [ecAlertActive, setEcAlertActive] = useState(false);
  // Estado para errores de conexión
  const [connectionError, setConnectionError] = useState("");
  // NEW: Estado para controlar qué gráficas mostrar
  const [activeCharts, setActiveCharts] = useState({
    temperature: true,
    moisture: true,
    light: false,
    ec: false
  });
  
  // Usar el hook WebSocket mejorado
  const { messages, isConnected, error, sendMessage, reconnect } = useWebSocket('ws://52.23.135.169:4000/v1/message/ws');

  // Mostrar token para depuración  
  const handleShow = () => {
    const token = localStorage.getItem('token');
    alert(token ? `Token: ${token}` : 'No token found');
  };
  
  // Función para reconectar manualmente
  const handleReconnect = () => {
    reconnect();
    setConnectionError("");
  };
  
  // Actualizar el estado de error de conexión
  useEffect(() => {
    if (error) {
      setConnectionError(error);
    }
  }, [error]);

  // Manejar los nuevos mensajes del WebSocket
  useEffect(() => {    
    if (messages.length > 0) {
      try {
        // Intentar parsear el último mensaje recibido
        const lastMessage = messages[messages.length - 1];
        const parsedData = JSON.parse(lastMessage);
        
        // Obtener la hora actual para la etiqueta de tiempo
        const now = new Date();
        const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        // Verificar el tipo de mensaje y actualizar el estado correspondiente
        switch(parsedData.type) {
          case "soil_moisture":
            // Actualizar el estado con la nueva lectura
            setHumedadData(prevData => {
              const newData = [...prevData.slice(1), parsedData.quantity];
              return newData;
            });
            
            // Guardar el mensaje de texto
            setLastMoistureMessage(parsedData.text);
            
            // Activar la alerta si es necesario
            setMoistureAlertActive(parsedData.quantity < 20);
            
            // Actualizar las etiquetas de tiempo (solo hacemos esto una vez por ciclo de mensajes)
            setTimeLabels(prevLabels => {
              const newLabels = [...prevLabels.slice(1), timeString];
              return newLabels;
            });
            break;
            
          case "temperature":
            // Actualizar el estado con la nueva lectura de temperatura
            setTemperaturaData(prevData => {
              const newData = [...prevData.slice(1), parsedData.quantity];
              return newData;
            });
            
            // Guardar el mensaje de texto de temperatura
            setLastTempMessage(parsedData.text);
            
            // Activar la alerta de temperatura si es necesario
            setTempAlertActive(parsedData.quantity > 95);
            break;
            
          case "light":
            // Actualizar el estado con la nueva lectura de luz
            setLightData(prevData => {
              const newData = [...prevData.slice(1), parsedData.quantity];
              return newData;
            });
            
            // Guardar el mensaje de texto de luz
            setLastLightMessage(parsedData.text);
            
            // Activar la alerta de luz si es necesario (ejemplo: < 300 para poca luz)
            setLightAlertActive(parsedData.quantity < 300);
            break;
            
          case "electrical_conductivity":
            // Actualizar el estado con la nueva lectura de EC
            setEcData(prevData => {
              const newData = [...prevData.slice(1), parsedData.quantity];
              return newData;
            });
            
            // Guardar el mensaje de texto de EC
            setLastEcMessage(parsedData.text);
            console.log(parsedData.text);
            
            
            // Activar la alerta de EC si es necesario (ejemplo: > 2.0 muy alta)
            setEcAlertActive(parsedData.quantity > 2.0);
            break;
            
          default:
            console.warn("Tipo de mensaje desconocido:", parsedData.type);
        }
      } catch (error) {
        console.error("Error al parsear el mensaje:", error);
      }
    }
  }, [messages]);

  // Función para alternar la visibilidad de cada gráfica
  const toggleChart = (chartType) => {
    setActiveCharts(prev => ({
      ...prev,
      [chartType]: !prev[chartType]
    }));
  };

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
  
  // Opciones específicas para EC (escala diferente)
  const ecOptions = {
    ...options,
    scales: {
      ...options.scales,
      y: {
        ...options.scales.y,
        beginAtZero: true,
        max: 3,
        ticks: {
          stepSize: 0.5
        }
      }
    }
  };
  
  // Crear el conjunto de datos para la gráfica basado en los sensores activos
  const getDatasets = () => {
    const datasets = [];
    
    if (activeCharts.temperature) {
      datasets.push({
        label: 'Temperatura',
        data: temperaturaData,
        borderColor: 'rgb(255, 225, 0)',
        backgroundColor: 'rgba(255, 213, 0, 0.2)',
        fill: true,
        borderWidth: 3,
        pointRadius: 0,
      });
    }
    
    if (activeCharts.moisture) {
      datasets.push({
        label: 'Humedad',
        data: humedadData,
        borderColor: 'rgb(40, 123, 167)',
        backgroundColor: 'rgba(0, 221, 255, 0.2)',
        fill: true,
        borderWidth: 2,
        pointRadius: 0,
      });
    }
    
    if (activeCharts.light) {
      datasets.push({
        label: 'Luz',
        data: lightData,
        borderColor: 'rgb(255, 145, 0)',
        backgroundColor: 'rgba(255, 145, 0, 0.2)',
        fill: true,
        borderWidth: 2,
        pointRadius: 0,
        yAxisID: 'y-light',
      });
    }
    
    return datasets;
  };
  
  // Datos para la gráfica principal
  const data = {
    labels: timeLabels,
    datasets: getDatasets(),
  };
  
  // Datos para la gráfica de EC (separada debido a la escala diferente)
  const ecData2 = {
    labels: timeLabels,
    datasets: [
      {
        label: 'Conductividad Eléctrica',
        data: ecData,
        borderColor: 'rgb(128, 0, 128)',
        backgroundColor: 'rgba(128, 0, 128, 0.2)',
        fill: true,
        borderWidth: 2,
        pointRadius: 0,
      }
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
        
        <div className="flex gap-2">
          <button 
            onClick={handleShow}
            className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
          >
            Ver Token
          </button>
          
          {!isConnected && (
            <button 
              onClick={handleReconnect}
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
            >
              Reconectar
            </button>
          )}
        </div>
        
        <div className="flex flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
          {connectionError && (
            <div className="p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 flex items-center rounded-r-lg shadow-sm">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <span className="font-medium">Error de conexión: {connectionError}</span>
            </div>
          )}
          
          {!isConnected && !connectionError && (
            <div className="p-3 bg-blue-100 border-l-4 border-blue-500 text-blue-700 flex items-center rounded-r-lg shadow-sm">
              <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <span className="font-medium">Conectando...</span>
            </div>
          )}
          
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
          
          {lightAlertActive && (
            <div className="p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 flex items-center rounded-r-lg shadow-sm">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <span className="font-medium">¡ALERTA! Nivel de luz bajo</span>
            </div>
          )}
          
          {ecAlertActive && (
            <div className="p-3 bg-purple-100 border-l-4 border-purple-500 text-purple-700 flex items-center rounded-r-lg shadow-sm">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <span className="font-medium">¡ALERTA! Conductividad eléctrica alta</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 7a1 1 0 11-2 0 1 1 0 012 0zm-3 3a1 1 0 11-2 0 1 1 0 012 0zm-3 3a1 1 0 11-2 0 1 1 0 012 0z"></path>
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
            </svg>
            <span className="font-semibold text-gray-700">Estado de Humedad</span>
            <button 
              onClick={() => toggleChart('moisture')} 
              className={`ml-auto px-2 py-1 rounded ${activeCharts.moisture ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
            >
              {activeCharts.moisture ? 'Visible' : 'Oculto'}
            </button>
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
            <button 
              onClick={() => toggleChart('temperature')} 
              className={`ml-auto px-2 py-1 rounded ${activeCharts.temperature ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
            >
              {activeCharts.temperature ? 'Visible' : 'Oculto'}
            </button>
          </div>
          <div className={`px-3 py-2 rounded-md ${lastTempMessage?.includes('ALERTA') ? 'bg-orange-50' : 'bg-green-50'}`}>
            <span className={`text-lg ${lastTempMessage?.includes('ALERTA') ? 'text-orange-600 font-bold' : 'text-green-600'}`}>
              {lastTempMessage || "Esperando datos..."}
            </span>
          </div>
        </div>
        
        <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-md border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 mr-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path>
            </svg>
            <span className="font-semibold text-gray-700">Estado de Luz</span>
            <button 
              onClick={() => toggleChart('light')} 
              className={`ml-auto px-2 py-1 rounded ${activeCharts.light ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
            >
              {activeCharts.light ? 'Visible' : 'Oculto'}
            </button>
          </div>
          <div className={`px-3 py-2 rounded-md ${lastLightMessage?.includes('ALERTA') ? 'bg-yellow-50' : 'bg-green-50'}`}>
            <span className={`text-lg ${lastLightMessage?.includes('ALERTA') ? 'text-yellow-600 font-bold' : 'text-green-600'}`}>
              {lastLightMessage || "Esperando datos..."}
            </span>
          </div>
        </div>
        
        <div className="p-4 bg-white bg-opacity-90 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
          <div className="flex items-center mb-2">
            <svg className="w-5 h-5 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.168 1.168a4 4 0 01-8.093.044l1.168-1.168A3 3 0 009 8.172z" clipRule="evenodd"></path>
            </svg>
            <span className="font-semibold text-gray-700">Estado de EC</span>
            <button 
              onClick={() => toggleChart('ec')} 
              className={`ml-auto px-2 py-1 rounded ${activeCharts.ec ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
            >
              {activeCharts.ec ? 'Visible' : 'Oculto'}
            </button>
          </div>
          <div className={`px-3 py-2 rounded-md ${lastEcMessage?.includes('ALERTA') ? 'bg-purple-50' : 'bg-green-50'}`}>
            <span className={`text-lg ${lastEcMessage?.includes('ALERTA') ? 'text-purple-600 font-bold' : 'text-green-600'}`}>
              {lastEcMessage || "Esperando datos..."}
            </span>
          </div>
        </div>
      </div>
      
      <div className="bg-white bg-opacity-90 p-4 rounded-lg shadow-md h-64 md:h-80 mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Gráfica de Sensores</h3>
        <Line data={data} options={{
          ...options,
          scales: {
            ...options.scales,
            'y-light': {
              type: 'linear',
              position: 'right',
              beginAtZero: true,
              max: 1000,
              grid: {
                drawOnChartArea: false,
              },
              title: {
                display: true,
                text: 'Nivel de Luz (lux)'
              }
            }
          },
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
      
      {activeCharts.ec && (
        <div className="bg-white bg-opacity-90 p-4 rounded-lg shadow-md h-64 md:h-80">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Conductividad Eléctrica (EC)</h3>
          <Line data={ecData2} options={ecOptions} />
        </div>
      )}
    </div>
  );
}

export default GraficaEstruct;