import React, { useState, useEffect } from 'react';
import useWebSocket from '../Pages/WebSocket';

function RecomendationOrg() {
    // Estados para almacenar las últimas lecturas de sensores
    const [humedadData, setHumedadData] = useState(null);
    const [temperaturaData, setTemperaturaData] = useState(null);
    const [lightData, setLightData] = useState(null);
    const [ecData, setEcData] = useState(null);
    
    // Estado para almacenar recomendaciones
    const [recommendations, setRecommendations] = useState([]);
    
    // Estado para el estado general de la planta
    const [plantStatus, setPlantStatus] = useState('normal'); // 'normal', 'warning', 'danger'
    
    // Estado para errores de conexión
    const [connectionError, setConnectionError] = useState("");
    
    // Usar el hook WebSocket
    const { messages, isConnected, error, reconnect } = useWebSocket('ws://localhost:4000/v1/message/ws');
    
    // Actualizar el estado de error de conexión
    useEffect(() => {
        if (error) {
            setConnectionError(error);
        }
    }, [error]);
    
    // Función para reconectar manualmente
    const handleReconnect = () => {
        reconnect();
        setConnectionError("");
    };
    
    // Función para generar recomendaciones basadas en los datos
    const generateRecommendations = () => {
        const newRecommendations = [];
        
        // Recomendaciones de humedad
        if (humedadData !== null) {
            if (humedadData < 20) {
                newRecommendations.push({
                    id: 'humidity-critical',
                    type: 'danger',
                    title: 'Humedad crítica',
                    message: 'Tu cilantro está muy seco. Riega inmediatamente con 200-250ml de agua por planta.',
                    icon: 'droplet'
                });
            } else if (humedadData < 30) {
                newRecommendations.push({
                    id: 'humidity-low',
                    type: 'warning',
                    title: 'Humedad baja',
                    message: 'El suelo se está secando. Programa un riego en las próximas 12 horas con 150ml de agua por planta.',
                    icon: 'droplet'
                });
            } else if (humedadData > 70) {
                newRecommendations.push({
                    id: 'humidity-high',
                    type: 'warning',
                    title: 'Exceso de humedad',
                    message: 'El suelo está demasiado húmedo. Evita regar en los próximos 2-3 días y asegura buen drenaje.',
                    icon: 'droplet'
                });
            }
        }
        
        // Recomendaciones de temperatura
        if (temperaturaData !== null) {
            if (temperaturaData > 95) {
                newRecommendations.push({
                    id: 'temp-high',
                    type: 'danger',
                    title: 'Temperatura elevada',
                    message: 'La temperatura es demasiado alta para el cilantro. Proporciona sombra parcial o mueve las plantas a un lugar más fresco.',
                    icon: 'thermometer'
                });
            } else if (temperaturaData > 85) {
                newRecommendations.push({
                    id: 'temp-warm',
                    type: 'warning',
                    title: 'Temperatura cálida',
                    message: 'La temperatura está en el límite superior para el cilantro. Asegura que tenga suficiente agua y considera proporcionar algo de sombra durante las horas más calurosas.',
                    icon: 'thermometer'
                });
            } else if (temperaturaData < 45) {
                newRecommendations.push({
                    id: 'temp-low',
                    type: 'warning',
                    title: 'Temperatura baja',
                    message: 'La temperatura está por debajo del rango óptimo para el cilantro. Considera mover las plantas a un lugar más cálido o protegerlas durante la noche.',
                    icon: 'thermometer'
                });
            }
        }
        
        // Recomendaciones de luz
        if (lightData !== null) {
            if (lightData < 300) {
                newRecommendations.push({
                    id: 'light-low',
                    type: 'danger',
                    title: 'Nivel de luz insuficiente',
                    message: 'Tu cilantro no está recibiendo suficiente luz. Muévelo a una ubicación más iluminada o considera usar iluminación artificial suplementaria.',
                    icon: 'sun'
                });
            } else if (lightData < 500) {
                newRecommendations.push({
                    id: 'light-medium',
                    type: 'warning',
                    title: 'Luz moderada',
                    message: 'El nivel de luz es adecuado pero podría mejorar. Para un crecimiento óptimo, busca un lugar con más luz indirecta.',
                    icon: 'sun'
                });
            } else if (lightData > 800) {
                newRecommendations.push({
                    id: 'light-high',
                    type: 'info',
                    title: 'Luz abundante',
                    message: 'Tu cilantro está recibiendo mucha luz. Vigila que no se acumule demasiado calor y mantén el suelo húmedo.',
                    icon: 'sun'
                });
            }
        }
        
        // Recomendaciones de conductividad eléctrica (EC)
        if (ecData !== null) {
            if (ecData > 2.0) {
                newRecommendations.push({
                    id: 'ec-high',
                    type: 'danger',
                    title: 'EC elevada',
                    message: 'La concentración de sales es demasiado alta. Riega con agua sin nutrientes para lavar el exceso de sales del suelo.',
                    icon: 'zap'
                });
            } else if (ecData > 1.8) {
                newRecommendations.push({
                    id: 'ec-medium-high',
                    type: 'warning',
                    title: 'EC ligeramente elevada',
                    message: 'La concentración de nutrientes está en el límite superior. Reduce la cantidad de fertilizante en el próximo riego.',
                    icon: 'zap'
                });
            } else if (ecData < 0.8) {
                newRecommendations.push({
                    id: 'ec-low',
                    type: 'warning',
                    title: 'EC baja',
                    message: 'El nivel de nutrientes es bajo. Aplica un fertilizante balanceado para hierbas en tu próximo riego.',
                    icon: 'zap'
                });
            }
        }
        
        // Recomendaciones generales de cultivo de cilantro (siempre presentes)
        newRecommendations.push({
            id: 'general-care',
            type: 'info',
            title: 'Cuidados básicos del cilantro',
            message: 'Recuerda cosechar las hojas exteriores primero para promover nuevo crecimiento. Evita dejar que la planta florezca si quieres continuar cosechando hojas.',
            icon: 'info'
        });
        
        return newRecommendations;
    };
    
    // Determinar el estado general de la planta
    const determineOverallStatus = () => {
        if (recommendations.some(rec => rec.type === 'danger')) {
            return 'danger';
        } else if (recommendations.some(rec => rec.type === 'warning')) {
            return 'warning';
        }
        return 'normal';
    };
    
    // Manejar los nuevos mensajes del WebSocket
    useEffect(() => {    
        if (messages.length > 0) {
            try {
                // Intentar parsear el último mensaje recibido
                const lastMessage = messages[messages.length - 1];
                const parsedData = JSON.parse(lastMessage);
                
                // Verificar el tipo de mensaje y actualizar el estado correspondiente
                switch(parsedData.type) {
                    case "soil_moisture":
                        setHumedadData(parsedData.quantity);
                        break;
                        
                    case "temperature":
                        setTemperaturaData(parsedData.quantity);
                        break;
                        
                    case "light":
                        setLightData(parsedData.quantity);
                        break;
                        
                    case "electrical_conductivity":
                        setEcData(parsedData.quantity);
                        break;
                        
                    default:
                        break;
                }
            } catch (error) {
                console.error("Error al parsear el mensaje:", error);
            }
        }
    }, [messages]);
    
    // Generar recomendaciones cuando cambien los datos
    useEffect(() => {
        const newRecommendations = generateRecommendations();
        setRecommendations(newRecommendations);
        setPlantStatus(determineOverallStatus());
    }, [humedadData, temperaturaData, lightData, ecData]);
    
    // Función para renderizar el icono correspondiente
    const renderIcon = (iconName) => {
        switch (iconName) {
            case 'droplet':
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                    </svg>
                );
            case 'thermometer':
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                );
            case 'sun':
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                );
            case 'zap':
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                );
            case 'info':
                return (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                );
            default:
                return null;
        }
    };
    
    // Función para obtener el color del tipo de recomendación
    const getTypeColor = (type) => {
        switch (type) {
            case 'danger':
                return 'bg-red-100 border-red-500 text-red-700';
            case 'warning':
                return 'bg-yellow-100 border-yellow-500 text-yellow-700';
            case 'info':
                return 'bg-blue-100 border-blue-500 text-blue-700';
            default:
                return 'bg-green-100 border-green-500 text-green-700';
        }
    };
    
    // Obtener clase para el estado general de la planta
    const getPlantStatusClass = () => {
        switch (plantStatus) {
            case 'danger':
                return 'bg-red-500 text-white';
            case 'warning':
                return 'bg-yellow-500 text-white';
            default:
                return 'bg-green-500 text-white';
        }
    };
    
    // Obtener el texto del estado general de la planta
    const getPlantStatusText = () => {
        switch (plantStatus) {
            case 'danger':
                return 'Atención inmediata requerida';
            case 'warning':
                return 'Requiere atención pronto';
            default:
                return 'Desarrollo saludable';
        }
    };

    return (
        <div className="w-full min-h-screen p-6 bg-gradient-to-br from-green-50 to-orange-50">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="flex items-center mb-4 md:mb-0">
                        <svg className="w-8 h-8 mr-3 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.168 1.168a4 4 0 01-8.093.044l1.168-1.168A3 3 0 009 8.172z" clipRule="evenodd"></path>
                        </svg>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                            Recomendaciones para tu Cilantro
                        </h1>
                    </div>
                    
                    {!isConnected && (
                        <button 
                            onClick={handleReconnect}
                            className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                        >
                            Reconectar
                        </button>
                    )}
                </div>
                
                {/* Mensajes de estado */}
                <div className="mb-6">
                    {connectionError && (
                        <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 flex items-center rounded-lg shadow-sm">
                            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                            <span className="font-medium">Error de conexión: {connectionError}</span>
                        </div>
                    )}
                    
                    {!isConnected && !connectionError && (
                        <div className="p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 flex items-center rounded-lg shadow-sm">
                            <svg className="w-6 h-6 mr-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                            <span className="font-medium">Conectando al sistema de monitoreo...</span>
                        </div>
                    )}
                </div>
                
                {/* Introducción */}
                <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Tu cultivo habla, y nuestro sistema escucha. Cuando tus cilantros necesiten 
                        más agua, enfrenten bajas temperaturas o sufran por poca humedad, 
                        recibirás recomendaciones precisas para que siempre estén sanos y fuertes.
                    </p>
                </div>
                
                {/* Estado general de la planta */}
                <div className={`mb-6 p-6 rounded-lg shadow-md ${getPlantStatusClass()}`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                            </svg>
                            <h2 className="text-2xl font-bold">Estado actual de tu cilantro</h2>
                        </div>
                        <span className="text-xl font-semibold">{getPlantStatusText()}</span>
                    </div>
                </div>
                
                {/* Tarjetas de métricas actuales */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-1">Humedad</h3>
                        <p className="text-3xl font-bold text-blue-600">{humedadData !== null ? `${humedadData}%` : '—'}</p>
                        <p className="text-sm text-gray-500">Ideal: 40-60%</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-3">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-1">Temperatura</h3>
                        <p className="text-3xl font-bold text-red-600">{temperaturaData !== null ? `${temperaturaData}°C` : '—'}</p>
                        <p className="text-sm text-gray-500">Ideal: 65-75°C</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center mb-3">
                            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-1">Luz</h3>
                        <p className="text-3xl font-bold text-yellow-600">{lightData !== null ? `${lightData} lux` : '—'}</p>
                        <p className="text-sm text-gray-500">Ideal: 500-800 lux</p>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-1">EC</h3>
                        <p className="text-3xl font-bold text-purple-600">{ecData !== null ? `${ecData} mS/cm` : '—'}</p>
                        <p className="text-sm text-gray-500">Ideal: 1.0-1.8 mS/cm</p>
                    </div>
                </div>
                
                {/* Lista de recomendaciones */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Recomendaciones para tu cultivo</h2>
                    
                    {recommendations.length === 0 ? (
                        <div className="p-4 bg-gray-100 rounded-lg text-gray-700 flex items-center justify-center">
                            <svg className="w-6 h-6 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                            </svg>
                            <span>Esperando datos de los sensores...</span>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recommendations.map((rec) => (
                                <div key={rec.id} className={`p-4 border-l-4 rounded-lg ${getTypeColor(rec.type)}`}>
                                    <div className="flex items-center">
                                        <div className="mr-3 text-lg">
                                            {renderIcon(rec.icon)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg">{rec.title}</h3>
                                            <p className="mt-1">{rec.message}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Guía de cuidados básicos */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Guía de cuidados básicos del cilantro</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 border border-green-200 rounded-lg">
                            <h3 className="text-lg font-semibold text-green-700 mb-2">Regado</h3>
                            <p className="text-gray-700">Mantén el suelo húmedo pero no empapado. Riega cuando la capa superior del suelo esté seca al tacto. El cilantro prefiere riegos ligeros pero frecuentes.</p>
                        </div>
                        
                        <div className="p-4 border border-green-200 rounded-lg">
                            <h3 className="text-lg font-semibold text-green-700 mb-2">Luz</h3>
                            <p className="text-gray-700">El cilantro prefiere sol parcial a pleno sol, pero requiere algo de sombra en climas muy cálidos. Idealmente, 4-6 horas de sol directo al día.</p>
                        </div>
                        
                        <div className="p-4 border border-green-200 rounded-lg">
                            <h3 className="text-lg font-semibold text-green-700 mb-2">Temperatura</h3>
                            <p className="text-gray-700">Crece mejor en temperaturas entre 18-24°C (65-75°F). Temperaturas superiores a 27°C (80°F) pueden causar que la planta florezca prematuramente.</p>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>

     );
}
export default RecomendationOrg;