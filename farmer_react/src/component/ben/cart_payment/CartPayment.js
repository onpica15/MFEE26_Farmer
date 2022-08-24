import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    CART_LINEPAY,
    CART_LIST_ORDERLIST,
    CART_DISCOUNT_CHANGEISUESD,
} from './../../../config/ajax-path';
import CartCountContext from '../cart_count/CartCountContext';

function CartPayment() {
    const discountValue = sessionStorage.getItem('discount')
        ? +sessionStorage.getItem('discount')
        : 0;
    const discountKey = sessionStorage.getItem('discountSid')
        ? +sessionStorage.getItem('discountSid')
        : 0;
    const member_info = JSON.parse(localStorage.getItem('auth'));
    const {
        address,
        birthday,
        customer_id,
        email,
        mobile,
        password,
        token,
        username,
    } = member_info;
    // console.log(username);
    // const location = useLocation();
    const navigate = useNavigate();
    const { cartList, setCartList } = useContext(CartCountContext);

    const [totalAmount, setTotalAmount] = useState(0);
    const [formValue, setFormValue] = useState('creditcardPayment');
    const [finalLinepayArray, setFinalLinepayArray] = useState([]);
    // const [discount, setDiscount] = useState(0);
    const [finalValue, setFinalValue] = useState(0);
    const [freshTotalPrice, setFreshPrice] = useState(0);
    const [customizedTotalPrice, setCustomizedPrice] = useState(0);

    //訂單hook
    const [paymentName, setPaymentName] = useState(username);
    const [paymentMobile, setPaymentMobile] = useState(mobile);
    const [paymentEmail, setPaymentEmail] = useState(email);
    const [paymentAddress, setPaymentAddress] = useState(address);
    const [paymentRemark, setPaymentRemark] = useState('');

    const member_info_id = localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth')).customer_id
        : 500000000;

    //對SQL發送資料 新增Orderlist跟Order Details 並刪除 Orderlist_to_buy資料
    // const freshInventoryarray = cartList
    //     .filter((v) => {
    //         return +v.ready_to_buy === 1 && +v.cart_product_type === 1;
    //     })
    //     .map((v2) => {
    //         return v2.product_inventory;
    //     });

    // console.log(freshInventoryarray);
    const sendCheckSQL = () => {
        setInSessionStorage();
        const order_id =
            Math.ceil(Math.random() * (9999999 - 1000000)) + 1000000;
        sessionStorage.setItem('order_id', order_id);
        const sendData = {
            order_id: order_id,
            member_id: member_info_id,
            discount_value: discountValue,
            totalPrice: finalValue,
            customerRemark: paymentRemark,
            freshItems: [
                ...cartList.filter((v) => {
                    return +v.ready_to_buy === 1 && +v.cart_product_type === 1;
                }),
            ],
            customizedItems: [
                ...cartList
                    .filter((v) => {
                        return (
                            +v.ready_to_buy === 1 && +v.cart_product_type === 2
                        );
                    })
                    .map((v) => {
                        return { ...v, lunch_pic: '' };
                    }),
            ],
            freshInventoryarray: [
                ...cartList
                    .filter((v) => {
                        return (
                            +v.ready_to_buy === 1 && +v.cart_product_type === 1
                        );
                    })
                    .map((v) => {
                        return v.product_inventory;
                    }),
            ],
        };

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
            });

        fetch(CART_DISCOUNT_CHANGEISUESD, {
            method: 'PUT',
            body: JSON.stringify({
                sid: discountKey,
                discountValue: discountValue,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    const setInSessionStorage = () => {
        sessionStorage.setItem(
            'buyfresh',
            JSON.stringify([
                ...cartList.filter((v) => {
                    return +v.ready_to_buy === 1 && +v.cart_product_type === 1;
                }),
            ])
        );
        sessionStorage.setItem(
            'buycustomized',
            JSON.stringify([
                ...cartList.filter((v) => {
                    return +v.ready_to_buy === 1 && +v.cart_product_type === 2;
                }),
            ])
        );
        sessionStorage.setItem('price', totalAmount);
        // sessionStorage.setItem('discount', discount);
        sessionStorage.setItem('finalPrice', finalValue);
    };

    const paymentLinkto = () => {
        if (formValue === 'linepay') {
            setInSessionStorage();
            linepay();

            // sendCheckSQL();
        }
        if (formValue === 'creditcard') {
            sendCheckSQL();
            navigate('/cart/creditcard');
        }
        if (formValue === 'nonepay') {
            sendCheckSQL();
            navigate('/cart/nonepay');
        }
    };

    //Linepay
    const linepay = () => {
        const time = +new Date();
        const order = {
            amount: finalValue,
            currency: 'TWD',
            orderId: `Order:${time}`,
            packages: finalLinepayArray,
            redirectUrls: {
                confirmUrl: 'http://localhost:3000/cart/linepaycheck',
                cancelUrl: 'https://example.com/cancelUrl',
            },
        };
        // console.log(order);
        let IDkey = {};

        fetch(`${CART_LINEPAY}`, {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'content-type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then((obj) => {
                const { redirectURL, transitionID } = obj;
                // console.log(redirectURL);
                // console.log(transitionID);

                IDkey.transitionID = JSON.parse(transitionID);
                sessionStorage.setItem('transitionID', IDkey.transitionID);
                sessionStorage.setItem('amount', finalValue);

                const sendData = {
                    member_id: customer_id,
                    totalPrice: finalValue,
                    customerRemark: paymentRemark,
                    freshItems: [
                        ...cartList.filter((v) => {
                            return (
                                +v.ready_to_buy === 1 &&
                                +v.cart_product_type === 1
                            );
                        }),
                    ],

                    customizedItems: [
                        ...cartList
                            .filter((v) => {
                                return (
                                    +v.ready_to_buy === 1 &&
                                    +v.cart_product_type === 2
                                );
                            })
                            .map((v) => {
                                return { ...v, lunch_pic: 1 };
                            }),
                    ],
                };
                sessionStorage.setItem('linepayData', JSON.stringify(sendData));
                // navigate(redirectURL);
                window.location = redirectURL;
                // location.href = redirectURL;
            });
    };

    useEffect(() => {
        const newFreAmountArray = cartList
            .filter((v) => {
                return +v.ready_to_buy === 1 && v.cart_product_type === 1;
            })
            .map((v, i) => {
                return v.product_count * v.product_price;
            });
        const newCusAmountArray = cartList
            .filter((v) => {
                return +v.ready_to_buy === 1 && v.cart_product_type === 2;
            })
            .map((v, i) => {
                return v.product_count * v.total_price;
            });
        let totalPayPrice = 0;
        for (let i of newFreAmountArray) {
            totalPayPrice += i;
        }
        for (let i of newCusAmountArray) {
            totalPayPrice += i;
        }

        setTotalAmount(totalPayPrice);
    }, [cartList]);

    useEffect(() => {
        const newFreshArray = cartList
            .filter((v) => {
                return +v.cart_product_type === 1;
            })
            .filter((v) => {
                return +v.ready_to_buy === 1;
            })
            .map((v, i) => {
                return +v.product_count * v.product_price;
            });
        let freshprice = 0;
        for (let i of newFreshArray) {
            freshprice += i;
        }
        // console.log(freshprice);
        setFreshPrice(freshprice);
    }, [cartList]);

    useEffect(() => {
        const newCustomizedArray = cartList
            .filter((v) => {
                return +v.cart_product_type === 2;
            })
            .filter((v) => {
                return +v.ready_to_buy === 1;
            })
            .map((v, i) => {
                return +v.product_count * v.total_price;
            });
        let customizedprice = 0;
        for (let i of newCustomizedArray) {
            customizedprice += i;
        }
        // console.log(customizedprice);

        setCustomizedPrice(customizedprice);
    }, [cartList]);

    useEffect(() => {
        let arr = [
            {
                id: 1,
                name: '生鮮商品',
                amount: freshTotalPrice,
                products: [
                    ...cartList
                        .filter((v) => {
                            return (
                                +v.ready_to_buy === 1 &&
                                +v.cart_product_type === 1
                            );
                        })
                        .map((v, i) => {
                            return {
                                name: v.product_name,
                                quantity: v.product_count,
                                price: v.product_price,
                            };
                        }),
                ],
            },
            {
                id: 2,
                name: '客製化商品',
                amount: customizedTotalPrice,
                products: [
                    ...cartList
                        .filter((v) => {
                            return (
                                +v.ready_to_buy === 1 &&
                                +v.cart_product_type === 2
                            );
                        })
                        .map((v, i) => {
                            return {
                                name: v.lunch_name,
                                quantity: v.product_count,
                                price: v.total_price,
                            };
                        }),
                ],
            },
        ];

        setFinalLinepayArray(arr);
    }, [freshTotalPrice, customizedTotalPrice]);

    useEffect(() => {
        setFinalValue(totalAmount - discountValue);
    }, [totalAmount]);

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
                            <div className="col-2">
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
                            <div className="col-1 d-flex justify-content-center align-items-center flex-column">
                                →
                            </div>
                            <div className="col-2 cart_step_opacity">
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
                            <div className="col-1 d-flex justify-content-center align-items-center flex-column cart_step_opacity">
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
                <div className="row flex-row-reverse">
                    <div className="col-12 col-md-4 px-4 py-3">
                        <h2>您的訂單</h2>
                        <p className="text-end cart_payment_border_bottom pb-2">
                            總計
                        </p>
                        {cartList
                            .filter((v) => {
                                return +v.cart_product_type === 1;
                            })
                            .filter((v) => {
                                return +v.ready_to_buy === 1;
                            })
                            .map((v, i) => {
                                return (
                                    <div className="d-flex pb-3" key={i}>
                                        <div className="col-6">
                                            {v.product_name}
                                        </div>
                                        <div className="col-2">
                                            {`${v.product_count}個`}
                                        </div>
                                        <div className="col-4 text-end">
                                            {v.product_count * v.product_price}
                                        </div>
                                    </div>
                                );
                            })}
                        {cartList
                            .filter((v) => {
                                return +v.cart_product_type === 2;
                            })
                            .filter((v) => {
                                return +v.ready_to_buy === 1;
                            })
                            .map((v, i) => {
                                return (
                                    <div
                                        className="d-flex pb-3"
                                        key={Math.random()}
                                    >
                                        <div className="col-6">
                                            {v.lunch_name}
                                        </div>
                                        <div className="col-2">
                                            {`${v.product_count}個`}
                                        </div>
                                        <div className="col-4 text-end">
                                            {v.product_count * v.total_price}
                                        </div>
                                    </div>
                                );
                            })}
                        <div className="d-flex justify-content-between cart_payment_border_top py-3">
                            <div className="col-6">小計</div>
                            <div className="col-6 text-end">
                                NT${totalAmount}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between py-3">
                            <div className="col-6">優惠券</div>
                            <div className="col-6 text-end">
                                -{discountValue}
                            </div>
                        </div>

                        <div className="d-flex justify-content-between cart_payment_border_bottom cart_payment_border_top py-3">
                            <div className="col-6">總金額</div>
                            <div className="col-6 text-end">
                                NT${finalValue}
                            </div>
                        </div>
                        <div className="d-none d-md-block my-5">
                            <h2 className="my-3">付款方式</h2>
                            <form
                                className=""
                                id="paymentChosen"
                                name="paymentChosen"
                            >
                                <div className="form-check d-flex align-items-baseline py-2">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="linePayPayment"
                                        data-name="linepay"
                                        onClick={(e) => {
                                            const payment =
                                                e.target.getAttribute(
                                                    'data-name'
                                                );
                                            setFormValue(payment);
                                            // console.log(payment);
                                        }}
                                    />
                                    <label
                                        className="form-check-label px-2"
                                        htmlFor="linePayPayment"
                                    >
                                        <img
                                            style={{ height: '50px' }}
                                            src="/images/ben/linepay_logo.png"
                                            alt=""
                                        />
                                    </label>
                                </div>
                                <div className="form-check d-flex align-items-center py-2">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="creditcardPayment"
                                        data-name="creditcard"
                                        onClick={(e) => {
                                            const payment =
                                                e.target.getAttribute(
                                                    'data-name'
                                                );
                                            setFormValue(payment);
                                            // console.log(payment);
                                        }}
                                    />
                                    <label
                                        className="form-check-label px-2"
                                        htmlFor="creditCardPayment"
                                    >
                                        信用卡付款
                                    </label>
                                </div>
                                <div className="form-check d-flex align-items-center py-3">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="NonePayment"
                                        data-name="nonepay"
                                        onClick={(e) => {
                                            const payment =
                                                e.target.getAttribute(
                                                    'data-name'
                                                );
                                            setFormValue(payment);
                                            // console.log(payment);
                                        }}
                                    />
                                    <label
                                        className="form-check-label px-2"
                                        htmlFor="NonePayment"
                                    >
                                        到店付款
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div className="my-4 text-end d-none d-md-block">
                            <button
                                className="btn cart_button_color_green cart_button_borderradius px-5 text-white"
                                onClick={() => {
                                    paymentLinkto();
                                }}
                            >
                                下單付款
                            </button>
                        </div>
                    </div>

                    {/* 電腦版結帳section結束 */}

                    <div className="col-12 col-md-8">
                        <h2 className="my-3">帳單資訊</h2>
                        <form action="" name="form_payment">
                            <div className="my-2">
                                <label htmlFor="name">姓名*</label>
                                <br />
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    defaultValue={paymentName}
                                    onChange={(e) => {
                                        setPaymentName(e.target.value);
                                    }}
                                    className="form-control my-2"
                                    placeholder="請輸入您的姓名"
                                />
                            </div>
                            <div className="my-2">
                                <label htmlFor="mobile">通訊電話*</label>
                                <br />
                                <input
                                    type="text"
                                    name="mobile"
                                    id="mobile"
                                    defaultValue={paymentMobile}
                                    onChange={(e) => {
                                        setPaymentMobile(e.target.value);
                                    }}
                                    className="form-control my-2"
                                    placeholder="09xx-xxx-xxx"
                                />
                            </div>
                            <div className="my-2">
                                <label htmlFor="email">電子信箱郵件*</label>
                                <br />
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    defaultValue={paymentEmail}
                                    onChange={(e) => {
                                        setPaymentEmail(e.target.value);
                                    }}
                                    className="form-control my-2"
                                    placeholder="EX:farmer@gmail.com"
                                />
                            </div>
                            <div className="my-2">
                                <label htmlFor="">地址*</label>
                                <br />
                                <input
                                    type="text"
                                    className="form-control my-2"
                                    placeholder="地址:"
                                    defaultValue={paymentAddress}
                                    onChange={(e) => {
                                        setPaymentAddress(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="my-2">
                                <label htmlFor="cart_comment">訂單備註</label>
                                <br />
                                <textarea
                                    name="cart_comment"
                                    className="form-control my-2"
                                    id="cart_comment"
                                    cols="30"
                                    rows="10"
                                    placeholder="請輸入您的備註..."
                                    defaultValue={paymentRemark}
                                    onChange={(e) => {
                                        setPaymentRemark(e.target.value);
                                    }}
                                ></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="col-12 d-md-none">
                        <h2 className="my-3">付款方式</h2>
                        <form
                            className=""
                            id="paymentChosen"
                            name="paymentChosen"
                        >
                            <div className="form-check d-flex align-items-baseline py-2">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="linePayPayment"
                                    data-name="linepay"
                                    onClick={(e) => {
                                        const payment =
                                            e.target.getAttribute('data-name');
                                        setFormValue(payment);
                                        // console.log(payment);
                                    }}
                                />
                                <label
                                    className="form-check-label px-2"
                                    htmlFor="linePayPayment"
                                >
                                    <img
                                        style={{ maxHeight: '50px' }}
                                        src="/images/ben/linepay_logo.png"
                                        alt=""
                                    />
                                </label>
                            </div>
                            <div className="form-check d-flex align-items-center py-2">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="creditcardPayment"
                                    data-name="creditcard"
                                    onClick={(e) => {
                                        const payment =
                                            e.target.getAttribute('data-name');
                                        setFormValue(payment);
                                        // console.log(payment);
                                    }}
                                />
                                <label
                                    className="form-check-label px-2"
                                    htmlFor="creditcardPayment"
                                >
                                    信用卡付款
                                </label>
                            </div>

                            <div className="form-check d-flex align-items-center py-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="nonepay"
                                    data-name="nonepay"
                                    onClick={(e) => {
                                        const payment =
                                            e.target.getAttribute('data-name');
                                        setFormValue(payment);
                                        // console.log(payment);
                                    }}
                                />
                                <label
                                    className="form-check-label px-2"
                                    htmlFor="nonepay"
                                >
                                    到店付款
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="my-4 text-center d-md-none">
                    <button
                        className="btn cart_button_borderradius  cart_button_color_green px-5 text-white "
                        onClick={() => {
                            paymentLinkto();
                        }}
                    >
                        下單付款
                    </button>
                </div>
            </div>
        </>
    );
}

export default CartPayment;
