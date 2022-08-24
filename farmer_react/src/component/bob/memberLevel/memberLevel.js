import './level.css';
import { useState, useEffect } from 'react';
import MemberNavbar from '../component/memberCenter_Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MemberLevel() {
    const [myCoupons, setMyCoupons] = useState([]);
    const [myRecord, setMyRecord] = useState([]);
    const [myPoints, setMyPoints] = useState([]);

    const loginUser = JSON.parse(localStorage.getItem('auth'));
    const navigate = useNavigate();

    const getCouponData = async () => {
        const coupons = await axios.get(
            'http://localhost:3600/member/coupons',
            { headers: { loginUser: loginUser.customer_id } }
        );
        setMyCoupons(coupons.data);
        console.log(coupons.data);
    };

    const getRecordData = async () => {
        const record = await axios.get(
            'http://localhost:3600/member/purchaseRecord',
            { headers: { loginUser: loginUser.customer_id } }
        );

        const recordSum = record.data.reduce((a, b) => {
            return a + b.product_amount_total;
        }, 0);

        setMyRecord(recordSum);
        console.log(recordSum);
    };

    const getPointsData = async () => {
        const points = await axios.get(
            'http://localhost:3600/member/myPoints',
            { headers: { loginUser: loginUser.customer_id } }
        );

        setMyPoints(points.data);
        console.log(myPoints);
    };

    useEffect(() => {
        getCouponData();
        getRecordData();
        getPointsData();
    }, []);

    function myLevel() {
        if (myRecord < 5000) {
            return '銅卡會員';
        } else if (myRecord > 5000 && myRecord < 10000) {
            return '銀卡會員';
        } else {
            return '金卡會員';
        }
    }

    function presentCard() {
        if (myRecord < 5000) {
            return 'level_copper.jpg';
        } else if (myRecord > 5000 && myRecord < 10000) {
            return 'level_silver.jpg';
        } else {
            return 'level_gold.jpg';
        }
    }

    return (
        <>
            <div className="container py-5">
                <div className="row">
                    <MemberNavbar />
                    <div className="col-9">
                        <div className="container row justify-content-center">
                            <h2 className="text-center fw-bold m-3">
                                我的會員級別
                            </h2>
                            <div
                                className="card text-white bg-dark mb-3 shadow-sm"
                                style={{ maxWidth: '540px' }}
                            >
                                <div className="row">
                                    <div className="col-5 p-3">
                                        <img
                                            src={`/images/${presentCard()}`}
                                            className="img-fluid rounded h-100 bol-objft"
                                            alt=""
                                        />
                                    </div>
                                    <div className="col-7 m-auto p-0">
                                        <div className="card-body">
                                            <dl className="row border-bottom mx-0">
                                                <dt className="col-6 p-0">
                                                    <h5 className="card-title">
                                                        會員級別
                                                    </h5>
                                                </dt>
                                                <dd className="col-6 text-end p-0">
                                                    <h5 className="card-title bol-farmColor mb-0">
                                                        {myLevel()}
                                                    </h5>
                                                </dd>
                                            </dl>
                                            <dl className="row border-bottom mx-0">
                                                <dt className="col-7 p-0">
                                                    <h5 className="card-title">
                                                        年度累積消費
                                                    </h5>
                                                </dt>
                                                <dd className="col-5 text-end p-0">
                                                    <h5 className="card-title bol-farmColor mb-0">
                                                        ${' '}
                                                        {myRecord
                                                            ? myRecord
                                                            : 0}
                                                    </h5>
                                                </dd>
                                            </dl>
                                            <dl className="row m-0">
                                                <dt className="col-4 p-0">
                                                    <h5 className="card-text">
                                                        我的點數
                                                    </h5>
                                                </dt>
                                                <dd className="col-8 text-end p-0 m-0">
                                                    <h5 className="card-text bol-farmColor">
                                                        {myPoints[0]
                                                            ? myPoints[0]
                                                                  .daily_points
                                                            : 0}
                                                    </h5>
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h2 className="text-center fw-bold m-5">
                                我的優惠券
                            </h2>
                            <div className="container col-9 mt-2">
                                <div className="row justify-content-center">
                                    {myCoupons[0] ? (
                                        myCoupons
                                            .filter((v) => {
                                                return +v.coupon_isused === 0;
                                            })
                                            .map((v, i) => {
                                                return (
                                                    <div
                                                        className="bol-couponCss mb-3"
                                                        style={{
                                                            maxWidth: '420px',
                                                        }}
                                                        key={v.sid}
                                                    >
                                                        <div className="d-flex">
                                                            <div className="col-5 p-3">
                                                                <img
                                                                    src={
                                                                        v.change_img
                                                                    }
                                                                    className="img-fluid rounded-start h-100 boe-objft"
                                                                    alt=""
                                                                />
                                                            </div>
                                                            <div className="col-8 d-flex align-items-center">
                                                                <div className="card-body d-flex flex-column justify-content-center">
                                                                    <h2 className="bol-goldText">
                                                                        {
                                                                            v.change_coupon
                                                                        }
                                                                    </h2>
                                                                    <h6 className="text-light">
                                                                        兌換時間：
                                                                        {
                                                                            v.change_time
                                                                        }
                                                                    </h6>
                                                                    <div className="row col-6">
                                                                        <button
                                                                            className="btn btn-sm bol-buttonColor text-white ms-5"
                                                                            onClick={() => {
                                                                                navigate(
                                                                                    '/product',
                                                                                    {
                                                                                        replace: true,
                                                                                    }
                                                                                );
                                                                            }}
                                                                        >
                                                                            來去使用
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                    ) : (
                                        <p className="text-muted text-center mt-5">
                                            尚無可使用的優惠券
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MemberLevel;
