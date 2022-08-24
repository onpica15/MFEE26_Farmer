import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './../Cart.css';
import {
    CART_LIST_CHANGE_COUNT,
    CART_LIST_DELETE,
    CART_LIST_CHECK,
    CART_DISCOUNT,
} from './../../../config/ajax-path';
import CartCountContext from '../cart_count/CartCountContext';

function Cart() {
    const member_info = JSON.parse(localStorage.getItem('auth'))
        ? JSON.parse(localStorage.getItem('auth'))
        : null;
    const navigate = useNavigate();

    //取得資料庫資料
    const { cartList, setCartList } = useContext(CartCountContext);
    const [readyToBuyFreshCheck, setReadyToBuyFreshCheck] = useState([]);
    const [discountArray, setDiscountArray] = useState([]);
    const [discountValue, setDiscountValue] = useState(0);
    const [discountKey, setDiscountKey] = useState(0);
    const [readyToBuyCustomizedCheck, setReadyToBuyCustomizedCheck] = useState(
        []
    );
    const [freshProductAmount, setFreshProductAmount] = useState(0);
    const [customizedProducAmount, setCustomizedProductAmount] = useState(0);
    const [totalAmount, setTotalAmountAmount] = useState(0);

    // console.log(
    //     cartList
    //         .filter((v) => {
    //             return v.cart_product_type === 1;
    //         })
    //         .map((v) => {
    //             return v.product_inventory;
    //         })
    // );
    const changeCount = (sid, count) => {
        let changeData = {
            sid,
            product_count: count,
            member_id: member_info.customer_id,
        };

        fetch(`${CART_LIST_CHANGE_COUNT}`, {
            method: 'PUT',
            body: JSON.stringify(changeData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then((obj) => {
                // console.log(obj);
                setCartList(obj.cart);
            });
    };

    //設定生鮮產品是否購買checkbox
    useEffect(() => {
        const newFreshCheckArray = cartList
            .filter((v) => {
                return v.cart_product_type === 1;
            })
            .map((v) => {
                // console.log(v.ready_to_buy);
                return v.ready_to_buy;
            });
        // console.log(newFreshCheckArray);
        setReadyToBuyFreshCheck(newFreshCheckArray);
    }, [cartList]);

    //設定客製化便當是否購買checkbox
    useEffect(() => {
        const newCustomizedCheckArray = cartList
            .filter((v) => {
                return v.cart_product_type === 2;
            })
            .map((v) => {
                return v.ready_to_buy;
            });
        // console.log(newCustomizedCheckArray);
        setReadyToBuyCustomizedCheck(newCustomizedCheckArray);
    }, [cartList]);

    // 確認是否要進行購買;
    const productReadyToBuy = (sid, check) => {
        let changeData = { sid, check, member_id: member_info.customer_id };

        fetch(`${CART_LIST_CHECK}`, {
            method: 'PUT',
            body: JSON.stringify(changeData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then((obj) => {
                // console.log(obj);
                setCartList(obj.cart);
            });
    };

    //確認是否準備購買
    const checkProductItems = (array, i) => {
        let newCheckArray = [...array];
        +newCheckArray[i] === 1
            ? (newCheckArray[i] = 0)
            : (newCheckArray[i] = 1);
        // console.log(newCheckArray);
        return newCheckArray;
    };

    const deleteItem = (sid, name) => {
        const deleteIt = window.confirm(`確定要將${name}移出您的購物車嗎`);
        if (deleteIt) {
            let deleteData = { sid, member_id: member_info.customer_id };
            fetch(`${CART_LIST_DELETE}`, {
                method: 'DELETE',
                body: JSON.stringify(deleteData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((r) => r.json())
                .then((obj) => {
                    // console.log(obj);
                    setCartList(obj);
                });
        }
    };

    const checkCartHasItems = () => {
        // console.log(
        //     cartList.filter((v) => {
        //         return +v.ready_to_buy === 1;
        //     }).length
        // );
        if (
            cartList.filter((v) => {
                return +v.ready_to_buy === 1;
            }).length === 0
        ) {
            const answer = window.confirm('請先將待結帳商品加到購物車中');
            if (answer) {
                navigate('/cart');
            } else {
                navigate('/cart');
            }
        } else {
            sessionStorage.setItem('discountSid', discountKey);
            sessionStorage.setItem('discount', discountValue);
            navigate('./payment');
        }
    };

    const getDiscount = () => {
        fetch(CART_DISCOUNT, {
            method: 'GET',
            headers: { change_memberid: member_info.customer_id },
        })
            .then((r) => r.json())
            .then((obj) => {
                setDiscountArray(obj);
            });
    };

    //折價券改變價格
    const discountChange = (e) => {
        setDiscountValue(e.target.value);
        // sessionStorage.setItem('discount', discountValue);
        +e.target.options.selectedIndex - 1 >= 0
            ? setDiscountKey(
                  discountArray.filter((v) => {
                      return +v.coupon_isused === 0;
                  })[e.target.options.selectedIndex - 1].sid
              )
            : setDiscountKey(0);

        console.log(discountValue);
        console.log(discountKey);
    };

    useEffect(() => {
        getDiscount();
    }, []);

    useEffect(() => {
        const newfreshProductAmountArray = cartList
            .filter((v) => {
                return +v.cart_product_type === 1;
            })
            .filter((v) => {
                return +v.ready_to_buy === 1;
            })
            .map((v, i) => {
                return v.product_count * v.product_price;
            });
        let newfreshProductAmount = 0;
        for (let i of newfreshProductAmountArray) {
            newfreshProductAmount += i;
        }
        setFreshProductAmount(newfreshProductAmount);
    }, [cartList]);

    useEffect(() => {
        const newCustomizedProductAmountArray = cartList
            .filter((v) => {
                return +v.cart_product_type === 2;
            })
            .filter((v) => {
                return +v.ready_to_buy === 1;
            })
            .map((v, i) => {
                return v.product_count * v.total_price;
            });
        let newCustomizedProductAmount = 0;
        for (let i of newCustomizedProductAmountArray) {
            newCustomizedProductAmount += i;
        }
        setCustomizedProductAmount(newCustomizedProductAmount);
    }, [cartList]);

    useEffect(() => {
        const totalPrice =
            customizedProducAmount + freshProductAmount - discountValue;
        setTotalAmountAmount(totalPrice);
    }, [customizedProducAmount, freshProductAmount, discountValue]);

    return (
        <>
            <div className="container">
                <div className="row  mt-3">
                    <div className="col-12 col-md-8  mx-auto cart_step">
                        <div className="d-flex justify-content-between">
                            <div className="col-2">
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
                            <div className="col-1 d-flex justify-content-center align-items-center flex-column">
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
                <div className="row mt-5">
                    <div className="col">
                        <h2>生鮮商品</h2>
                        <span></span>
                        <ul className="d-flex list-unstyled justify-content-between mt-3 cart_border_bottom pb-2">
                            <li className="col-4 col-md-6  fs-5">商品</li>
                            <li className="col-2 fs-5 text-center">單價</li>
                            <li className="col-4 col-md-2 fs-5  text-center">
                                數量
                            </li>
                            <li className="col-2 fs-5 text-end">總價</li>
                        </ul>

                        {cartList
                            .filter((v) => {
                                return +v.cart_product_type === 1;
                            })
                            .map((v, i) => {
                                return (
                                    <div
                                        className="d-flex justify-content-between align-content-center mt-3 cart_border_bottom pb-2"
                                        key={(`fresh`, i)}
                                    >
                                        <div className="col-4 col-md-6 d-flex justify-content-start align-content-center">
                                            <div className="d-flex flex-column justify-content-center">
                                                <span>
                                                    <input
                                                        type="checkbox"
                                                        style={{
                                                            width: '20px',
                                                            height: '20px',
                                                        }}
                                                        onMouseDown={(e) => {
                                                            setReadyToBuyFreshCheck(
                                                                checkProductItems(
                                                                    readyToBuyFreshCheck,
                                                                    i
                                                                )
                                                            );
                                                        }}
                                                        onMouseUp={() => {
                                                            productReadyToBuy(
                                                                v.sid,
                                                                readyToBuyFreshCheck[
                                                                    i
                                                                ]
                                                            );
                                                        }}
                                                    />
                                                </span>
                                                <span
                                                    className="d-block cursor_pointer"
                                                    onClick={() => {
                                                        deleteItem(
                                                            v.sid,
                                                            v.product_name
                                                        );
                                                    }}
                                                >
                                                    <img
                                                        width="20px"
                                                        src="/images/ben/red-x.png"
                                                        alt=""
                                                    />
                                                </span>
                                            </div>
                                            <div className="d-flex flex-column flex-md-row ">
                                                <div className="mx-2">
                                                    <img
                                                        className="cart_product_img"
                                                        src={`/images/${
                                                            JSON.parse(
                                                                v.product_img
                                                            )[0]
                                                        }`}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="d-flex flex-column justify-content-center">
                                                    <p className="mx-3 text-center">
                                                        {v.product_name}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-2  text-center d-flex flex-column justify-content-center ">
                                            <p>{v.product_price}</p>
                                        </div>
                                        <div className="col-4 d-flex flex-column justify-content-center pb-3 col-md-2  text-center">
                                            <div className="transformY">
                                                <button
                                                    className="btn"
                                                    onClick={() => {
                                                        v.product_count - 1 > 0
                                                            ? changeCount(
                                                                  v.sid,
                                                                  v.product_count -
                                                                      1
                                                              )
                                                            : changeCount(
                                                                  v.sid,
                                                                  v.product_count
                                                              );
                                                    }}
                                                >
                                                    -
                                                </button>
                                                <span
                                                    className="cart_input_length"
                                                    type="text"
                                                    value={v.product_count}
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                    }}
                                                >
                                                    {v.product_count}
                                                </span>
                                                <button
                                                    className="btn"
                                                    onClick={() => {
                                                        v.product_count >=
                                                        v.product_inventory
                                                            ? changeCount(
                                                                  v.sid,
                                                                  v.product_count
                                                              )
                                                            : changeCount(
                                                                  v.sid,
                                                                  v.product_count +
                                                                      1
                                                              );
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-2 d-flex flex-column justify-content-center text-end">
                                            <p>
                                                {+v.ready_to_buy === 1
                                                    ? v.product_count *
                                                      v.product_price
                                                    : 0}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}

                        <div className="col my-3">
                            <div className="d-flex justify-content-between">
                                <div className="ps-5">小計</div>
                                <div>NT${freshProductAmount}</div>
                            </div>
                        </div>
                        {/* 客製化商品 */}

                        <div className="col mt-5">
                            <h2>客製化便當</h2>
                            <span></span>
                            <ul className="d-flex list-unstyled justify-content-between mt-3 cart_border_bottom pb-2">
                                <li className="col-4 col-md-6  fs-5">商品</li>
                                <li className="col-2 fs-5 text-center">單價</li>
                                <li className="col-4 col-md-2 fs-5  text-center">
                                    數量
                                </li>
                                <li className="col-2 fs-5 text-end">總價</li>
                            </ul>

                            {cartList
                                .filter((v) => {
                                    return +v.cart_product_type === 2;
                                })
                                .map((v, i) => {
                                    return (
                                        <div
                                            className="d-flex justify-content-between align-content-center mt-3 cart_border_bottom pb-2"
                                            key={(`customized`, i)}
                                        >
                                            <div className="col-4 col-md-6 d-flex justify-content-start align-content-center">
                                                <div className="d-flex flex-column justify-content-center">
                                                    <span>
                                                        <input
                                                            type="checkbox"
                                                            style={{
                                                                width: '20px',
                                                                height: '20px',
                                                            }}
                                                            onMouseDown={(
                                                                e
                                                            ) => {
                                                                setReadyToBuyCustomizedCheck(
                                                                    checkProductItems(
                                                                        readyToBuyCustomizedCheck,
                                                                        i
                                                                    )
                                                                );
                                                            }}
                                                            onMouseUp={() => {
                                                                productReadyToBuy(
                                                                    v.sid,
                                                                    readyToBuyCustomizedCheck[
                                                                        i
                                                                    ]
                                                                );
                                                            }}
                                                        />
                                                    </span>
                                                    <span
                                                        className="d-block cursor_pointer"
                                                        onClick={() => {
                                                            deleteItem(
                                                                v.sid,
                                                                v.lunch_name
                                                            );
                                                        }}
                                                    >
                                                        <img
                                                            width="20px"
                                                            src="/images/ben/red-x.png"
                                                            alt=""
                                                        />
                                                    </span>
                                                </div>
                                                <div className="d-flex flex-column flex-md-row">
                                                    <div className="mx-2">
                                                        <img
                                                            className="cart_product_img"
                                                            src={v.lunch_pic}
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="d-flex flex-column justify-content-center">
                                                        <p className="mx-3 text-center">
                                                            {v.lunch_name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-2  text-center d-flex flex-column justify-content-center">
                                                <p>{v.total_price}</p>
                                            </div>
                                            <div className="col-4 d-flex flex-column justify-content-center pb-3 col-md-2  text-center">
                                                <div className="transformY">
                                                    <button
                                                        className="btn"
                                                        onClick={() => {
                                                            v.product_count -
                                                                1 >
                                                            0
                                                                ? changeCount(
                                                                      v.sid,
                                                                      v.product_count -
                                                                          1
                                                                  )
                                                                : changeCount(
                                                                      v.sid,
                                                                      v.product_count
                                                                  );
                                                        }}
                                                    >
                                                        -
                                                    </button>
                                                    <span
                                                        className="cart_input_length"
                                                        type="text"
                                                        value={v.lunchbox_stock}
                                                        style={{
                                                            width: '40px',
                                                            height: '40px',
                                                        }}
                                                    >
                                                        {v.product_count}
                                                    </span>
                                                    <button
                                                        className="btn"
                                                        onClick={() => {
                                                            changeCount(
                                                                v.sid,
                                                                v.product_count +
                                                                    1
                                                            );
                                                        }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-2 d-flex flex-column justify-content-center text-end">
                                                <p>
                                                    {+v.ready_to_buy === 1
                                                        ? v.product_count *
                                                          v.total_price
                                                        : 0}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>

                        {/* 小計 */}
                        <div className="col mt-3">
                            <div className="d-flex justify-content-between">
                                <div className="ps-md-5">小計</div>
                                <div>NT${customizedProducAmount}</div>
                            </div>
                        </div>
                        <div className="col mt-3">
                            <div className="d-flex justify-content-between justify-content-md-end  align-items-center">
                                <span className="pe-3">折價券</span>
                                <select
                                    name=""
                                    id="cart_discount_select"
                                    className="ps-3 me-3"
                                    onChange={(e) => {
                                        discountChange(e);
                                    }}
                                >
                                    <option value="0">--請選擇--</option>
                                    {discountArray
                                        .filter((v) => {
                                            return +v.coupon_isused === 0;
                                        })
                                        .map((v, i) => {
                                            return (
                                                <option
                                                    value={v.change_spendprice}
                                                    key={v.sid}
                                                    data_key={v.sid}
                                                >
                                                    {v.change_coupon}
                                                </option>
                                            );
                                        })}
                                </select>

                                <div>NT${discountValue}</div>
                            </div>
                        </div>
                        <div className="col mt-3">
                            <div className="d-flex justify-content-between align-items-baseline">
                                <div className="pe-5">
                                    <div className="ps-md-5 fs-5">
                                        購物車總計
                                    </div>
                                </div>
                                <div>NT${totalAmount}</div>
                            </div>
                        </div>
                        <div className="col my-5">
                            <div className="d-flex justify-content-end">
                                <Link to="/product">
                                    <button className="btn cart_button_color_brown mx-3 px-3 cart_button_borderradius text-white">
                                        返回購物頁面
                                    </button>
                                </Link>

                                <button
                                    className="btn cart_button_color_green px-3 cart_button_borderradius text-white"
                                    onClick={() => {
                                        checkCartHasItems();
                                    }}
                                >
                                    繼續結帳
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
