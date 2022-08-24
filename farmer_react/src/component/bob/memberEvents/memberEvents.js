import './events.css';
import { useState, useEffect } from 'react';
import MemberNavbar from '../component/memberCenter_Navbar';
import { Navigate, useNavigate } from 'react-router-dom';
import { FaPhoneAlt } from 'react-icons/fa';

function MemberEvents() {
    const [response, setResponse] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredResult, setFilteredResult] = useState([]);
    const [filterCate, setFilterCate] = useState('');
    const navigate = useNavigate();

    const category = [
        '基隆市',
        '新北市',
        '台北市',
        '桃園市',
        '新竹市',
        '苗栗縣',
        '臺中市',
        '南投縣',
        '彰化縣',
        '雲林縣',
        '嘉義縣',
        '台南市',
        '高雄市',
        '屏東縣',
    ];

    const loginUser = JSON.parse(localStorage.getItem('auth'));

    const getEventsData = async () => {
        const r = await fetch('http://localhost:3600/member/myevents', {
            headers: { loginUser: loginUser.customer_id },
        });
        const obj = await r.json();
        setResponse(obj);
    };

    useEffect(() => {
        getEventsData();
    }, []);

    function searchItems(searchValue) {
        setSearchInput(searchValue);
        if (searchValue !== '') {
            const filteredData = response.filter((item) => {
                return Object.values(item)
                    .join('')
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            });
            setFilteredResult(filteredData);
        } else {
            setFilteredResult(response);
        }
    }

    function searchCategory(searchValue) {
        setFilterCate(searchValue);
        if (searchValue !== '') {
            const filteredData = response.filter((item) => {
                return Object.values(item)
                    .join('')
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            });
            setFilteredResult(filteredData);
        } else {
            setFilteredResult(response);
        }
    }

    return (
        <>
            <div className="container py-5">
                <div className="row">
                    <MemberNavbar />
                    <div className="col-9">
                        <div className="container">
                            <h2 className="text-center fw-bold m-3">
                                我的活動
                            </h2>
                            <div className="row justify-content-center">
                                <form className="d-flex col-sm-7 mb-3">
                                    <select
                                        className="form-select mx-2 shadow-none"
                                        value={filterCate}
                                        onChange={(e) => {
                                            searchCategory(e.target.value);
                                        }}
                                    >
                                        <option value="">請選擇活動地區</option>
                                        {category.map((v, i) => {
                                            return (
                                                <option value={v} key={i}>
                                                    {v}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    <div className="border rounded col-sm-7 d-flex align-items-center">
                                        <input
                                            className="form-control me-2 shadow-none border-0"
                                            id="text"
                                            type="search"
                                            name="search"
                                            placeholder="請搜尋活動名稱"
                                            aria-label="search"
                                            onChange={(e) => {
                                                searchItems(e.target.value);
                                            }}
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-search col-sm-2"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="container row justify-content-center">
                            {response[0] ? (
                                searchInput.length >= 1 ||
                                filterCate.length >= 1 ? (
                                    filteredResult
                                        .filter((v) => {
                                            return +v.isliked === 1;
                                        })
                                        .map((v, i) => {
                                            return (
                                                <div
                                                    className="card mb-3 shadow-sm"
                                                    style={{
                                                        maxWidth: '640px',
                                                    }}
                                                    key={v.activity_sid}
                                                >
                                                    <div className="row">
                                                        <div className="col-4 p-0">
                                                            <img
                                                                src={`/images/activity/${
                                                                    JSON.parse(
                                                                        v.card_img
                                                                    )[0]
                                                                }`}
                                                                className="img-fluid rounded-start h-100 boe-objft"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="col-8">
                                                            <div className="card-body">
                                                                <dl className="row border-bottom mx-0">
                                                                    <dt className="col-6 p-0">
                                                                        <h5 className="card-title">
                                                                            {
                                                                                v.card_area
                                                                            }
                                                                        </h5>
                                                                    </dt>
                                                                    <dd className="col-6 text-end p-0">
                                                                        <button
                                                                            className="btn btn-sm boe-buttonColor text-white mb-0"
                                                                            onClick={() => {
                                                                                window.scroll(
                                                                                    0,
                                                                                    0
                                                                                );
                                                                                navigate(
                                                                                    `/activity/${v.activity_sid}`,
                                                                                    {
                                                                                        replace: true,
                                                                                    }
                                                                                );
                                                                            }}
                                                                        >
                                                                            查看詳情
                                                                        </button>
                                                                    </dd>
                                                                </dl>
                                                                <p
                                                                    className="card-text lh-sm boe-multiline-ellipsis"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: `${v.card_info1}`,
                                                                    }}
                                                                ></p>
                                                                <dl className="row m-0">
                                                                    <dt className="col-4 p-0">
                                                                        <p className="card-text boe-farmColor">
                                                                            {
                                                                                v.card_city
                                                                            }
                                                                        </p>
                                                                    </dt>
                                                                    <dd className="col-8 text-end p-0 m-0">
                                                                        <p className="card-text">
                                                                            <FaPhoneAlt></FaPhoneAlt>{' '}
                                                                            {
                                                                                v.phone
                                                                            }
                                                                        </p>
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                ) : (
                                    response
                                        .filter((v) => {
                                            return +v.isliked === 1;
                                        })
                                        .map((v, i) => {
                                            return (
                                                <div
                                                    className="card mb-3 shadow-sm"
                                                    style={{
                                                        maxWidth: '640px',
                                                    }}
                                                    key={v.activity_sid}
                                                >
                                                    <div className="row">
                                                        <div className="col-4 p-0">
                                                            <img
                                                                src={`/images/activity/${
                                                                    JSON.parse(
                                                                        v.card_img
                                                                    )[0]
                                                                }`}
                                                                className="img-fluid rounded-start h-100 boe-objft"
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="col-8">
                                                            <div className="card-body">
                                                                <dl className="row border-bottom mx-0">
                                                                    <dt className="col-6 p-0">
                                                                        <h5 className="card-title">
                                                                            {
                                                                                v.card_area
                                                                            }
                                                                        </h5>
                                                                    </dt>
                                                                    <dd className="col-6 text-end p-0">
                                                                        <button
                                                                            className="btn btn-sm boe-buttonColor text-white mb-0"
                                                                            onClick={() => {
                                                                                window.scroll(
                                                                                    0,
                                                                                    0
                                                                                );
                                                                                navigate(
                                                                                    `/activity/${v.activity_sid}`,
                                                                                    {
                                                                                        replace: true,
                                                                                    }
                                                                                );
                                                                            }}
                                                                        >
                                                                            查看詳情
                                                                        </button>
                                                                    </dd>
                                                                </dl>
                                                                <p
                                                                    className="card-text lh-sm boe-multiline-ellipsis"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html: `${v.card_info1}`,
                                                                    }}
                                                                ></p>
                                                                <dl className="row m-0">
                                                                    <dt className="col-4 p-0">
                                                                        <p className="card-text boe-farmColor">
                                                                            {
                                                                                v.card_city
                                                                            }
                                                                        </p>
                                                                    </dt>
                                                                    <dd className="col-8 text-end p-0 m-0">
                                                                        <p className="card-text">
                                                                            <FaPhoneAlt></FaPhoneAlt>{' '}
                                                                            {
                                                                                v.phone
                                                                            }
                                                                        </p>
                                                                    </dd>
                                                                </dl>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })
                                )
                            ) : (
                                <p className="text-muted text-center mt-5">
                                    尚無收藏的行程
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MemberEvents;
