import React, { useState, useEffect } from 'react';

function WebSocketDemo() {
    const [message, setMessage] = useState<string>('');
    const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        ws.onmessage = (event) => {
            const newMessage = event.data;
            setReceivedMessages(prevMessages => [...prevMessages, newMessage]);
        };

        ws.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket) {
            socket.send(message);
            setMessage('');
        }
    };

    return (
        <div>
            <h1>WebSocket Demo</h1>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send Message</button>
            <h2>Received Messages</h2>
            <ul>
                {receivedMessages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
}

export default WebSocketDemo;
