/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
// import foodList from '../data/foodList.json'
import axios from 'axios';

function Foods(props) {
    const Swal = require('sweetalert2');
    const {
        dataFromFoodArea,
        setDataFromFoodArea,
        isShowed,
        setIsShowed,
        foodList,
        setFoodList,
    } = props;
    //添加食材
    const addItem = (item) => {
        if (dataFromFoodArea.length < 5) {
            const newItem = { ...item, tid: +Date.now() };
            setDataFromFoodArea([...dataFromFoodArea, newItem]);
        } else {
            Swal.fire({
                icon: 'error',
                title: '食材只能選五樣唷:)',
            });
            return;
        }
    };
    //撈資料庫
    const getUserData = async () => {
        const response = await axios.get(
            'http://localhost:3600/customized_lunch/api'
        );
        setFoodList(response.data.rows);
    };
    //撈資料庫都寫在useEffect
    useEffect(() => {
        getUserData();
    }, []);

    //  每個商品物件
    // {
    //   "id": 1,
    //   "name": "白飯",
    //   "category": "1",
    //   "image": "images/rice.png",
    //   "price": 10
    // }
    return (
        <>
            <div
                className={
                    isShowed
                        ? 'col-md-3 g-0 xin-sideMenu showSideBar xin-food-area '
                        : 'col-md-3 g-0 sideMenuNX hiddenSideBar xin-food-area '
                }
            >
                <ul
                    className={
                        isShowed
                            ? 'nav nav-pills mb-3 flex-nowrap '
                            : 'nav nav-pills mb-3 flex-nowrap hidden'
                    }
                    id="pills-tab"
                    role="tablist"
                >
                    <li
                        className="nav-item xin-nav-item col-3 d-flex justify-content-center"
                        role="presentation"
                    >
                        <button
                            className="xin-nav-link nav-link active  w-100"
                            id="staple-food"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-staple-food"
                            type="button"
                            role="tab"
                            aria-controls="pills-staple-food"
                            aria-selected="true"
                        >
                            主食
                        </button>
                    </li>
                    <li
                        className="nav-item xin-nav-item col-3 d-flex justify-content-center"
                        role="presentation"
                    >
                        <button
                            className="xin-nav-link nav-link  w-100"
                            id="meal"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-meal"
                            type="button"
                            role="tab"
                            aria-controls="pills-meal"
                            aria-selected="false"
                        >
                            肉類
                        </button>
                    </li>
                    <li
                        className="nav-item xin-nav-item col-3 d-flex justify-content-center"
                        role="presentation"
                    >
                        <button
                            className="xin-nav-link nav-link w-100"
                            id="seafood"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-seafood"
                            type="button"
                            role="tab"
                            aria-controls="pills-seafood"
                            aria-selected="false"
                        >
                            海鮮
                        </button>
                    </li>
                    <li
                        className="nav-item xin-nav-item col-3 d-flex justify-content-center"
                        role="presentation"
                    >
                        <button
                            className="xin-nav-link nav-link  w-100"
                            id="vegetable"
                            data-bs-toggle="pill"
                            data-bs-target="#pills-vegetable"
                            type="button"
                            role="tab"
                            aria-controls="pills-vegetable"
                            aria-selected="false"
                        >
                            青菜類
                        </button>
                    </li>
                </ul>

                <div
                    className={isShowed ? 'tab-content' : 'tab-content hidden'}
                    id="pills-tabContent"
                >
                    <div
                        className="tab-pane fade show active"
                        id="pills-staple-food"
                        role="tabpanel"
                        aria-labelledby="pills-staple-food"
                    >
                        <div className="d-flex flex-wrap ">
                            {foodList
                                .filter((v, i) => {
                                    return v.category === 1;
                                })
                                .map((v, i) => {
                                    return (
                                        <div
                                            key={v.id}
                                            className="foodCard col-md-4 col-4 mb-3 card xin-card border-0 align-items-center"
                                            onClick={() => {
                                                addItem(v);
                                            }}
                                        >
                                            <img
                                                className="man xin-card-img-top"
                                                src={v.image}
                                                alt={v.name}
                                            />
                                            <div className="card-body xin-card-body">
                                                <p className="card-text text-center m-0 pName">
                                                    {v.name}
                                                </p>
                                                <p className="card-text text-center">
                                                    價格:{v.price}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="pills-meal"
                        role="tabpanel"
                        aria-labelledby="pills-meal"
                    >
                        <div className="d-flex flex-wrap">
                            {foodList
                                .filter((v, i) => {
                                    return v.category === 2;
                                })
                                .map((v, i) => {
                                    return (
                                        <div
                                            key={v.id}
                                            className="foodCard col-md-4 col-4 mb-3 card xin-card border-0 align-items-center  "
                                            onClick={() => {
                                                addItem(v);
                                            }}
                                        >
                                            <img
                                                className="man xin-card-img-top need-obj-contain"
                                                src={v.image}
                                                alt={v.name}
                                            />

                                            <div className="card-body xin-card-body">
                                                <p className="card-text text-center m-0 pName">
                                                    {v.name}
                                                </p>
                                                <p className="card-text text-center">
                                                    價格:{v.price}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="pills-seafood"
                        role="tabpanel"
                        aria-labelledby="pills-seafood"
                    >
                        <div className="d-flex flex-wrap">
                            {foodList
                                .filter((v, i) => {
                                    return v.category === 3;
                                })
                                .map((v, i) => {
                                    return (
                                        <div
                                            key={v.id}
                                            className="foodCard col-md-4 col-4 mb-3 card xin-card border-0 align-items-center "
                                            onClick={() => {
                                                addItem(v);
                                            }}
                                        >
                                            <img
                                                className="man xin-card-img-top need-obj-contain"
                                                src={v.image}
                                                alt={v.name}
                                            />

                                            <div className="card-body xin-card-body">
                                                <p className="card-text text-center m-0 pName">
                                                    {v.name}
                                                </p>
                                                <p className="card-text text-center">
                                                    價格:{v.price}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div
                        className="tab-pane fade"
                        id="pills-vegetable"
                        role="tabpanel"
                        aria-labelledby="pills-vegetable"
                    >
                        <div className="d-flex flex-wrap">
                            {foodList
                                .filter((v, i) => {
                                    return v.category === 4;
                                })
                                .map((v, i) => {
                                    return (
                                        <div
                                            key={v.id}
                                            className="foodCard col-md-4 col-4 mb-3 card xin-card border-0 align-items-center "
                                            onClick={() => {
                                                addItem(v);
                                            }}
                                        >
                                            <img
                                                className="man xin-card-img-top"
                                                src={v.image}
                                                alt={v.name}
                                            />

                                            <div className="card-body xin-card-body">
                                                <p className="card-text text-center m-0 pName">
                                                    {v.name}
                                                </p>
                                                <p className="card-text text-center">
                                                    價格:{v.price}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                </div>
                <button
                    className={
                        isShowed
                            ? 'xin-rightArrow xin-rightArrow-in'
                            : 'xin-rightArrow xin-rightArrow-out'
                    }
                    onClick={() => setIsShowed(isShowed)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </>
    );
}

export default Foods;
