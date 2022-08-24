import './login.css';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import AuthContext from '../component/authContext';
import CartCountContext from '../../ben/cart_count/CartCountContext';
import Swal from 'sweetalert2';

function SignIn() {
    const { setAuth } = useContext(AuthContext);
    const { cartList, setCartList } = useContext(CartCountContext);
    const navigate = useNavigate();

    const checkForm = async (event) => {
        event.preventDefault();
        const data = {
            email: document.form1.email.value,
            password: document.form1.password.value,
        };

        const r = await fetch('http://localhost:3600/member/login', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const obj = await r.json();
        console.log(obj);
        setCartList(obj.cart);
        Login(obj);
    };

    function Login(obj) {
        if (obj.success) {
            localStorage.setItem('auth', JSON.stringify(obj.data));
            setAuth({ ...obj.data, authorized: true });
            Swal.fire({
                icon: 'success',
                title: '歡迎登入',
                showConfirmButton: true,
                confirmButtonText: '確認',
                confirmButtonColor: '#82CA35',
            }).then(() => {
                navigate('/member/data', { replace: true });
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: '帳號密碼錯誤',
                showConfirmButton: true,
                confirmButtonText: '請輸入正確資訊',
                confirmButtonColor: '#82CA35',
            }).then(() => {
                navigate('/member/', { replace: true });
            });
        }
    }

    function autoInput() {
        document.form1.email.value = 'test0801@test.com';
        document.form1.password.value = '123456';
    }

    return (
        <>
            <div className="d-flex justify-content-center align-items-center bosi-bodybg bosi-bodyvh">
                <div className="shadow mb-5 bg-body rounded rounded-3 bg-white">
                    <div className="bg-light p-3 rounded-top position-relative">
                        <h4 className="fw-semibold text-center m-0">
                            會員登入
                        </h4>
                        <button
                            className="btn btn-outline-light btn-small position-absolute top-0 end-0 shadow-none"
                            type="button"
                            onClick={autoInput}
                        >
                            填寫
                        </button>
                    </div>
                    <form
                        className="form-signin px-5 pb-4 pt-3 mx-2"
                        name="form1"
                        method="post"
                        onSubmit={checkForm}
                    >
                        <label htmlFor="email" className="m-2">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control p-2 bg-light"
                            placeholder="請輸入您的E-mail"
                        />
                        <label htmlFor="password" className="m-2">
                            密碼
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control p-2 bg-light"
                            placeholder="請輸入您的密碼"
                        />
                        <div className="checkbox m-3 text-end">
                            <label>
                                <a
                                    className="link-secondary text-decoration-none"
                                    href="#/"
                                >
                                    忘記密碼?
                                </a>
                            </label>
                        </div>
                        <div className="d-grid gap-2 mb-3">
                            <button
                                className="border-0 shadow-sm rounded py-2 mb-2 bosi-buttonColor btn-block text-white"
                                type="submit"
                            >
                                登入
                            </button>
                            <button
                                className="btn btn-dark btn-block"
                                type="button"
                                onClick={() => {
                                    navigate('/member/signup', {
                                        replace: true,
                                    });
                                }}
                            >
                                立即加入會員
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignIn;
