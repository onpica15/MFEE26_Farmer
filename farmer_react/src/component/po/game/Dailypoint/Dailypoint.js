import React, { useState, useEffect } from 'react';
import './dailypoint.css';
import Pages from '../components/Pages';
import axios from 'axios';
import Pointtime from '../components/Pointtime';

function Dailypoint() {
    const [dataCheck, setDataCheck] = useState(true);
    const [eggStates, setEggStates] = useState([0, 0, 0, 0, 0]);
    const [eggpoints, setEggPoints] = useState(0);
    //info頁籤的鉤子
    const [info, setInfo] = useState(0);
    //限定一天一次領取點數提示
    const [showup, setShowup] = useState();
    const [showuptime, setShowupTime] = useState()
    const Swal = require('sweetalert2');
    const pointArray = [100, 140, 160, 150, 50, 200];
    const randomNum = Math.ceil(Math.random() * 6) - 1;

    const brokenegg = '/dailypoint-img/44434.png';
    const defaultegg = '/dailypoint-img/812921.png';
    //for會員
    const loginUser = JSON.parse(localStorage.getItem('auth'));

    const getMemberData = () => {
        fetch('http://localhost:3600/game/member', {
            method: 'GET',
            headers: { change_memberid: loginUser.customer_id },
        })
            .then((r) => r.json())
            .then((obj) => {
                // console.log(obj[0].daily_points);
                setEggPoints(obj[0].daily_points);
            });
    };

    useEffect(() => {
        getMemberData();
    }, []);

    const updateEggPoint = (points) => {
        axios
            .post('http://localhost:3600/game/addpoints', {
                change_points: points,
                change_memberid: loginUser.customer_id,
            })
            .then((result) => {
                console.log(result.data);
            });
    };

    const eggClick = (i) => {
        if (dataCheck) {
            const newEggStates = [...eggStates];
            newEggStates[i] = 1;
            setEggStates(newEggStates);

            let getPoint = pointArray[randomNum];
            // console.log(getPoint);
            // console.log(eggpoints + getPoint);

            setEggPoints(eggpoints + getPoint);
            // console.log(eggpoints);
            updateEggPoint(eggpoints + getPoint);
            Swal.fire({
                position: 'centre',
                icon: 'success',
                title: `獲得${getPoint}點數!!`,
                showConfirmButton: false,
                timer: 1500,
            });

            //每日只領一次
            setDataCheck(false);
        } else {
            setShowup('今日已完成兌換囉...');
            setShowupTime(<Pointtime />);
        }
    };
    useEffect(() => {}, [eggStates]);

    return (
        <>
            <div className="mb-4 text-white bgg">
                <div className="container pt-5">
                    <div className="text-center pt-5">
                        <img
                            src="/dailypoint-img/1041602.png"
                            alt=""
                            data-check={dataCheck}
                            className="eggyellow mb-4 mt-4"
                        />
                    </div>
                    <div className="text-center">
                        {Array(5)
                            .fill(1)
                            .map((v, i) => {
                                return (
                                    <img
                                        key={i}
                                        src={
                                            eggStates[i]
                                                ? brokenegg
                                                : defaultegg
                                        }
                                        alt=""
                                        data-check={dataCheck.dataCheck}
                                        className="egg"
                                        onClick={(e) => {
                                            eggClick(i);
                                        }}
                                    />
                                );
                            })}
                    </div>
                    <br />
                    <div className="">
                        <h2 className="display-7 text-center">點擊領取</h2>
                    </div>
                    <div className="">
                        <h2 className="display-7 text-center ">
                            目前點數:{eggpoints}
                        </h2>
                    </div>
                    <br />
                    <div className="">
                        <p className="lead mb-0 text-center bg-danger bg-gradient rounded-pill bg-opacity-75">
                            {showup}
                        </p>
                    </div>
                    <div>
                        {showuptime}
                        {/* <Pointtime /> */}
                    </div>
                </div>
            </div>

            <div>
                <Pages
                    eggpoints={eggpoints}
                    info={info}
                    setInfo={setInfo}
                    setEggPoints={setEggPoints}
                />
            </div>
        </>
    );
}

export default Dailypoint;
