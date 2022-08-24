import './Activity.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Activity() {
    const navigate = useNavigate();
    const goToPath = (sid) => {
        navigate(`/activity/${sid}`);
        window.scroll(0, 0);
    };
    const [data, setData] = useState([
        {
            sid: '',
            company_id: '',
            card_img: '',
            card_area: '',
            card_city: '',
            card_info: '',
            card_a: '',
            card_b: '',
        },
    ]);

    const getdata = async () => {
        const response = await axios.get(
            'http://localhost:3600/activity/getdata'
        );
        // const obj = await response.data.json();
        const newArrayToShow = response.data.map((v) => {
            return { ...v, card_img: JSON.parse(v.card_img) };
        });
        console.log(newArrayToShow);
        setData(newArrayToShow);
    };
    useEffect(() => {
        getdata();
    }, []);

    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <h1 className="display-4 text-white mytext ">
                    慢遊臺灣農旅行 休閒農業區好好玩
                </h1>
            </div>
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="d-flex justify-content-center pb-4">
                            <hr className="w-25" />
                            <h2 className="px-5">熱門活動</h2>
                            <hr className="w-25" />
                        </div>
                    </div>
                    <div className="row">
                        {data
                            ? data.map((row) => (
                                  <div
                                      className="col-12 col-md-4 g-4 px-3"
                                      key={'mm' + row.sid}
                                  >
                                      <div className="card card shadow-sm  h-100  ">
                                          <div className="img-wrap">
                                              <img
                                                  className="w-100 h-100"
                                                  src={`/images/activity/${row.card_img[0]}`}
                                                  alt=""
                                              />
                                          </div>
                                          <div className="card-body d-flex flex-column h-100 ">
                                              <div className="text-center pb-2">
                                                  <h5 className="mb-0">
                                                      {`${row.card_area}`}
                                                  </h5>
                                                  <div className="mb-1 text-muted">
                                                      {`${row.card_city}`}
                                                  </div>
                                              </div>
                                              <p className="">
                                                  {`${row.card_info}`}
                                              </p>
                                              <div className="flex-grow-1">
                                                  <ul className="list-group list-group-flush">
                                                      建議行程：
                                                      <li className="list-group ps-3">
                                                          {`${row.card_a}`}
                                                      </li>
                                                  </ul>
                                                  <ul className="list-group list-group-flush">
                                                      體驗活動：
                                                      <li className="list-group ps-3">
                                                          {`${row.card_b}`}
                                                      </li>
                                                  </ul>
                                              </div>

                                              <div className="d-flex justify-content-end p-3 ">
                                                  <button
                                                      type="button"
                                                      className="btn btn-outline-success"
                                                      onClick={() =>
                                                          goToPath(`${row.sid}`)
                                                      }
                                                  >
                                                      詳細資訊
                                                  </button>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              ))
                            : null}
                    </div>
                </div>
            </div>
        </>
    );
}
export default Activity;
