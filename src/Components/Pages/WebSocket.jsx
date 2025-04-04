import { useEffect, useState } from "react";
const useWebSocket = (url) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError("No authentication token found");
            return;
        }
        const userData = JSON.parse(localStorage.getItem('user'));
        
        if (!token) {
            setError("No authentication token found");
            return;
        }

        if (!userData) {
            setError("No user data found");
            return;
        }
        const wsUrl = `${url}?user=${userData.username}`;


        
        try {
            // Crear conexión WebSocket
          const newSocket = new WebSocket(wsUrl);

            // Configurar los eventos del socket
// En el evento onopen del WebSocket
newSocket.onopen = () => {
    console.log("WebSocket connection established");
    setIsConnected(true);
    
};

            newSocket.onmessage = (event) => {
                console.log("WebSocket message received:", event.data);
                setMessages((prevMessages) => [...prevMessages, event.data]);
            };

            newSocket.onerror = (err) => {
                console.error("WebSocket Error:", err);
                setError("Connection error occurred");
            };

            newSocket.onclose = (event) => {
                console.log("WebSocket connection closed:", event.code, event.reason);
                setIsConnected(false);
                
                if (event.code !== 1000) { // 1000 es cierre normal
                    setError(`Connection closed abnormally. Code: ${event.code}`);
                }
            };

            setSocket(newSocket);

            // Limpieza cuando el componente se desmonta
            return () => {
                if (newSocket && newSocket.readyState === WebSocket.OPEN) {
                    newSocket.close();
                }
            };
        } catch (err) {
            console.error("Error creating WebSocket:", err);
            setError("Failed to create WebSocket connection");
        }
    }, [url]);

    // Función para enviar mensajes a través del socket
    const sendMessage = (message) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(typeof message === 'string' ? message : JSON.stringify(message));
            return true;
        }
        return false;
    };

    // Función para reconectar manualmente
    const reconnect = () => {
        if (socket) {
            socket.close();
        }
        // El efecto se ejecutará nuevamente después de la actualización del estado
        setSocket(null);
    };

    return { 
        messages, 
        socket, 
        isConnected, 
        error, 
        sendMessage, 
        reconnect 
    };
};

export default useWebSocket;