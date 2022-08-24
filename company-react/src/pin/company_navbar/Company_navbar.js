import './Company_navbar.css'
import { Link } from 'react-router-dom'
import AuthContext from '../component/authContext'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

function CompanyNavbar() {
    const { authorized, logout } = useContext(AuthContext)
    const companyLogout = () => {
        logout()
    }
    const loginUser = JSON.parse(localStorage.getItem('comAuth'))
    // console.log(loginUser)
    const navigate = useNavigate()

    // function verifyCom (){
    //     if(loginUser.farm_type === '認證中'){
    //         alert('無法使用')
    //     }
    // }

    return (
        <div className="px-3 pt-2 px-5 text-white ">
            <div className="">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start  border-bottom ">
                    <Link
                        to="/"
                        className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-black text-decoration-none"
                    >
                        <img
                            src="/imgs/logo/fresh_LOGO_black.svg"
                            width=""
                            height="58"
                            alt=""
                        />
                        <h3 className="px-3 pt-2 companynabercolor">
                            後台系統管理
                        </h3>
                    </Link>

                    <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                        <li>
                            {authorized ? (
                                <Link
                                    to="./company/companyhome"
                                    className="nav-link companynabercolor "
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        className="bi d-block mx-auto mb-1 "
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                                        />
                                    </svg>
                                    首頁
                                </Link>
                            ) : (
                                ''
                            )}
                        </li>

                        <li>
                            {authorized ? (
                                <Link
                                    to="./company/activity"
                                    className={
                                        loginUser.farm_type === '認證中'
                                            ? 'nav-link notlogincompanynabercolor'
                                            : 'nav-link companynabercolor'
                                    }

                                    // onClick={()=>{verifyCom()}}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        className="bi d-block mx-auto mb-1"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z" />
                                    </svg>
                                    活動表
                                </Link>
                            ) : (
                                ''
                            )}
                        </li>
                        <li>
                            {authorized ? (
                                <Link
                                    to="./company/product"
                                    className={
                                        loginUser.farm_type === '認證中'
                                            ? 'nav-link notlogincompanynabercolor'
                                            : 'nav-link companynabercolor'
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        className="bi d-block mx-auto mb-1"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                                    </svg>
                                    商品表
                                </Link>
                            ) : (
                                ''
                            )}
                        </li>
                        <li>
                            {authorized ? (
                                <button
                                    className="cnbnt"
                                    onClick={() => {
                                        companyLogout()
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        className="bi d-block mx-auto mb-1"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                                    </svg>
                                    登出
                                </button>
                            ) : (
                                <Link
                                    to="./company/login"
                                    className="nav-link companynabercolor"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        className="bi d-block mx-auto mb-1"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                                    </svg>
                                    登入
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CompanyNavbar
