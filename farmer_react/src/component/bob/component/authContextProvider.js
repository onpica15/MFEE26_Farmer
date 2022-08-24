import React, { useState } from 'react';
import AuthContext from './authContext';
import { useNavigate } from 'react-router-dom';

function AuthContextProvider({ children }) {
    const unAuthState = {
        authorized: false,
        customer_id: 0,
        username: '',
        token: '',
    };

    const localAuthStr = localStorage.getItem('auth');
    let localAuth = {
        authorized: false,
        customer_id: 0,
        username: '',
        token: '',
    };

    if (localAuth) {
        try {
            localAuth = JSON.parse(localAuthStr);
            if (localAuth.username && localAuth.token) {
                localAuth = { ...localAuth, authorized: true };
            }
        } catch (ex) {}
    }

    const [auth, setAuth] = useState(localAuth);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('auth');
        setAuth({ ...unAuthState });
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ ...auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
