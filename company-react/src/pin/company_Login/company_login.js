import './company_login.css'
import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import AuthContext from '../component/authContext'
import Swal from 'sweetalert2'

import React from 'react'

function CompanyLogin() {
    const { setComAuth } = useContext(AuthContext)
    const navigate = useNavigate()

    function Login(obj) {
        if (obj.success) {
            localStorage.setItem('comAuth', JSON.stringify(obj.data))
            setComAuth({ ...obj.data, authorized: true })
            Swal.fire({
                icon: 'success',
                title: '歡迎登入',
                showConfirmButton: true,
                confirmButtonText: '確認',
                confirmButtonColor: '#709D40',
            }).then(() => {
                navigate('/company/companyhome', { replace: true })
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: '帳號密碼錯誤',
                showConfirmButton: true,
                confirmButtonText: '請輸入正確資訊',
                confirmButtonColor: '#709D40',
            }).then(() => {
                navigate('/company/login', { replace: true })
            })
        }
    }

    const checkForm = async (event) => {
        event.preventDefault()
        const data = {
            company_email: document.form1.company_email.value,
            company_password: document.form1.company_password.value,
        }

        const r = await fetch('http://localhost:3600/company/login', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const obj = await r.json()
        // console.log(obj)
        Login(obj)
    }
    function autoInput() {
        document.form1.company_email.value = 'test0824@test.com'
        document.form1.company_password.value = '123456'
    }
    function autoInput1() {
        document.form1.company_email.value = 'test01@gmail.com'
        document.form1.company_password.value = '123456'
    }
    return (
        <>
            <div className="mybody">
                <div className="companybodybg">
                    <div
                        className="modal modal-signin position-static d-block  py-2  "
                        tabndex="-1"
                        role="dialog"
                        id="modalSignin"
                    >
                        <div className="modal-dialog " role="document">
                            <div className="modal-content shadow bg-light bg-opacity-50 ">
                                <div className="btn-group ">
                                    <button
                                        className="btn btn ytbtncolor1"
                                        type="button"
                                    >
                                        廠商登入
                                    </button>
                                    <button
                                        className="btn btn ytbtncolor2"
                                        type="button"
                                        onClick={() => {
                                            navigate('/company/register', {
                                                replace: true,
                                            })
                                        }}
                                    >
                                        廠商註冊
                                    </button>
                                </div>
                                <div className="modal-header p-4 pb-4 border-bottom-0">
                                    <div className="modal-body p-5 pt-0">
                                        <form
                                            name="form1"
                                            method="post"
                                            onSubmit={checkForm}
                                        >
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="email"
                                                    className="form-label"
                                                >
                                                    Email address：
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control bg-light bg-opacity-50"
                                                    id="company_email"
                                                    name="company_email"
                                                    aria-describedby="emailHelp"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="exampleInputPassword1"
                                                    className="form-label "
                                                >
                                                    Password：
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control bg-light bg-opacity-50"
                                                    id="company_password"
                                                    name="company_password"
                                                />
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div className="mb-3 form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="exampleCheck1"
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="exampleCheck1"
                                                    >
                                                        記住帳號
                                                    </label>
                                                </div>
                                                <div className="mb-3 ">
                                                    <button
                                                        className="btn btn btn-sm pin-btnlogon"
                                                        type="button"
                                                        onClick={autoInput}
                                                    >
                                                        註冊快速填寫
                                                    </button>
                                                    <button
                                                        className="btn btn btn-sm pin-btnlogon"
                                                        type="button"
                                                        onClick={autoInput1}
                                                    >
                                                        快速填寫
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="d-grid gap-2">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                >
                                                    登入
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CompanyLogin
