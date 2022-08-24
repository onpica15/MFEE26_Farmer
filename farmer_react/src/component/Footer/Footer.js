import React from "react";
import "./Footer.css"
import TopButton from "./TopButton/TopButton";

const Footer = () => {
    return (
        <>
            <footer className=" d-flex flex-column justify-content-center align-items-center">
                <div className="footer_menu " >
                    <div className="">
                        <ul className="d-flex flex-column flex-md-row  mx-auto px-0 ">
                            <li className="footer_border my-2  my-md-0 py-3  px-2">
                                <a href="/#" className="">關於我們</a>
                            </li>
                            <li className="footer_border my-2 my-md-0 py-3  px-2">
                                <a href="/#">購物流程</a>
                            </li>
                            <li className="footer_border my-2 my-md-0 py-3  px-2">
                                <a href="/#">售後服務</a>
                            </li>
                            <li className="footer_border my-2 my-md-0 py-3  px-2">
                                <a href="/#">留言分享</a>
                            </li>
                            <li className="footer_border my-2 my-md-0 py-3 px-2">
                                <a href="/#">加入會員</a>
                            </li>
                            <li className="footer_border my-2 my-md-0 py-3  px-2">
                                <a href="/#">聯絡我們</a>
                            </li>
                        </ul>
                    </div>
                    <p className="d-flex justify-content-center footer_para">
                        Copyright © MFEE26_Farmer Co., Ltd. All rights reserved.
                    </p>
                </div>
                <TopButton className="fixed-bottom"/>
            </footer>
        </>
    );
};

export default Footer;
