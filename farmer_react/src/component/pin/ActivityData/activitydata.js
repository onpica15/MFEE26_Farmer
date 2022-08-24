import './activitydata.css';
import Slider from 'react-slick';
// import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ActivityData() {
    const member_info_id = localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth')).customer_id
        : 500000000;
    let { sid } = useParams();
    const settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
    };
    const [data, setData] = useState([]);
    const [like, setLike] = useState(0);
    const [count, setCount] = useState(0);

    const checkLike = () => {
        fetch('http://localhost:3600/activity/checkisliked', {
            method: 'GET',
            headers: { customer_id: member_info_id, activity_sid: sid },
        })
            .then((r) => r.json())
            .then((obj) => {
                setLike(obj);
            });
    };
    const checkLikeClick = () => {
        // console.log(sid);
        const packageToSend = {
            customer_id: member_info_id,
            activity_sid: sid,
            isliked: like === 1 ? 0 : 1,
        };
        fetch('http://localhost:3600/activity/islikedchange', {
            method: 'POST',
            body: JSON.stringify(packageToSend),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then((obj) => {
                // console.log(obj);
                setCount(count + 1);
            });
    };

    const getdata = async () => {
        fetch('http://localhost:3600/activity/activitydata', {
            method: 'GET',
            headers: { sid: sid },
        })
            .then((r) => r.json())
            .then((obj) => {
                // console.log(obj);
                setData(obj);
            });
        // console.log(response);
        // setData(response.data);
    };
    // console.log(data);

    useEffect(() => {
        getdata();
        checkLike();
    }, []);

    useEffect(() => {
        checkLike();
    }, [count]);

    return (
        <>
            <div className="container pt-4">
                {data.map((row) => (
                    <div className="row" key={'mm' + row.sid}>
                        <div className="region">{`${row.card_city}`}</div>
                        <div className="d-flex flex-wrap">
                            <h2 className="article-head-title ">
                                {`${row.card_area}`}
                            </h2>
                        </div>
                        <div className="article-info row mb-4">
                            <div className="col-md-8 mb-3 pt-3">
                                <div>
                                    <Slider {...settings}>
                                        {/* {console.log(
                                                  JSON.parse(
                                                      row.company_infoImg
                                                  )
                                              )} */}
                                              {/* {console.log(row.company_infoImg)} */}
                                        {JSON.parse(row.company_infoImg).map(
                                            (v2, i2) => {
                                                return (
                                                    <div className="" key={i2}>
                                                        <img
                                                            src={`/images/activity/${v2}`}
                                                            className="d-block w-100 "
                                                            style={
                                                                {
                                                                    //   height: '75vh',
                                                                    //   width: '100vh',
                                                                }
                                                            }
                                                            alt=""
                                                        />
                                                    </div>
                                                );
                                            }
                                        )}
                                    </Slider>
                                </div>
                                {/* <img
                            src="./imgs/1.jpg"
                            className="d-block w-100"
                            alt=""
                        /> */}
                            </div>
                            <div className="col-md-4 d-flex flex-column">
                                <div className="form-row">
                                    <div className="col-12 mb-3">
                                        <button
                                            type="button"
                                            className={
                                                like === 1
                                                    ? 'btn btn-outline-danger w-100'
                                                    : 'btn btn-outline-success w-100'
                                            }
                                            onClick={() => {
                                                checkLikeClick();
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-heart me-3"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                                            </svg>
                                            {like === 1
                                                ? '已加入收藏'
                                                : '加入收藏'}
                                        </button>
                                    </div>
                                </div>
                                <dl className="form-group px-3 py-2  mb-2 round bg-light word-break-all">
                                    <dt>地址</dt>
                                    <dd
                                        style={{ paddingTop: '8px' }}
                                    >{`${row.address}`}</dd>
                                    <dt>電話</dt>
                                    <dd style={{ paddingTop: '8px' }}>
                                        {`${row.phone}`}{' '}
                                    </dd>
                                    <dt>傳真</dt>
                                    <dd
                                        style={{ paddingTop: '8px' }}
                                    >{`${row.fax}`}</dd>
                                </dl>
                                <div className="card">
                                    <h5 className="card-header">開放時間</h5>
                                    <ul className="list-group list-group-flush ">
                                        <li className="list-group-item d-flex">
                                            <dt>星期一</dt>
                                            <dd className="mx-3 m-0">
                                                08:00 ~ 17:00
                                            </dd>
                                        </li>
                                        <li className="list-group-item d-flex">
                                            <dt>星期二</dt>
                                            <dd className="mx-3 m-0">
                                                08:00 ~ 17:00
                                            </dd>
                                        </li>
                                        <li className="list-group-item d-flex">
                                            <dt>星期三</dt>
                                            <dd className="mx-3 m-0">
                                                08:00 ~ 17:00
                                            </dd>
                                        </li>
                                        <li className="list-group-item d-flex">
                                            <dt>星期四</dt>
                                            <dd className="mx-3 m-0 ">
                                                08:00 ~ 17:00
                                            </dd>
                                        </li>
                                        <li className="list-group-item d-flex">
                                            <dt>星期五</dt>
                                            <dd className="mx-3 m-0">
                                                08:00 ~ 17:00
                                            </dd>
                                        </li>
                                        <li className="list-group-item d-flex">
                                            <dt>星期六</dt>
                                            <dd className="mx-3 m-0">
                                                08:00 ~ 17:00
                                            </dd>
                                        </li>
                                        <li className="list-group-item d-flex">
                                            <dt>星期日</dt>
                                            <dd className="mx-3 m-0">
                                                08:00 ~ 17:00
                                            </dd>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="tabs">
                                <div className="tab-2">
                                    <label htmlFor="tab2-1">活動詳細資訊</label>
                                    <input
                                        id="tab2-1"
                                        name="tabs-two"
                                        type="radio"
                                    />
                                    <div>
                                        <p
                                            className=""
                                            dangerouslySetInnerHTML={{
                                                __html: `${row.card_info1}`,
                                            }}
                                        ></p>
                                        <h5 className="pt-3">體驗活動</h5>
                                        <div className="normal">
                                            <p className="">
                                                {`${row.card_a}`}
                                            </p>
                                        </div>
                                        <h5 className="pt-3">遊覽景點</h5>
                                        <div className="normal">
                                            <p className="">
                                                {`${row.card_b}`}
                                            </p>
                                        </div>
                                        <h5 className="pt-3">建議遊程</h5>
                                        <div className="normal">
                                            <p
                                                className=""
                                                dangerouslySetInnerHTML={{
                                                    __html: `${row.card_c}`,
                                                }}
                                            ></p>
                                        </div>
                                        <h5 className="pt-3">在地美食</h5>
                                        <div className="normal">
                                            <p
                                                className=""
                                                dangerouslySetInnerHTML={{
                                                    __html: `${row.card_d}`,
                                                }}
                                            ></p>
                                        </div>
                                        <h5 className="pt-3">伴手禮與農特產</h5>
                                        <div className="">
                                            <p
                                                className=""
                                                dangerouslySetInnerHTML={{
                                                    __html: `${row.card_e}`,
                                                }}
                                            ></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-2">
                                    <label htmlFor="tab2-2">地圖</label>
                                    <input
                                        id="tab2-2"
                                        name="tabs-two"
                                        type="radio"
                                    />
                                    <div>
                                        <iframe
                                            src={`${row.Map_a}`}
                                            width="100%"
                                            height="550"
                                            style={{ border: 'none' }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                        <div className="pt-5">
                                            <h5 className="pt-3">交通路線：</h5>
                                            <div className="">
                                                <p
                                                    className=""
                                                    dangerouslySetInnerHTML={{
                                                        __html: `${row.Map_b}`,
                                                    }}
                                                ></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
export default ActivityData;
