import React, { useState, useEffect, useCallback } from 'react';
import Login from './Chat/Login';
import Chat from './Chat/Chat';
import './ChatMain.css';

const ChatMain = ({ socket }) => {
    const [newUser, setNewUser] = useState('');
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);

    // 檢查客戶端離線
    const checkIfUserExists = useCallback(() => {
        const sessionId = localStorage.getItem('sessionId');
        if (sessionId) {
            socket.auth = { sessionId: sessionId };
            socket.connect();
        }
    }, [socket]);

    useEffect(() => {
        checkIfUserExists();
        socket.on('connect', () => {
            console.info('connected');
        });
        socket.on('disconnect', () => {
            console.info('Disconnected');
        });

        socket.on('session', ({ sessionId, userId, username }) => {
            socket.auth = { sessionId: sessionId };
            localStorage.setItem('sessionId', sessionId);
            setUser({ userId, username });
        });

        socket.on('users', (users) => {
            setUsers(users);
        });
    }, [socket, messages, checkIfUserExists]);

    const authenticateUser = () => {
        socket.auth = { username: newUser };
        socket.connect();
    };

    return (
        <main className="chat-content">
            <div className="container mt-3">
                {user.userId && (
                    <Chat
                        socket={socket}
                        user={user}
                        users={users}
                        setUsers={setUsers}
                        messages={messages}
                        setMessages={setMessages}
                    />
                )}
                {!user.userId && (
                    <Login
                        newUser={newUser}
                        setNewUser={setNewUser}
                        authenticateUser={authenticateUser}
                    />
                )}
            </div>
        </main>
    );
};
export default ChatMain;
