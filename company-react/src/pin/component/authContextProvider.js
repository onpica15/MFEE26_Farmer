import React, { useState } from 'react'
import AuthContext from './authContext'
import { useNavigate } from 'react-router-dom'

function AuthContextProvider({ children }) {
    const unAuthState = {
        authorized: false,
        company_id: 0,
        username: '',
        token: '',
    }

    const localAuthStr = localStorage.getItem('comAuth')
    let localAuth = {
        authorized: false,
        company_id: 0,
        username: '',
        token: '',
    }

    // console.log(localAuthStr)

    if (localAuth) {
        try {
            localAuth = JSON.parse(localAuthStr)
            if (localAuth.token) {
                localAuth = { ...localAuth, authorized: true }
            }
        } catch (ex) {}
    }

    const [comAuth, setComAuth] = useState(localAuth)
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('comAuth')
        setComAuth({ ...unAuthState })
        navigate('/company/login')
    }

    return (
        <AuthContext.Provider value={{ ...comAuth, setComAuth, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
