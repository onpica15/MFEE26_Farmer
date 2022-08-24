import React from 'react'

const AuthContext = React.createContext({
    authorized: false,
    company_id: 0,
    username: '',
    token: '',
})

export default AuthContext
