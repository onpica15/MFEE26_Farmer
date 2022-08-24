import React from 'react';
import { useState } from 'react';
import './Popup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default function Popup(props) {
    const [recipe, setRecipe] = useState([]);
    const [recipeDisplay, setRecipeDisplay] = useState([]);
    const [recipeDisplayAgain, setRecipeDisplayAgain] = useState([]);

    async function getRecipe() {
        const r = await fetch('http://localhost:3600/recipe/recipe');
        const obj = await r.json();
        setRecipe(obj);
        setRecipeDisplay(obj);
        setRecipeDisplayAgain(obj);
    }

    const [timecost, setTimecost] = useState('');
    const [calories, setCalories] = useState('');

    const [recipestype, setRecipestype] = useState('');
    const recipestypeOptions = [
        '台灣料理',
        '中華料理',
        '日式料理',
        '韓式料理',
        '南洋料理',
        '歐式料理',
        '美式料理',
        '其他',
    ];

    // select，料理難易度
    const [recipesdegree, setRecipesdegree] = useState('');
    const recipesdegreeOptions = [
        '新手輕鬆入門',
        '餐廳廚師料理',
        '米其林名廚作品',
    ];

    return props.trigger ? (
        <>
            <div className="searchinpopup">
                <div className="searchinpopup-inner">
                    <h2 className="recipetitleinpopup">
                        進階搜尋 ／ Search By Information
                    </h2>
                    <div>
                        <section id="recipesname" className="forminpopup">
                            <input
                                type="text"
                                className="time"
                                value={timecost}
                                placeholder="請輸入時間(單位：分鐘)"
                                onChange={(e) => {
                                    setTimecost(e.target.value);
                                }}
                            />
                        </section>

                        {/* 分隔線 */}

                        <section id="calories" className="forminpopup">
                            <input
                                type="text"
                                className="time"
                                value={calories}
                                placeholder="請輸入熱量(單位：大卡)"
                                onChange={(e) => {
                                    setCalories(e.target.value);
                                }}
                            />
                        </section>

                        {/* 分隔線 */}

                        <section id="select" className="forminpopup">
                            <select
                                className="time"
                                value={recipestype}
                                onChange={(e) => {
                                    setRecipestype(e.target.value);
                                }}
                            >
                                <option value="">請選擇料理類型</option>
                                {recipestypeOptions.map((v, i) => {
                                    return (
                                        <option key={i} value={v}>
                                            {v}
                                        </option>
                                    );
                                })}
                            </select>
                        </section>

                        {/* 分隔線 */}

                        <section id="select" className="forminpopup">
                            <select
                                className="time"
                                value={recipesdegree}
                                onChange={(e) => {
                                    setRecipesdegree(e.target.value);
                                }}
                            >
                                <option value="">請選擇料理難易度</option>
                                {recipesdegreeOptions.map((v, i) => {
                                    return (
                                        <option key={i} value={v}>
                                            {v}
                                        </option>
                                    );
                                })}
                            </select>
                        </section>
                    </div>

                    <div className="buttoninpopup">
                        <button
                            className="searchbuttoninpopup"
                            // onClick={() => {
                            //     const data = recipeDisplayAgain.filter((v, i) => {
                            //         return v.recipes_name.includes(inputText);
                            //     });
                            //     setRecipeDisplay(data);
                            // }}
                        >
                            搜尋
                            <img
                                src="/images/search.svg"
                                alt=""
                                className="iconineach"
                            />
                        </button>
                    </div>

                    <h2 className="recipetitleinpopup">
                        食材搜尋 ／ Search By Ingredient
                    </h2>
                    <div className="searchbyingredient">
                        <button
                            type="button"
                            classc="btn btn-dark"
                            className="ingredientinpopup"
                            onClick={() => {
                                const data = recipeDisplayAgain.filter(
                                    (v, i) => {
                                        return v.recipes_ingredient.includes(
                                            '菜'
                                        );
                                    }
                                );
                                setRecipeDisplay(data);
                            }}
                        >
                            <img src="/images/vegetable.png" alt="" />
                            蔬菜
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>

                        {/* onClick={() => {
                            const data = recipeDisplayAgain.filter((v, i) => {
                                return v.recipes_name.includes(inputText);
                            });
                            setRecipeDisplay(data);
                        }} */}

                        <button
                            type="button"
                            classc="btn btn-dark"
                            className="ingredientinpopup"
                            onClick={() => {
                                const data = recipeDisplayAgain.filter(
                                    (v, i) => {
                                        return v.recipes_ingredient.includes(
                                            '果' || '梨' || '茄'
                                        );
                                    }
                                );
                                setRecipeDisplay(data);
                            }}
                        >
                            <img src="/images/fruit.png" alt="" />
                            水果
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>

                        <button
                            type="button"
                            classc="btn btn-dark"
                            className="ingredientinpopup"
                            onClick={() => {
                                const data = recipeDisplayAgain.filter(
                                    (v, i) => {
                                        return v.recipes_ingredient.includes(
                                            '魚' || '蝦' || '貝' || '蟹'
                                        );
                                    }
                                );
                                setRecipeDisplay(data);
                            }}
                        >
                            <img src="/images/seafood.png" alt="" />
                            海鮮
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                        <button
                            type="button"
                            classc="btn btn-dark"
                            className="ingredientinpopup"
                            onClick={() => {
                                const data = recipeDisplayAgain.filter(
                                    (v, i) => {
                                        return v.recipes_ingredient.includes(
                                            '肉' ||
                                                '雞' ||
                                                '鴨' ||
                                                '牛' ||
                                                '豬' ||
                                                '羊'
                                        );
                                    }
                                );
                                setRecipeDisplay(data);
                            }}
                        >
                            <img src="/images/meat.png" alt="" />
                            肉類
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                        <button
                            type="button"
                            classc="btn btn-dark"
                            className="ingredientinpopup"
                            onClick={() => {
                                const data = recipeDisplayAgain.filter(
                                    (v, i) => {
                                        return v.recipes_ingredient.includes(
                                            '蛋'
                                        );
                                    }
                                );
                                setRecipeDisplay(data);
                            }}
                        >
                            <img src="/images/egg.png" alt="" />
                            蛋
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                        <button
                            type="button"
                            classc="btn btn-dark"
                            className="ingredientinpopup"
                            onClick={() => {
                                const data = recipeDisplayAgain.filter(
                                    (v, i) => {
                                        return v.recipes_ingredient.includes(
                                            '米' || '飯' || '麵'
                                        );
                                    }
                                );
                                setRecipeDisplay(data);
                            }}
                        >
                            <img src="/images/cereals.png" alt="" />
                            穀物
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>

                        <button
                            className="close-btn"
                            onClick={() => props.setButtonPop(false)}
                        >
                            關閉視窗 ×
                        </button>
                    </div>
                </div>
            </div>
        </>
    ) : (
        ''
    );
}
