import './coupon.css';
import React, { useEffect, useState } from 'react';
// import Dailypoint from '../../Dailypoint/Dailypoint'
//import ChangeTab from '../ChangeTab'
import axios from 'axios';
import { couponobj } from './data/couponobj';

export default function Coupon(props) {
    //解構蛋的點數
    const { eggpoints, setEggPoints } = props;

    const discountArray = [...couponobj];

    // 呈現資料畫面是否兌換完成
    const [CouponState, setCouponState] = useState([]);

    const Swal = require('sweetalert2');
    //登入專用
    const loginUser = JSON.parse(localStorage.getItem('auth'));

    useEffect(() => {
        setCouponState(discountArray);
        //setEggPoints(500)
    }, []);

    // useEffect(()=>{

    // },[eggpoints])

    const exchange = (i) => {
        //先拿到陣列裡的point
        const newPointToExchange = discountArray[i].point;
        const newtype = discountArray[i].type;
        const newPriceToExchange = discountArray[i].price;

        // console.log(newPointToExchange);
        //目前點數比對兌換券的point
        if (eggpoints >= newPointToExchange) {
            Swal.fire({
                position: 'centre',
                icon: 'success',
                title: '恭喜兌換完成!!',
                showConfirmButton: false,
                timer: 1500,
            });
            //如果點數足夠送資料到後端
            axios
                .post('http://localhost:3600/game/coupon', {
                    change_memberid: loginUser.customer_id,
                    change_coupon: newtype,
                    change_spendpoints: newPointToExchange,
                    change_spendprice: newPriceToExchange,
                    change_img: discountArray[i].image,
                })
                .then((result) => {
                    console.log(result.data);
                });
            const nowpoints = eggpoints - newPointToExchange;
            axios
                .post('http://localhost:3600/game/addpoints', {
                    change_points: nowpoints,
                    change_memberid: loginUser.customer_id,
                })
                .then((result) => {
                    console.log(result.data);
                });
            //目前點數減掉兌換後的點數
            setEggPoints(nowpoints);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '點數不足!',
                //footer: '<a href="">試試搶點</a>',
            });
        }
    };

    const clickchange = (i) => {
        let newCouponState = [...discountArray];
        newCouponState[i].change = 1;

        setCouponState(newCouponState);
    };

    return (
        <>
            <div className="container po_couponspace">
                <div className="row mb-2">
                    {discountArray.map((v, i) => {
                        return (
                            <div className="col-md-6 coupon" key={v.id}>
                                <div className="d-flex rounded overflow-hidden mb-4 flex-wrap">
                                    <div className="col-12 col-lg-8 ps-3 po_couponCss">
                                        <img
                                            className="couponobjfit w-100"
                                            src={v.image}
                                            // src="/dailypoint-img/52c1abae31a722933f917fce0fccc868.jpg"
                                            alt=""
                                        />
                                    </div>
                                    <div className="col-12 col-lg-4 p-3 d-flex  align-items-center flex-column position-static w-35 shadow   po_couponCss_left ">
                                        <p
                                            className="d-inline-block mb-1 text-primary text-center text-danger"
                                            style={{ fontSize: '2.5rem' }}
                                        >
                                            折價券
                                        </p>
                                        <div className="text-center">
                                            <span
                                                className="text-center"
                                                style={{ fontSize: '2rem' }}
                                            >
                                                $
                                            </span>
                                            <span
                                                className="text-center"
                                                style={{ fontSize: '4rem' }}
                                            >
                                                {v.price}
                                            </span>
                                        </div>
                                        <p className="text-center">
                                            --消費滿500可使用--
                                        </p>
                                        <button
                                            className="btn btn-primary po_buttonColor rounded-pill w-75"
                                            onClick={() => {
                                                clickchange(i);
                                                exchange(i);
                                            }}
                                        >
                                            {/* //  onClick={clickchange}>  */}
                                            {v.change === 0
                                                ? `${v.point}點兌換`
                                                : `${v.point}點兌換`}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
