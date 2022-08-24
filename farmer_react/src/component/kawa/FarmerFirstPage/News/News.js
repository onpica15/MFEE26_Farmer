import React, { useState, useEffect } from 'react';
import './News.css';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { FiArrowRightCircle } from 'react-icons/fi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const News = () => {
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
            <h2 className="justify-content-center d-flex mt-5">
                最新活動 / News
            </h2>

            <div className=" news_group mt-5 justify-content-center container ">
                <div className="row">
                    {data
                        ? data.slice(0, 4).map((row) => (
                              <div
                                  className="col-xs-12 col-sm-6 col-xl-3"
                                  key={'mm' + row.sid}
                              >
                                  <div className="news_card mx-3 d-flex flex-column">
                                      <img
                                          className=""
                                          src={`/images/activity/${row.card_img[0]}`}
                                          alt=""
                                      />
                                      <div className="card-body mt-3">
                                          <h5 className="card_area">
                                              {`${row.card_area}`}
                                          </h5>
                                          <h5 className="card_city mb-3">
                                              {`${row.card_city}`}
                                          </h5>
                                          <p className="newscard-text  flex-frow-1">
                                              {`${row.card_info}`}
                                          </p>
                                      </div>
                                      <a
                                          href="/#"
                                          className="btn btn-primary po_buttonColor"
                                      >
                                          活動詳情
                                      </a>
                                  </div>
                              </div>
                          ))
                        : null}
                </div>
            </div>
        </>
    );
};

export default News;
