import { Routes, Route } from 'react-router-dom'
import React from 'react'

import CompanyLogin from './company_Login/company_login'
import LoginRegister from './company_login_register/login_register'
import CompanyHome from './Company_Home/Company_Home'
import CompanyActivity from './Company_Activity/Company_Activity'
import ManageList from '../page/ManageList'
import Addactivity from './Addactivity/index'
import Editactivity from './EditActivity/index'

function Company() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<CompanyLogin />} />
                <Route path="/register" element={<LoginRegister />} />
                <Route path="/companyhome" element={<CompanyHome />} />
                <Route path="/activity" element={<CompanyActivity />} />
                <Route path="/activity/add" element={<Addactivity />} />
                <Route path="/activity/edit" element={<Editactivity />} />
                <Route path="/product" element={<ManageList />} />
            </Routes>
        </>
    )
}

export default Company
