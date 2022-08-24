import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CompanyNavbar from './pin/company_navbar/Company_navbar'
import Company from './pin/app'
import './App.css'
import AuthContextProvider from './pin/component/authContextProvider'
import { IconContext } from 'react-icons'
import { Provider } from 'react-redux'
import store from './store'
function App() {
    return (
        <>
            <Provider store={store}>
                <IconContext.Provider value={{ className: 'react_icons' }}>
                    <BrowserRouter>
                        <AuthContextProvider>
                            <CompanyNavbar />
                            <Routes>
                                <Route
                                    path="/company/*"
                                    element={<Company />}
                                />
                            </Routes>
                        </AuthContextProvider>
                    </BrowserRouter>
                </IconContext.Provider>
            </Provider>
        </>
    )
}

export default App
