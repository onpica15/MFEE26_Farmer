import React, { useState, useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
import './Nav_v2.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from './images/fresh_LOGO_black.svg';
import CartCountContext from '../ben/cart_count/CartCountContext';
import AuthContext from '../bob/component/authContext';

function Nav_v2() {
    const { cartList, setCartList } = useContext(CartCountContext);

    const { authorized, username, logout } = useContext(AuthContext);
    const memberLogout = () => {
        setCartList([]);
        logout();
    };

    const a =
        'nav_active main_logo_active d-none d-md-flex justify-content-between align-items-center';
    //
    const b = ' d-none d-md-flex justify-content-between align-items-center';

    return (
        <>
            <header
                id="Navbar"
                className=" d-none d-md-flex justify-content-between align-items-center"
            >
                {/* <Logo className="main_logo" /> */}
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Logo className="main_logo" />
                </Link>

                {/* 選單 */}
                <nav className=" mt-3">
                    <ul className="header_menu d-flex">
                        <Link to="/mymap" style={{ textDecoration: 'none' }}>
                            <li>
                                <span className="menu_items">合作小農</span>
                            </li>
                        </Link>
                        <Link to="/game" style={{ textDecoration: 'none' }}>
                            <li>
                                <span className="menu_items">每日登入</span>
                            </li>
                        </Link>
                        <Link
                            to="/customer_server"
                            style={{ textDecoration: 'none' }}
                        >
                            <li>
                                <span className="menu_items">專人客服</span>
                            </li>
                        </Link>
                        <Link to="/activity" style={{ textDecoration: 'none' }}>
                            <li>
                                <span className="menu_items">小農活動</span>
                            </li>
                        </Link>
                        <Link to="/product" style={{ textDecoration: 'none' }}>
                            <li>
                                <span className="menu_items">生鮮商品</span>
                            </li>
                        </Link>
                        <Link to="/recipe" style={{ textDecoration: 'none' }}>
                            <li>
                                <span className="menu_items">食譜分享</span>
                            </li>
                        </Link>
                        <Link
                            to="/customized_lunch"
                            style={{ textDecoration: 'none' }}
                        >
                            <li>
                                <span href="/#" className="menu_items">
                                    客製化餐點
                                </span>
                            </li>
                        </Link>
                        <Link to="/comment" style={{ textDecoration: 'none' }}>
                            <li>
                                <span href="/#" className="menu_items">
                                    顧客評論
                                </span>
                            </li>
                        </Link>
                    </ul>
                </nav>
                {/* ICONS */}
                <div className="d-flex px-5">
                    <div className="nav_icons d-flex">
                        {authorized ? (
                            <div className="row m-0">
                                <Link className="col-4" to="/member/data">
                                    <FaUserCircle size={30} />
                                </Link>
                                <span className="col-8">{username}</span>
                            </div>
                        ) : (
                            <Link to="/member">
                                <FaUserCircle size={30} />
                            </Link>
                        )}

                        <Link to="/cart">
                            <FaShoppingCart
                                size={30}
                                className="mx-1 cursor_pointer"
                            />
                        </Link>

                        <div className="cart_number px-3 fs-5">
                            {cartList ? cartList.length : 0}
                        </div>
                        {/* btn-outline-dark */}
                        {authorized ? (
                            <button
                                // className="btn btn-sm  loginout_btn"
                                className="btn btn-sm"
                                onClick={() => {
                                    memberLogout();
                                }}
                            >
                                登出
                            </button>
                        ) : (
                            ''
                        )}
                    </div>
                    {/* <div className="cart_number d-flex justify-content-center align-items-center">
                        <p className="fs-5 pl-4">0</p>
                    </div> */}
                </div>
            </header>

            {/* mobile */}
            <header className="d-flex d-md-none align-items-center ">
                <div className="px-4 navbar_toggle">
                    <AiOutlineMenu size={30} />
                </div>

                <div className="main_logo text-center ">
                    <Logo className="w-75 pl-5" />
                </div>

                {/* 選單 */}
                {/* <nav className=" mt-3">
                    <ul className="header_menu d-flex d-none">
                        <li>
                            <a href="/#">首頁</a>
                        </li>
                        <li>
                            <a href="/#">小農活動</a>
                        </li>
                        <li>
                            <a href="/#">生鮮商品</a>
                        </li>
                        <li>
                            <a href="/#">食譜分享</a>
                        </li>
                        <li>
                            <a href="/#">客製化餐點</a>
                        </li>
                        <li>
                            <a href="/#">顧客評論</a>
                        </li>
                    </ul>
                </nav> */}
                {/* ICONS */}
                <div className="d-flex">
                    <div className="nav_icons d-flex">
                        <FaUserCircle size={30} />
                        <Link to="/cart">
                            <FaShoppingCart
                                size={30}
                                className="mx-0 cursor_pointer"
                            />
                        </Link>

                        <div className="cart_number px-2 fs-10">
                            {authorized ? cartList.length : 0}
                        </div>
                    </div>
                    {/* <div className="cart_number d-flex justify-content-center align-items-center">
                        <p className="fs-5 pl-4">0</p>
                    </div> */}
                </div>
            </header>
        </>
    );
}

export default Nav_v2;
