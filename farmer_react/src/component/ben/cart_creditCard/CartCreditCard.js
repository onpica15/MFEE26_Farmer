import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useNavigate } from 'react-router-dom';

function CartCreditCard() {
    const navigate = useNavigate();
    const [number, setNumber] = useState('');
    const [name, setName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvc, setCvc] = useState('');
    const [focus, setFocus] = useState('');
    const expiryMonthRegex = /^0[1-9]|1[0-2]/;
    const expiryTest = (e) => {
        setExpiry(e.target.value);
        if (
            e.target.value.toString().length >= 2 &&
            !expiryMonthRegex.test(e.target.value.slice(0, 2))
        ) {
            // console.log(e.target.value.slice(0, 2));
            setTimeout(() => {
                setExpiry('');
                alert('請確認月份是否正確');
            }, 200);
        } else {
            setExpiry(e.target.value);
        }
    };

    const formCheck = (e) => {
        e.preventDefault();
        const form1 = document.form1;
        // console.log(form1[2].value);
        if (
            form1[0].value !== '' &&
            form1[1].value !== '' &&
            form1[2].value !== '' &&
            form1[3].value !== ''
        ) {
            navigate('/cart/success');
        } else alert('您還沒有完全填寫資料喔!');
    };

    return (
        <>
            <div className="container ">
                <div className="row mt-3">
                    <div className="col-md-8 mx-auto my-md-5 cart_step">
                        <div className="d-flex  justify-content-between">
                            <div className="col-2 cart_step_opacity">
                                <div className="text-center pb-2">STEP1</div>
                                <div className="cart_step_block mx-auto d-flex justify-content-center align-items-center flex-column">
                                    <i className="text-light fs-2 fa-solid fa-cart-shopping"></i>
                                </div>
                                <div className="cart_step_fontsize text-center pt-2">
                                    確認購物
                                    <br />
                                    車內商品
                                </div>
                            </div>
                            <div className="col-1 d-flex justify-content-center align-items-center flex-column cart_step_opacity">
                                →
                            </div>
                            <div className="col-2 cart_step_opacity">
                                <div className="text-center pb-2">STEP2</div>
                                <div className="cart_step_block mx-auto d-flex justify-content-center align-items-center flex-column">
                                    <i className="text-light fs-2 fa-solid fa-clipboard-list"></i>
                                </div>
                                <div className="cart_step_fontsize text-center pt-2">
                                    填寫收
                                    <br />
                                    件人資料
                                </div>
                            </div>
                            <div className="col-1 d-flex justify-content-center align-items-center flex-column cart_step_opacity">
                                →
                            </div>
                            <div className="col-2">
                                <div className="text-center pb-2">STEP3</div>
                                <div className="cart_step_block mx-auto d-flex justify-content-center align-items-center flex-column">
                                    <i className="text-light fs-2 fa-solid fa-sack-dollar"></i>
                                </div>
                                <div className="cart_step_fontsize text-center pt-2 text-center">
                                    <div>信用卡</div>
                                    <div>LinePay</div>
                                    <div>貨到付款</div>
                                </div>
                            </div>
                            <div className="col-1 d-flex justify-content-center align-items-center flex-column">
                                →
                            </div>
                            <div className="col-2 cart_step_opacity">
                                <div className="text-center pb-2">STEP4</div>
                                <div className="cart_step_block mx-auto d-flex justify-content-center align-items-center flex-column">
                                    <i className="text-center text-light fs-2 fa-solid fa-gift"></i>
                                </div>
                                <div className="cart_step_fontsize text-center pt-2">
                                    期待
                                    <br />
                                    您的商品
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center align-content-center mb-5">
                    <h2 className="text-center py-5">信用卡付款資訊</h2>
                    <div className="col-12 col-md-6 mt-md-5">
                        <Cards
                            className="w-100"
                            number={number}
                            name={name}
                            expiry={expiry}
                            cvc={cvc}
                            focused={focus}
                        />
                    </div>
                    <div className="col-12 col-md-6 mt-5 mt-md-0">
                        <form className="" name="form1">
                            <div className="mb-2">
                                <label className="col-4 pb-2 " htmlFor="number">
                                    信用卡號碼
                                </label>
                                <br />
                                <input
                                    className="col-6 form-control"
                                    type="tel"
                                    name="number"
                                    id="number"
                                    placeholder="請輸入您的卡號"
                                    value={number}
                                    onChange={(e) => {
                                        setNumber(e.target.value);
                                    }}
                                    onFocus={(e) => {
                                        setFocus(e.target.name);
                                    }}
                                    minLength="15"
                                    maxLength="16"
                                    // required
                                />
                            </div>
                            <div className="my-2">
                                <label className="col-4 pb-2" htmlFor="name">
                                    信用卡名稱
                                </label>
                                <br />
                                <input
                                    className="col-6 form-control"
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="請輸入您信用卡上的姓名"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                    onFocus={(e) => {
                                        setFocus(e.target.name);
                                    }}
                                    maxLength="20"
                                    // required
                                />
                            </div>
                            <div className="my-2">
                                <label className="col-3 pb-2" htmlFor="expiry">
                                    卡片期限
                                </label>
                                <br />
                                <input
                                    className="col-6 form-control"
                                    type="text"
                                    name="expiry"
                                    id="expiry"
                                    placeholder="MM/YY"
                                    value={expiry}
                                    pattern="(?:0[1-9]|1[0-2])/[0-9]{2}"
                                    maxLength="4"
                                    onChange={(e) => {
                                        expiryTest(e);
                                        // setExpiry(e.target.value);
                                    }}
                                    onFocus={(e) => {
                                        setFocus(e.target.name);
                                    }}
                                />
                            </div>
                            <div className="my-2">
                                <label className="col-3 pb-2" htmlFor="cvc">
                                    安全碼
                                </label>
                                <br />
                                <input
                                    className="col-6 form-control"
                                    type="tel"
                                    name="cvc"
                                    id="cvc"
                                    placeholder="請輸入您的安全碼"
                                    value={cvc}
                                    maxLength="3"
                                    onChange={(e) => {
                                        setCvc(e.target.value);
                                    }}
                                    onFocus={(e) => {
                                        setFocus(e.target.name);
                                    }}
                                    // required
                                />
                            </div>
                        </form>
                    </div>
                    <div className="text-center mt-5">
                        <button
                            type="submit"
                            className="btn px-5 py-2 fs-4 fw-bold cart_button_borderradius cart_button_color_green_cerditcard 
                            cart_button_hover_change"
                            onClick={(e) => {
                                formCheck(e);
                            }}
                        >
                            確認付款
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartCreditCard;
