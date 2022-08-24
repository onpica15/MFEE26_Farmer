import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    CART_LINEPAY_CHECK,
    CART_LIST_ORDERLIST,
} from './../../../config/ajax-path';

import CartCountContext from '../cart_count/CartCountContext';
import { DoubleOrbit } from 'react-spinner-animated';

import 'react-spinner-animated/dist/index.css';
function CartPaymentLinepayCheck() {
    const navigate = useNavigate();
    const discount = sessionStorage.getItem('discount')
        ? sessionStorage.getItem('discount')
        : 0;
    // console.log(discount);
    const discountKey = sessionStorage.getItem('discountSid')
        ? sessionStorage.getItem('discountSid')
        : 0;
    const { cartList, setCartList } = useContext(CartCountContext);

    const [totalAmount, setTotalAmount] = useState(0);

    //Linepay

    function checkLine() {
        let data = {};
        data.transitionID = sessionStorage.getItem('transitionID');
        data.amount = sessionStorage.getItem('amount');
        // console.log('IDkey:' + data);
        fetch(CART_LINEPAY_CHECK, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then((obj) => {
                // console.log(JSON.stringify(obj));
                sessionStorage.removeItem('transitionID');
                sessionStorage.removeItem('amount');
                // navigate('/cart/success');
            });
    }

    const sqlData = () => {
        let sendData = JSON.parse(sessionStorage.getItem('linepayData'));
        sendData.discount_value = +discount;
        // console.log(sendData);
        const order_id =
            Math.ceil(Math.random() * (9999999 - 1000000)) + 1000000;
        sendData.order_id = order_id;

        // sendData.freshInventoryarray=
        sessionStorage.setItem('order_id', order_id);

        const freshInventoryarray = cartList
            .filter((v) => {
                return +v.ready_to_buy === 1 && +v.cart_product_type === 1;
            })
            .map((v) => {
                return v.product_inventory;
            });
        sendData.freshInventoryarray = freshInventoryarray;
        fetch(CART_LIST_ORDERLIST, {
            method: 'POST',
            body: JSON.stringify(sendData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then((obj) => {
                setCartList(obj);
                navigate('/cart/success');
            });
    };

    const clickChangeSQLandLineCheck = () => {
        checkLine();
        sqlData();
    };

    useEffect(() => {
        const newCartListAmountArray = cartList
            .filter((v) => {
                return +v.ready_to_buy === 1;
            })
            .map((v, i) => {
                return v.product_count * v.product_price;
            });
        let totalPayPrice = 0;
        for (let i of newCartListAmountArray) {
            totalPayPrice += i;
        }
        setTotalAmount(totalPayPrice);
    }, [cartList]);

    return (
        <>
            <div className="container my-5">
                <div className="row mt-3">
                    <div className="col-md-8 mx-auto cart_step">
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

                <div
                    className="d-flex justify-content-center my-5 pt-5"
                    style={{ color: '#fff' }}
                >
                    <span
                        className="cursor_pointer"
                        onClick={() => {
                            clickChangeSQLandLineCheck();
                        }}
                    >
                        {' '}
                        <DoubleOrbit
                            text={`Linepay確認付款後請點擊`}
                            bgColor={'#82CA35'}
                            center={false}
                            width={'250px'}
                            height={'250px'}
                        />
                    </span>
                </div>
            </div>
        </>
    );
}

export default CartPaymentLinepayCheck;
