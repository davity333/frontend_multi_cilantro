import { useEffect, useState } from "react";

const useWebSocket = (url) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Conectar al WebSocket
        const socket = new WebSocket(url);

        // Cuando recibimos un mensaje, lo agregamos a los mensajes
        socket.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
        };

        // Manejo de errores
        socket.onerror = (error) => {
            console.error("WebSocket Error: ", error);
        };

        // Cerrar la conexión cuando el componente se desmonte
        socket.onclose = () => {
            console.log("WebSocket cerrado");
        };

        setSocket(socket);

        // Cleanup al desmontar el componente
        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [url]);

    return { messages, socket };
};

export default useWebSocket;
