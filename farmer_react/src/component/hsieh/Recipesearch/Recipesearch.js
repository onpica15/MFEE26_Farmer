import React, { useEffect, useState } from 'react';
// import { RECIPE_GET_LIST } from './../../../config/recipe-ajax-path';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Recipesearch.css';
import './Rightsidemenu.css';
import Pagination from './Pagination';
// import Popup from './Popup';
import axios from 'axios';
import Title from './../../lil/Title/index';

function Recipesearch() {
    const [ButtonPop, setButtonPop] = useState(false);

    const [inputText, setInputText] = useState('');

    const [data, setData] = useState({});
    const location = useLocation();
    const usp = new URLSearchParams(location.search);
    // usp.get('page')

    // console.log(location);

    const [recipe, setRecipe] = useState([]);
    const [recipeDisplay, setRecipeDisplay] = useState([]);
    const [recipeDisplayAgain, setRecipeDisplayAgain] = useState([]);

    const navigate = useNavigate();

    const [count, setCount] = useState(0);

    async function getRecipe() {
        const r = await fetch('http://localhost:3600/recipe/recipe');
        const obj = await r.json();
        console.log(obj);
        setRecipe(obj);
        setRecipeDisplay(obj);
        setRecipeDisplayAgain(obj);
    }

    async function getRecipe1() {
        const r = await fetch('http://localhost:3600/recipe/recipe');
        const obj = await r.json();
        console.log(obj);
        setRecipeDisplay(obj);
    }

    useEffect(() => {
        getRecipe();
    }, []);

    // 獲取食譜資訊

    // useEffect(() => {
    //     axios.get('http://localhost:3600/recipe/recipe').then((res) => {
    //         console.log(456456,res.data);
    //     });
    // }, []);

    const loginUser = JSON.parse(localStorage.getItem('auth'));

    function gotocreate() {
        // console.log(loginUser.customer_id);
        if (loginUser.customer_id === '' || null) {
            alert('請先登入帳號');
            return;
        } else {
            navigate('/recipe/createrecipe', { replace: false });
        }
    }

    // 按讚

    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const recipelike = (e) => {
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    };

    const likeChange = (sid) => {
        const packageToSend = {
            customer_id: loginUser.customer_id,
            recipes_sid: sid,
        };
        fetch('http://localhost:3600/recipe/recipelikes', {
            method: 'POST',
            body: JSON.stringify(packageToSend),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then((obj) => {
                setCount(count + 1);
                console.log(obj);
                // setTotalComment(obj);
            });
    };

    useEffect(() => {
        getRecipe1();
    }, [count]);

    // 收藏
    const [collection, setCollection] = useState(0);
    const [isCollected, setIsCollected] = useState(false);

    const collected = (e) => {
        if (isCollected) {
            setCollection(collection - 1);
        } else {
            setCollection(collection + 1);
        }
        setIsCollected(!isCollected);
    };

    const collectionchange = (sid) => {
        const packageToSend = {
            customer_id: loginUser.customer_id,
            recipes_sid: sid,
        };
        fetch('http://localhost:3600/recipe/recipecollection', {
            method: 'POST',
            body: JSON.stringify(packageToSend),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then((obj) => {
                setCount(count + 1);
                console.log(obj);
            });
    };

    return (
        <>
            <div className="menuincreate">
                <button className="rightsidebutton" onClick={gotocreate}>
                    <img src="/images/file-plus.svg" alt="" />
                </button>
            </div>

            <div className="hsiehsearching">
                <div id="inputText">
                    <p className="subtitlewordinsearch">搜尋食譜</p>
                    <input
                        type="text"
                        value={inputText}
                        className="searchinput"
                        onChange={(e) => {
                            setInputText(e.target.value);
                        }}
                    />
                    <p className="subtitlewordinsearch">
                        熱門關鍵字：日式、炸蝦、雞腿
                    </p>
                    <button
                        type="button"
                        className="btn btn-dark"
                        style={{ margin: 5 }}
                        onClick={() => {
                            const data = recipeDisplayAgain.filter((v, i) => {
                                return v.recipes_name.includes(inputText);
                            });
                            setRecipeDisplay(data);
                        }}
                    >
                        搜尋
                    </button>

                    {/* <button
                        type="button"
                        className="btn btn-dark"
                        style={{ margin: 5 }}
                        onClick={() => setButtonPop(true)}
                    >
                        進階搜尋
                    </button>
                    <Popup
                        className="popuptosearch"
                        trigger={ButtonPop}
                        setButtonPop={setButtonPop}
                    /> */}
                </div>
            </div>

            <div>
                <p className="titlewordinsearch">
                    <Title zh={'今日推薦食譜'} eg={'Recipes Recommend'} />
                </p>
            </div>
            <div className="recipeinfoinsearch">
                <div className="recommendlistinsearch">
                    <div className="recipephotoinsearch">
                        <Link to={`/recipe/each/18`}>
                            <img
                                src="/images/dishimages/b0fd632a003a439d13eef6fef4027a0a.jpg"
                                alt=""
                            />
                            {/* b0fd632a003a439d13eef6fef4027a0a */}
                        </Link>
                    </div>

                    <div className="recipeblockinsearch">
                        <Link
                            to={`/recipe/each/18`}
                            className="linkinrecipesearch"
                        >
                            <p>紙包檸檬鮭魚菲力</p>
                        </Link>

                        <div className="iconmanagementinsearch">
                            <button className="buttoninsearch">
                                <img
                                    src="/images/heart.svg"
                                    alt=""
                                    className="iconinsearch"
                                />
                            </button>
                            <p className="iconinsearchp">20</p>
                            <button className="buttoninsearch">
                                <img
                                    src="/images/good.svg"
                                    alt=""
                                    className="iconinsearch"
                                />
                            </button>
                            <p className="iconinsearchp">14</p>
                        </div>

                        <hr className="hrlineinsearch" />

                        <div className="iconmanagementinsearch">
                            <img
                                src="/images/clock.svg"
                                alt=""
                                className="iconinsearch"
                            />
                            <p className="iconinsearchp">約 20 分鐘</p>
                        </div>
                        <div className="iconmanagementinsearch">
                            <img
                                src="/images/heat.svg"
                                alt=""
                                className="iconinsearch"
                            />
                            <p className="iconinsearchp">約 600 大卡</p>
                        </div>
                    </div>
                </div>

                {/* 分隔線 */}

                <div className="recommendlistinsearch">
                    <div className="recipephotoinsearch">
                        <Link to={`/recipe/each/17`}>
                            <img
                                src="/images/dishimages/b161f75f968c10be8f35001b502d14c0.jpg"
                                alt=""
                            />
                        </Link>
                    </div>

                    <div className="recipeblockinsearch">
                        <Link
                            to={`/recipe/each/17`}
                            className="linkinrecipesearch"
                        >
                            <p>煎蛋湯</p>
                        </Link>

                        <div className="iconmanagementinsearch">
                            <button className="buttoninsearch">
                                <img
                                    src="/images/heart.svg"
                                    alt=""
                                    className="iconinsearch"
                                />
                            </button>
                            <p className="iconinsearchp">22</p>
                            <button className="buttoninsearch">
                                <img
                                    src="/images/good.svg"
                                    alt=""
                                    className="iconinsearch"
                                />
                            </button>
                            <p className="iconinsearchp">11</p>
                        </div>

                        <hr className="hrlineinsearch" />

                        <div className="iconmanagementinsearch">
                            <img
                                src="/images/clock.svg"
                                alt=""
                                className="iconinsearch"
                            />
                            <p className="iconinsearchp">約 10 分鐘</p>
                        </div>
                        <div className="iconmanagementinsearch">
                            <img
                                src="/images/heat.svg"
                                alt=""
                                className="iconinsearch"
                            />
                            <p className="iconinsearchp">約 500 大卡</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 分隔線，以下為食譜列表 */}

            <div>
                <p className="titlewordinsearch">
                    <Title zh={'食譜列表'} eg={'Recipes List'} />
                </p>
            </div>

            <div className="recipeinfoinsearch">
                {recipeDisplay.map((v, i) => {
                    return (
                        <div
                            className="recommendlistinsearch"
                            key={v.recipes_sid}
                        >
                            <div className="recipephotoinsearch">
                                <Link to={`/recipe/each/${v.recipes_sid}`}>
                                    <img
                                        src={`/dishimages/${v.recipes_img}`}
                                        alt=""
                                    />
                                </Link>
                            </div>

                            <div className="recipeblockinsearch">
                                <Link
                                    to={`/recipe/each/${v.recipes_sid}`}
                                    className="linkinrecipesearch"
                                >
                                    <p>{v.recipes_name}</p>
                                </Link>
                                <div className="iconmanagementinsearch">
                                    <button
                                        className="buttoninsearch"
                                        onClick={() => {
                                            collectionchange(v.recipes_sid);
                                            collected();
                                        }}
                                    >
                                        <img
                                            src="/images/heart.svg"
                                            alt=""
                                            className="iconinsearch"
                                        />
                                    </button>
                                    <p className="iconinsearchp">
                                        {v.recipes_collection}
                                    </p>
                                    <button
                                        name={v.recipes_sid}
                                        className="buttoninsearch"
                                        onClick={() => {
                                            likeChange(v.recipes_sid);
                                            recipelike();
                                        }}
                                    >
                                        <img
                                            src="/images/good.svg"
                                            alt=""
                                            className="iconinsearch"
                                        />
                                    </button>
                                    <p className="iconinsearchp">
                                        {v.recipes_like}
                                    </p>
                                </div>

                                <hr className="hrlineinsearch" />

                                <div className="iconmanagementinsearch">
                                    <img
                                        src="/images/clock.svg"
                                        alt=""
                                        className="iconinsearch"
                                    />
                                    <p className="iconinsearchp">
                                        約 {v.recipes_time_cost} 分鐘
                                    </p>
                                </div>
                                <div className="iconmanagementinsearch">
                                    <img
                                        src="/images/heat.svg"
                                        alt=""
                                        className="iconinsearch"
                                    />
                                    <p className="iconinsearchp">
                                        約 {v.recipes_calories} 大卡
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* 分隔線 */}

            <div className="paginationinsearch">
                {/* {data && data.totalPages ? ( */}
                {/* <Pagination page={data.page} totalPages={data.totalPages} /> */}
                {/* ) : null} */}
            </div>
        </>
    );
}

export default Recipesearch;

// function Recommend1 () {
//   const today = new Date();
//   const tgm = today.getMilliseconds();
//   const dataquantity = 總資料數量?
//   const firstdish = Math.round(tgm % (dataquantity / 2))
// }
// Recommend1 ();

// function Recommend2 () {
//   const today = new Date();
//   const tgm = today.getMilliseconds();
//   const dataquantity = 總資料數量?
//   const seconddish = Math.round((tgm % (dataquantity / 2)) +(dataquantity / 2) +1)
// }
// Recommend2 ();

// const runClock = () => {
//   const now = new Date();
//   sec_hand.style.transform = `rotate(${now.getSeconds() * 6 + now.getMilliseconds() * 0.006}deg)`;

//   min_hand.style.transform = `rotate(${now.getMinutes() * 6 + now.getSeconds() * 0.1}deg)`;

//   hour_hand.style.transform = `rotate(${now.getHours() * 30 + now.getMinutes() * 0.5}deg)`;

//   setTimeout(runClock, 50);
// };
// runClock();

// https://github.com/mfee-react/react-bs5-router6

// https://github.com/mfee-react/react-bs5-router6/blob/main/src/pages/StudentSelfPagination.js

// https://ithelp.ithome.com.tw/articles/10187146
