import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './../cart.css';
import { CART_LIST_TOBUY } from './../../../config/ajax-path';
import CartCountContext from '../cart_count/CartCountContext';

function Cart01() {
    const navigate = useNavigate();
    const [cartList, setCartList] = useState([]);
    const [freshList, setFreshList] = useState([]);
    const [customizedList, setCustomizedList] = useState([]);
    const [freshProductAmount, setFreshProductAmount] = useState(0);
    const [customizedProducAmount, setCustomizedProductAmount] = useState(0);
    const [totalAmount, setTotalAmountAmount] = useState(0);
    const cartContext = useContext(CartCountContext);

    //連接資料庫 抓資料並分為freshList customizedList
    const getData = async () => {
        const r = await fetch(`${CART_LIST_TOBUY}`);
        const obj = await r.json();
        console.log(obj);
        setCartList(obj);

        const newFreshList = obj.filter((v) => {
            return +v.cart_product_type === 1;
        });
        setFreshList(newFreshList);
        const newCustomizedList = obj.filter((v) => {
            return +v.cart_product_type === 2;
        });
        setCustomizedList(newCustomizedList);
    };

    useEffect(() => {
        getData();
    }, []);
    useEffect(() => {
        const newfreshProductAmountArray = freshList.map((v, i) => {
            return v.product_count * v.product_price;
        });
        let newfreshProductAmount = 0;
        newfreshProductAmountArray.map((v) => {
            newfreshProductAmount += v;
        });
        setFreshProductAmount(newfreshProductAmount);
    }, [freshList]);
    useEffect(() => {
        const newCustomizedProductAmountArray = customizedList.map((v, i) => {
            return v.product_count * v.product_price;
        });
        let newCustomizedProductAmount = 0;
        newCustomizedProductAmountArray.map((v) => {
            newCustomizedProductAmount += v;
        });
        setCustomizedProductAmount(newCustomizedProductAmount);
    }, [customizedList]);
   
    useEffect(() => {
        const totalPrice = customizedProducAmount + freshProductAmount;
        setTotalAmountAmount(totalPrice);
    }, [customizedProducAmount, freshProductAmount]);

    return (
        <>
            <div className="container">
                <div className="row ">
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
                            <li className="ps-md-5 ms-md-5 fs-5">商品</li>
                            <li className="ps-5 fs-5">單價</li>
                            <li className="pe-md-5 fs-5 text-end">數量</li>
                            <li className="fs-5">總價</li>
                        </ul>

                        {freshList.map((v, i) => {
                            return (
                                <div
                                    className="d-flex justify-content-between align-content-center mt-3 cart_border_bottom pb-2"
                                    key={i}
                                >
                                    <div className="d-flex justify-content-between align-content-center">
                                        <div className="d-flex flex-column justify-content-center">
                                            <span>
                                                <input
                                                    type="checkbox"
                                                    style={{
                                                        width: '20px',
                                                        height: '20px',
                                                    }}
                                                />
                                            </span>
                                            <span className="d-block cursor_pointer">
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

                                    <div className="d-flex flex-column justify-content-center">
                                        <p>{v.product_price}</p>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center pb-3">
                                        <div className="transformY">
                                            <button
                                                className="btn"
                                                onClick={() => {
                                                    const newFreshList =
                                                        JSON.parse(
                                                            JSON.stringify(
                                                                freshList
                                                            )
                                                        );
                                                    freshList[i].product_count -
                                                        1 >
                                                    0
                                                        ? (newFreshList[
                                                              i
                                                          ].product_count =
                                                              +freshList[i]
                                                                  .product_count -
                                                              1)
                                                        : (newFreshList[
                                                              i
                                                          ].product_count =
                                                              +freshList[i]
                                                                  .product_count);
                                                    setFreshList(newFreshList);
                                                }}
                                            >
                                                -
                                            </button>
                                            <input
                                                className="cart_input_length"
                                                type="text"
                                                value={v.product_count}
                                                style={{
                                                    width: '40px',
                                                    height: '40px',
                                                }}
                                                onChange={(e) => {
                                                    const newFreshList =
                                                        JSON.parse(
                                                            JSON.stringify(
                                                                freshList
                                                            )
                                                        );
                                                    if (e.target.value > 0) {
                                                        newFreshList[
                                                            i
                                                        ].product_count =
                                                            e.target.value;
                                                        setFreshList(
                                                            newFreshList
                                                        );
                                                    }
                                                }}
                                            />
                                            <button
                                                className="btn"
                                                onClick={() => {
                                                    const newFreshList =
                                                        JSON.parse(
                                                            JSON.stringify(
                                                                freshList
                                                            )
                                                        );

                                                    newFreshList[
                                                        i
                                                    ].product_count =
                                                        +freshList[i]
                                                            .product_count + 1;
                                                    setFreshList(newFreshList);
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                        <p>
                                            {v.product_count * v.product_price}
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
                                <li className="ps-md-5 ms-md-5 fs-5">商品</li>
                                <li className="ps-5 fs-5">單價</li>
                                <li className="pe-md-5 fs-5 text-end">數量</li>
                                <li className="fs-5">總價</li>
                            </ul>

                            {customizedList.map((v, i) => {
                                return (
                                    <div
                                        className="d-flex justify-content-between align-content-center mt-3 cart_border_bottom pb-2"
                                        key={i}
                                    >
                                        <div className="d-flex justify-content-between align-content-center">
                                            <div className="d-flex flex-column justify-content-center">
                                                <span>
                                                    <input
                                                        type="checkbox"
                                                        style={{
                                                            width: '20px',
                                                            height: '20px',
                                                        }}
                                                    />
                                                </span>
                                                <span className="d-block cursor_pointer">
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

                                        <div className="d-flex flex-column justify-content-center">
                                            <p>{v.product_price}</p>
                                        </div>
                                        <div className="d-flex flex-column justify-content-center pb-3">
                                            <div className="transformY">
                                                <button
                                                    className="btn"
                                                    onClick={() => {
                                                        const newCustomizedList =
                                                            JSON.parse(
                                                                JSON.stringify(
                                                                    customizedList
                                                                )
                                                            );

                                                        customizedList[i]
                                                            .product_count -
                                                            1 >
                                                        0
                                                            ? (newCustomizedList[
                                                                  i
                                                              ].product_count =
                                                                  +customizedList[
                                                                      i
                                                                  ]
                                                                      .product_count -
                                                                  1)
                                                            : (newCustomizedList[
                                                                  i
                                                              ].product_count =
                                                                  +customizedList[
                                                                      i
                                                                  ]
                                                                      .product_count);
                                                        setCustomizedList(
                                                            newCustomizedList
                                                        );
                                                    }}
                                                >
                                                    -
                                                </button>
                                                <input
                                                    className="cart_input_length"
                                                    type="text"
                                                    value={v.product_count}
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                    }}
                                                    onChange={(e) => {
                                                        const newCustomizedList =
                                                            JSON.parse(
                                                                JSON.stringify(
                                                                    customizedList
                                                                )
                                                            );
                                                        if (
                                                            e.target.value > 0
                                                        ) {
                                                            newCustomizedList[
                                                                i
                                                            ].product_count =
                                                                e.target.value;
                                                            setCustomizedList(
                                                                newCustomizedList
                                                            );
                                                        }
                                                    }}
                                                />
                                                <button
                                                    className="btn"
                                                    onClick={() => {
                                                        const newCustomizedList =
                                                            JSON.parse(
                                                                JSON.stringify(
                                                                    customizedList
                                                                )
                                                            );

                                                        newCustomizedList[
                                                            i
                                                        ].product_count =
                                                            +customizedList[i]
                                                                .product_count +
                                                            1;
                                                        setCustomizedList(
                                                            newCustomizedList
                                                        );
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <div className="d-flex flex-column justify-content-center">
                                            <p>
                                                {v.product_count *
                                                    v.product_price}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* 小計 */}
                        <div className="col mt-3">
                            <div className="d-flex justify-content-between">
                                <div className="ps-5">小計</div>
                                <div>NT${customizedProducAmount}</div>
                            </div>
                        </div>
                        <div className="col mt-3">
                            <div className="d-flex justify-content-end align-items-center">
                                <div className="pe-5">
                                    <span className="pe-3">折價券</span>
                                    <select name="" id="cart_discount_select">
                                        <option value="" disabled>
                                            --請選擇--
                                        </option>
                                    </select>
                                </div>
                                <div>NT$50</div>
                            </div>
                        </div>
                        <div className="col mt-3">
                            <div className="d-flex justify-content-between align-items-baseline">
                                <div className="pe-5">
                                    <div className="ps-5 fs-5">購物車總計</div>
                                </div>
                                <div>NT${totalAmount}</div>
                            </div>
                        </div>
                        <div className="col my-5">
                            <div className="d-flex justify-content-end">
                                <button className="btn btn-info mx-3 px-3">
                                    返回購物頁面
                                </button>
                                <button className="btn btn-info px-3">
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

export default Cart01;
