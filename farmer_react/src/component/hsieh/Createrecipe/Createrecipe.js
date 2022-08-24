import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Createrecipe.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Title from './../../lil/Title/index';

function Createrecipe() {
    const loginUser = JSON.parse(localStorage.getItem('auth'));

    // 新增食譜名稱
    const [recipesname, setRecipesname] = useState('');

    // 料理簡介
    const [description, setDescription] = useState('');

    // 烹調時間
    const [timecost, setTimecost] = useState('');

    // 料理熱量
    const [calories, setCalories] = useState('');

    // 料理份量
    const [portion, setPortion] = useState('');
    const portionOptions = ['1', '2', '3', '4', '5'];

    // select，料理類型
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

    // 料理食材
    const [ingredient, setIngredient] = useState('');
    const [ingredient1, setIngredient1] = useState('');
    const [ingredient2, setIngredient2] = useState('');
    const [ingredient3, setIngredient3] = useState('');
    const [ingredient4, setIngredient4] = useState('');
    const [ingredient5, setIngredient5] = useState('');
    const [ingredient6, setIngredient6] = useState('');
    const [ingredient7, setIngredient7] = useState('');
    const [ingredient8, setIngredient8] = useState('');
    const [ingredient9, setIngredient9] = useState('');

    // 料理步驟
    const [step, setStep] = useState('');
    const [step1, setStep1] = useState('');
    const [step2, setStep2] = useState('');
    const [step3, setStep3] = useState('');
    const [step4, setStep4] = useState('');
    const [step5, setStep5] = useState('');
    const [step6, setStep6] = useState('');
    const [step7, setStep7] = useState('');
    const [step8, setStep8] = useState('');
    const [step9, setStep9] = useState('');

    // 料理照片
    const [recipe_img, setRecipe_img] = useState([]);

    const [recipesnamecorrect, setRecipesnameCorrect] = useState('');
    const [descriptioncorrect, setDescriptionCorrect] = useState('');
    const [timecostcorrect, setTimecostCorrect] = useState('');
    const [caloriescorrect, setCaloriesCorrect] = useState('');
    const [portioncorrect, setPortionCorrect] = useState('');
    const [recipestypecorrect, setRecipestypeCorrect] = useState('');
    const [recipesdegreecorrect, setRecipesdegreeCorrect] = useState('');
    const [ingredientcorrect, setIngredientCorrect] = useState('');
    const [stepcorrect, setStepCorrect] = useState('');

    const [previewimg, setPreviewimg] = useState('');

    const navigate = useNavigate();

    const sentAllInfo = async (event) => {
        event.preventDefault();

        const data = {
            recipesname: document.form1.recipesname.value,
            description: document.form1.description.value,
            timecost: document.form1.timecost.value,
            portion: document.form1.portion.value,
            calories: document.form1.calories.value,
            recipestype: document.form1.recipestype.value,
            recipesdegree: document.form1.recipesdegree.value,
            ingredient: document.form1.ingredient.value,
            ingredient1: document.form1.ingredient1.value,
            ingredient2: document.form1.ingredient2.value,
            ingredient3: document.form1.ingredient3.value,
            ingredient4: document.form1.ingredient4.value,
            ingredient5: document.form1.ingredient5.value,
            ingredient6: document.form1.ingredient6.value,
            ingredient7: document.form1.ingredient7.value,
            ingredient8: document.form1.ingredient8.value,
            ingredient9: document.form1.ingredient9.value,
            step: document.form1.step.value,
            step1: document.form1.step1.value,
            step2: document.form1.step2.value,
            step3: document.form1.step3.value,
            step4: document.form1.step4.value,
            step5: document.form1.step5.value,
            step6: document.form1.step6.value,
            step7: document.form1.step7.value,
            step8: document.form1.step8.value,
            step9: document.form1.step9.value,
            recipes_img: document.form1.recipes_img.value.substring(12),
            recipe_creater: loginUser.username,
            customer_id: loginUser.customer_id,
        };

        console.log(data);
        const r = await fetch('http://localhost:3600/recipe/createrecipe', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const obj = await r.json();
        console.log(obj);
        alreadycreate(obj);

        console.log(alreadycreate);
        setRecipe_img(obj);
    };

    function alreadycreate(obj) {
        if (obj.success) {
            alert('請填寫正確資料');
        } else {
            alert('新增成功');
            navigate('/recipe', { replace: true });
        }
    }

    const hiddenFileInput = useRef('');
    const [image, setImage] = useState({ preview: '', data: '' });
    const [profileData, setProfileData] = useState([
        {
            username: '',
            intro: '',
            recipe_img: '',
        },
    ]);

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    function handleOnChange(event) {
        const img = {
            preview: URL.createObjectURL(event.target.files[0]),
            data: event.target.files[0],
        };
        setImage(img);
        handleSubmit(img);
    }

    function handleSubmit(upimg) {
        const fd = new FormData();
        fd.append('file', upimg.data);

        fetch('http://localhost:3600/recipe/uploadimg', {
            method: 'post',
            body: fd,
            headers: {
                customer_id: loginUser.customer_id,
                recipe_creater: loginUser.username,
            },
        })
            .then((r) => r.json())
            .then((obj) => console.log(obj));
    }

    function qwert() {
        const a = previewimg.substring(12);
        return a;
    }

    function plusoneingredient() {
        var elem = document.querySelectorAll('div.ingredientincreate1');
        elem[0].className = 'ingredientincreate';
    }

    function minusoneingredient() {
        var elem = document.querySelectorAll('div.ingredientincreate');
        elem[elem.length - 1].className = 'ingredientincreate1';
    }

    function plusonestep() {
        var elem = document.querySelectorAll('div.stepincreate1');
        elem[0].className = 'stepincreate';
    }

    function minusonestep() {
        var elem = document.querySelectorAll('div.stepincreate');
        elem[elem.length - 1].className = 'stepincreate1';
    }

    // function cleaninput() {
    //     var elem = document.querySelectorAll('input.ingredientuse');
    //     elem[elem.length - 1].value = '';
    // }

    function autoInput() {
        document.form1.recipesname.value = '藜麥沙拉';
        document.form1.description.value =
            '炎炎夏日影響胃口？簡單的幾步料理方式，就能吃到營養健康又有飽足感的夏日減脂好滋味哦！';
        document.form1.timecost.value = '20';
        document.form1.calories.value = '300';
        document.form1.portion.value = '3';
        document.form1.recipestype.value = '歐式料理';
        document.form1.recipesdegree.value = '新手輕鬆入門';
        document.form1.ingredient.value = '藜麥  40～50克';
        document.form1.ingredient1.value = '花椰菜  適量';
        document.form1.ingredient2.value = '橄欖油  2勺';
        document.form1.ingredient3.value = '蜂蜜  1小勺';
        document.form1.ingredient4.value = '小番茄  10顆';
        document.form1.ingredient5.value = '白醋或黑醋或蘋果醋  1小勺';
        document.form1.ingredient6.value = '黑胡椒  少許';
        document.form1.step.value =
            '準備好食材，雞蛋水煮、花椰菜燙熟、小番茄切半';
        document.form1.step1.value =
            '藜麥加兩倍水，滾水煮開至出小芽加到食材裡面';
        document.form1.step2.value = '把調好的油醋汁倒入';
        document.form1.step3.value = '攪拌均勻即可';
        document.form1.step4.value =
            '藜麥+蔬菜+優質蛋白質，營養豐富又有飽足感！';
    }

    return (
        <>
            <div className="autoinputincreate">
                <button
                    className="autoinputincreatebutton"
                    type="button"
                    onClick={autoInput}
                >
                    填寫
                </button>
            </div>
            <form
                name="form1"
                value=""
                id=""
                noValidate
                method="post"
                onSubmit={sentAllInfo}
            >
                <div className="createrecipetitle">
                    <Title zh={'新增食譜'} eg={'Create New Recipes'} />
                </div>
                {/* <hr className="hrincreaterecipe" /> */}

                <div className="eachdataincreaterecipe">
                    <label className="datanameincreaterecipe">食譜名稱</label>
                    <section>
                        <input
                            name="recipesname"
                            id="recipesname"
                            type="text"
                            required
                            className="dataform1increate"
                            value={
                                recipesnamecorrect === ''
                                    ? recipesname
                                    : recipesnamecorrect
                            }
                            placeholder="請輸入食譜名稱"
                            onChange={(e) => {
                                setRecipesname(e.target.value);
                            }}
                            onFocus={() => setRecipesnameCorrect('')}
                        />
                        <div className="invalid-feedback"></div>
                    </section>
                </div>

                <hr className="hrincreaterecipe" />
                {/* 分隔線，以下料理簡介 */}

                <div className="eachdataincreaterecipe">
                    <label className="datanameincreaterecipe">料理簡介</label>
                    <div>
                        <section>
                            <textarea
                                name="description"
                                id="description"
                                required
                                className="dataform1ofdescribes"
                                value={description}
                                placeholder="請100字內簡述"
                                cols="30"
                                rows="5"
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                onFocus={() => setDescriptionCorrect('')}
                            />
                            <div className="invalid-feedback"></div>
                        </section>
                        {/* <label className="dataform1increate">
                            剩餘 {100 - description.length} 字
                        </label> */}
                    </div>
                </div>

                <hr className="hrincreaterecipe" />
                {/* 分隔線，以下料理花費時間 */}

                <div className="eachdataincreaterecipe">
                    <label className="datanameincreaterecipe">花費時間</label>
                    <label className="breakpointtitle1">約</label>
                    <section>
                        <input
                            name="timecost"
                            id="timecost"
                            className="dataform2increate"
                            type="text"
                            required
                            value={timecost}
                            onChange={(e) => {
                                setTimecost(e.target.value);
                            }}
                            onFocus={() => setTimecostCorrect('')}
                        />
                        <div className="invalid-feedback"></div>
                    </section>
                    <label className="breakpointtitle2">分鐘</label>
                </div>

                <hr className="hrincreaterecipe" />
                {/* 分隔線，以下料理熱量 */}

                <div className="eachdataincreaterecipe">
                    <label className="datanameincreaterecipe">料理熱量</label>
                    <label className="breakpointtitle1">約</label>
                    <section>
                        <input
                            name="calories"
                            id="calories"
                            className="dataform2increate"
                            type="text"
                            required
                            value={calories}
                            onChange={(e) => {
                                setCalories(e.target.value);
                            }}
                            onFocus={() => setCaloriesCorrect('')}
                        />
                        <div className="invalid-feedback"></div>
                    </section>
                    <label className="breakpointtitle2">大卡</label>
                </div>

                <hr className="hrincreaterecipe" />
                {/* 分隔線，以下料理份量 */}

                <div className="eachdataincreaterecipe">
                    <label className="datanameincreaterecipe">料理份量</label>
                    <label className="breakpointtitle1">約</label>
                    <section>
                        <select
                            name="portion"
                            id="portion"
                            className="dataform2increate"
                            value={portion}
                            required
                            onChange={(e) => {
                                setPortion(e.target.value);
                            }}
                            onFocus={() => setPortionCorrect('')}
                        >
                            <option value="">請選擇</option>
                            {portionOptions.map((v, i) => {
                                return (
                                    <option key={i} value={v}>
                                        {v}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="invalid-feedback"></div>
                    </section>
                    <label className="breakpointtitle2">人份</label>
                </div>

                <hr className="hrincreaterecipe" />
                {/* 分隔線，以下料理類型 */}

                <div className="eachdataincreaterecipe">
                    <label className="datanameincreaterecipe">料理類型</label>
                    <section>
                        <select
                            name="recipestype"
                            id="recipestype"
                            className="dataform1increate"
                            value={recipestype}
                            required
                            onChange={(e) => {
                                setRecipestype(e.target.value);
                            }}
                            onFocus={() => setRecipestypeCorrect('')}
                        >
                            <option value="">請選擇</option>
                            {recipestypeOptions.map((v, i) => {
                                return (
                                    <option key={i} value={v}>
                                        {v}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="invalid-feedback"></div>
                    </section>
                </div>

                <hr className="hrincreaterecipe" />
                {/* 分隔線，以下料理難易 */}

                <div className="eachdataincreaterecipe">
                    <label className="datanameincreaterecipe">料理難易</label>
                    <section id="recipesdegree">
                        <select
                            name="recipesdegree"
                            id="recipesdegree"
                            className="dataform1increate"
                            value={recipesdegree}
                            required
                            onChange={(e) => {
                                setRecipesdegree(e.target.value);
                            }}
                            onFocus={() => setRecipesdegreeCorrect('')}
                        >
                            <option value="">請選擇</option>
                            {recipesdegreeOptions.map((v, i) => {
                                return (
                                    <option key={i} value={v}>
                                        {v}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="invalid-feedback"></div>
                    </section>
                </div>

                <hr className="hrincreaterecipe" />
                {/* 分隔線，以下食材 */}

                <div className="eachdataincreaterecipe">
                    <label className="datanameincreaterecipe">使用食材</label>
                </div>

                <div className="eachdataincreaterecipe">
                    <div>
                        <div className="ingredientincreate">
                            <section>
                                <input
                                    name="ingredient[]"
                                    id="ingredient"
                                    type="text"
                                    className="ingredientuse"
                                    value={ingredient}
                                    required
                                    placeholder="食材與份量，如：雞蛋2顆"
                                    onChange={(e) => {
                                        setIngredient(e.target.value);
                                    }}
                                    onFocus={() => setIngredientCorrect('')}
                                />
                            </section>

                            <button
                                type="button"
                                className="buttonincreate"
                                // onClick={}
                            >
                                {/* <img
                                    src="/images/trashcan.svg"
                                    alt=""
                                    className="iconincreate"
                                /> */}
                            </button>
                        </div>
                        <div className="invalid-feedback"></div>

                        {/* 分隔線 */}

                        <div className="ingredientincreate1">
                            <section>
                                <input
                                    name="ingredient[]"
                                    id="ingredient1"
                                    type="text"
                                    className="ingredientuse"
                                    value={ingredient1}
                                    required
                                    placeholder="食材與份量，如：雞蛋2顆"
                                    onChange={(e) => {
                                        setIngredient1(e.target.value);
                                    }}
                                    onFocus={() => setIngredientCorrect('')}
                                />
                            </section>

                            <button
                                type="button"
                                className="buttonincreate"
                                // onClick={}
                            >
                                {/* <img
                                    src="/images/trashcan.svg"
                                    alt=""
                                    className="iconincreate"
                                /> */}
                            </button>
                        </div>
                        <div className="invalid-feedback"></div>

                        {/* 分隔線 */}

                        <div className="ingredientincreate1">
                            <section>
                                <input
                                    name="ingredient2"
                                    id="ingredient2"
                                    type="text"
                                    className="ingredientuse"
                                    value={ingredient2}
                                    required
                                    placeholder="食材與份量，如：雞蛋2顆"
                                    onChange={(e) => {
                                        setIngredient2(e.target.value);
                                    }}
                                    onFocus={() => setIngredientCorrect('')}
                                />
                            </section>

                            <button
                                type="button"
                                className="buttonincreate"
                                // onClick={}
                            >
                                {/* <img
                                    src="/images/trashcan.svg"
                                    alt=""
                                    className="iconincreate"
                                /> */}
                            </button>
                        </div>

                        {/* 分隔線 */}

                        <div className="ingredientincreate1">
                            <section>
                                <input
                                    name="ingredient3"
                                    id="ingredient3"
                                    type="text"
                                    className="ingredientuse"
                                    value={ingredient3}
                                    required
                                    placeholder="食材與份量，如：雞蛋2顆"
                                    onChange={(e) => {
                                        setIngredient3(e.target.value);
                                    }}
                                    onFocus={() => setIngredientCorrect('')}
                                />
                            </section>

                            <button
                                type="button"
                                className="buttonincreate"
                                // onClick={}
                            >
                                {/* <img
                                    src="/images/trashcan.svg"
                                    alt=""
                                    className="iconincreate"
                                /> */}
                            </button>
                        </div>

                        {/* 分隔線 */}

                        <div className="ingredientincreate1">
                            <section>
                                <input
                                    name="ingredient4"
                                    id="ingredient4"
                                    type="text"
                                    className="ingredientuse"
                                    value={ingredient4}
                                    required
                                    placeholder="食材與份量，如：雞蛋2顆"
                                    onChange={(e) => {
                                        setIngredient4(e.target.value);
                                    }}
                                    onFocus={() => setIngredientCorrect('')}
                                />
                            </section>

                            <button
                                type="button"
                                className="buttonincreate"
                                // onClick={}
                            >
                                {/* <img
                                    src="/images/trashcan.svg"
                                    alt=""
                                    className="iconincreate"
                                /> */}
                            </button>
                        </div>

                        {/* 分隔線 */}

                        <div className="ingredientincreate1">
                            <section>
                                <input
                                    name="ingredient5"
                                    id="ingredient5"
                                    type="text"
                                    className="ingredientuse"
                                    value={ingredient5}
                                    required
                                    placeholder="食材與份量，如：雞蛋2顆"
                                    onChange={(e) => {
                                        setIngredient5(e.target.value);
                                    }}
                                    onFocus={() => setIngredientCorrect('')}
                                />
                            </section>

                            <button
                                type="button"
                                className="buttonincreate"
                                // onClick={}
                            >
                                {/* <img
                                    src="/images/trashcan.svg"
                                    alt=""
                                    className="iconincreate"
                                /> */}
                            </button>
                        </div>

                        {/* 分隔線 */}

                        <div className="ingredientincreate1">
                            <section>
                                <input
                                    name="ingredient6"
                                    id="ingredient6"
                                    type="text"
                                    className="ingredientuse"
                                    value={ingredient6}
                                    required
                                    placeholder="食材與份量，如：雞蛋2顆"
                                    onChange={(e) => {
                                        setIngredient6(e.target.value);
                                    }}
                                    onFocus={() => setIngredientCorrect('')}
                                />
                            </section>

                            <button
                                type="button"
                                className="buttonincreate"
                                // onClick={}
                            >
                                {/* <img
                                    src="/images/trashcan.svg"
                                    alt=""
                                    className="iconincreate"
                                /> */}
                            </button>
                        </div>

                        {/* 分隔線 */}

                        <div className="ingredientincreate1">
                            <section>
                                <input
                                    name="ingredient7"
                                    id="ingredient7"
                                    type="text"
                                    className="ingredientuse"
                                    value={ingredient7}
                                    required
                                    placeholder="食材與份量，如：雞蛋2顆"
                                    onChange={(e) => {
                                        setIngredient7(e.target.value);
                                    }}
                                    onFocus={() => setIngredientCorrect('')}
                                />
                            </section>

                            <button
                                type="button"
                                className="buttonincreate"
                                // onClick={}
                            >
                                {/* <img
                                    src="/images/trashcan.svg"
                                    alt=""
                                    className="iconincreate"
                                /> */}
                            </button>
                        </div>

                        {/* 分隔線 */}

                        <div className="ingredientincreate1">
                            <section>
                                <input
                                    name="ingredient8"
                                    id="ingredient8"
                                    type="text"
                                    className="ingredientuse"
                                    value={ingredient8}
                                    required
                                    placeholder="食材與份量，如：雞蛋2顆"
                                    onChange={(e) => {
                                        setIngredient8(e.target.value);
                                    }}
                                    onFocus={() => setIngredientCorrect('')}
                                />
                            </section>

                            <button
                                type="button"
                                className="buttonincreate"
                                // onClick={}
                            >
                                {/* <img
                                    src="/images/trashcan.svg"
                                    alt=""
                                    className="iconincreate"
                                /> */}
                            </button>
                        </div>

                        {/* 分隔線 */}

                        <div className="ingredientincreate1">
                            <section>
                                <input
                                    name="ingredient9"
                                    id="ingredient9"
                                    type="text"
                                    className="ingredientuse"
                                    value={ingredient9}
                                    required
                                    placeholder="食材與份量，如：雞蛋2顆"
                                    onChange={(e) => {
                                        setIngredient9(e.target.value);
                                    }}
                                    onFocus={() => setIngredientCorrect('')}
                                />
                            </section>

                            <button
                                type="button"
                                className="buttonincreate"
                                // onClick={}
                            >
                                {/* <img
                                    src="/images/trashcan.svg"
                                    alt=""
                                    className="iconincreate"
                                /> */}
                            </button>
                        </div>

                        {/* 分隔線 */}

                        <div className="invalid-feedback"></div>
                    </div>
                </div>

                <div className="additemarea">
                    <button
                        type="button"
                        className="plusbuttonincreate"
                        onClick={plusoneingredient}
                    >
                        <img
                            src="/images/plus.svg"
                            alt=""
                            className="iconincreateplus"
                        />
                    </button>

                    <button
                        type="button"
                        className="buttonincreate"
                        onClick={minusoneingredient}
                    >
                        <img
                            src="/images/minus.svg"
                            alt=""
                            className="iconincreate"
                        />
                    </button>
                </div>

                <hr className="hrincreaterecipe" />
                {/* 分隔線，以下料理步驟 */}

                <div className="eachdataincreaterecipe">
                    <label className="datanameincreaterecipe">料理步驟</label>
                </div>

                <div className="eachdataincreaterecipe">
                    <div>
                        <div className="stepincreate">
                            <div className="redballincreate">1</div>
                            <section>
                                <textarea
                                    name="step[]"
                                    id="step"
                                    className="stepoftextareaincreate"
                                    value={step}
                                    required
                                    placeholder="步驟1"
                                    onChange={(e) => {
                                        setStep(e.target.value);
                                    }}
                                    onFocus={() => setStepCorrect('')}
                                />
                                <div className="invalid-feedback"></div>
                            </section>
                            <button
                                type="button"
                                className="buttonincreate"
                                // onClick={}
                            >
                                {/* <img
                                    src="/images/trashcan.svg"
                                    alt=""
                                    className="iconincreate"
                                /> */}
                            </button>
                        </div>

                        {/* 分隔線 */}

                        <div className="stepincreate1">
                            <div className="redballincreate">2</div>
                            <section>
                                <textarea
                                    name="step1"
                                    id="step1"
                                    className="stepoftextareaincreate"
                                    value={step1}
                                    required
                                    placeholder="步驟2"
                                    onChange={(e) => {
                                        setStep1(e.target.value);
                                    }}
                                    onFocus={() => setStepCorrect('')}
                                />
                                <div className="invalid-feedback"></div>
                            </section>
                            <button
                                type="button"
                                className="buttonincreate"
                                // onClick={}
                            >
                                {/* <img
                                    src="/images/trashcan.svg"
                                    alt=""
                                    className="iconincreate"
                                /> */}
                            </button>
                        </div>

                        {/* 分隔線 */}

                        <div className="stepincreate1">
                            <div className="redballincreate">3</div>
                            <section>
                                <textarea
                                    name="step2"
                                    id="step2"
                                    className="stepoftextareaincreate"
                                    value={step2}
                                    required
                                    placeholder="步驟3"
                                    onChange={(e) => {
                                        setStep2(e.target.value);
                                    }}
                                    onFocus={() => setStepCorrect('')}
                                />
                                <div className="invalid-feedback"></div>
                            </section>
                            <button
                                type="button"
                                className="buttonincreate"
                                // onClick={}
                            >
                                {/* <img
                                    src="/images/trashcan.svg"
                                    alt=""
                                    className="iconincreate"
                                /> */}
                            </button>
                        </div>

                        {/* 分隔線 */}

                        <div className="stepincreate1">
                            <div className="redballincreate">4</div>
                            <section>
                                <textarea
                                    name="step3"
                                    id="step3"
                                    className="stepoftextareaincreate"
                                    value={step3}
                                    required
                                    placeholder="步驟4"
                                    onChange={(e) => {
                                        setStep3(e.target.value);
                                    }}
                                    onFocus={() => setStepCorrect('')}
                                />
                                <div className="invalid-feedback"></div>
                            </section>
                            <button
                                type="button"
                                className="buttonincreate"
                                // onClick={}
                            >
                                {/* <img
                                    src="/images/trashcan.svg"
                                    alt=""
                                    className="iconincreate"
                                /> */}
                            </button>
                        </div>

                        {/* 分隔線 */}

                        <div className="stepincreate1">
                            <div className="redballincreate">5</div>
                            <section>
                                <textarea
                                    name="step4"
                                    id="step4"
                                    className="stepoftextareaincreate"
                                    value={step4}
                                    required
                                    placeholder="步驟5"
                                    onChange={(e) => {
                                        setStep4(e.target.value);
                                    }}
                                    onFocus={() => setStepCorrect('')}
                                />
                                <div className="invalid-feedback"></div>
                            </section>
                            <button
                                type="button"
                                className="buttonincreate"
                                // onClick={}
                            >
                                {/* <img
                                    src="/images/trashcan.svg"
                                    alt=""
                                    className="iconincreate"
                                /> */}
                            </button>
                        </div>

                        {/* 分隔線 */}

                        <div className="stepincreate1">
                            <div className="redballincreate">6</div>
                            <section>
                                <textarea
                                    name="step5"
                                    id="step5"
                                    className="stepoftextareaincreate"
                                    value={step5}
                                    required
                                    placeholder="步驟6"
                                    onChange={(e) => {
                                        setStep5(e.target.value);
                                    }}
                                    onFocus={() => setStepCorrect('')}
                                />
                                <div className="invalid-feedback"></div>
                            </section>
                            <button
                                type="button"
                                className="buttonincreate"
                                // onClick={}
                            >
                                {/* <img
                                    src="/images/trashcan.svg"
                                    alt=""
                                    className="iconincreate"
                                /> */}
                            </button>
                        </div>

                        {/* 分隔線 */}

                        <div className="stepincreate1">
                            <div className="redballincreate">7</div>
                            <section>
                                <textarea
                                    name="step6"
                                    id="step6"
                                    className="stepoftextareaincreate"
                                    value={step6}
                                    required
                                    placeholder="步驟7"
                                    onChange={(e) => {
                                        setStep6(e.target.value);
                                    }}
                                    onFocus={() => setStepCorrect('')}
                                />
                                <div className="invalid-feedback"></div>
                            </section>
                            <button
                                type="button"
                                className="buttonincreate"
                                // onClick={}
                            >
                                {/* <img
                                    src="/images/trashcan.svg"
                                    alt=""
                                    className="iconincreate"
                                /> */}
                            </button>
                        </div>

                        {/* 分隔線 */}

                        <div className="stepincreate1">
                            <div className="redballincreate">8</div>
                            <section>
                                <textarea
                                    name="step7"
                                    id="step7"
                                    className="stepoftextareaincreate"
                                    value={step7}
                                    required
                                    placeholder="步驟8"
                                    onChange={(e) => {
                                        setStep7(e.target.value);
                                    }}
                                    onFocus={() => setStepCorrect('')}
                                />
                                <div className="invalid-feedback"></div>
                            </section>
                            <button
                                type="button"
                                className="buttonincreate"
                                // onClick={}
                            >
                                {/* <img
                                    src="/images/trashcan.svg"
                                    alt=""
                                    className="iconincreate"
                                /> */}
                            </button>
                        </div>

                        {/* 分隔線 */}

                        <div className="stepincreate1">
                            <div className="redballincreate">9</div>
                            <section>
                                <textarea
                                    name="step8"
                                    id="step8"
                                    className="stepoftextareaincreate"
                                    value={step8}
                                    required
                                    placeholder="步驟9"
                                    onChange={(e) => {
                                        setStep8(e.target.value);
                                    }}
                                    onFocus={() => setStepCorrect('')}
                                />
                                <div className="invalid-feedback"></div>
                            </section>
                            <button
                                type="button"
                                className="buttonincreate"
                                // onClick={}
                            >
                                {/* <img
                                    src="/images/trashcan.svg"
                                    alt=""
                                    className="iconincreate"
                                /> */}
                            </button>
                        </div>

                        {/* 分隔線 */}

                        <div className="stepincreate1">
                            <div className="redballincreate">10</div>
                            <section>
                                <textarea
                                    name="step9"
                                    id="step9"
                                    className="stepoftextareaincreate"
                                    value={step9}
                                    required
                                    placeholder="步驟10"
                                    onChange={(e) => {
                                        setStep9(e.target.value);
                                    }}
                                    onFocus={() => setStepCorrect('')}
                                />
                                <div className="invalid-feedback"></div>
                            </section>
                            <button
                                type="button"
                                className="buttonincreate"
                                // onClick={}
                            >
                                {/* <img
                                    src="/images/trashcan.svg"
                                    alt=""
                                    className="iconincreate"
                                /> */}
                            </button>
                        </div>

                        {/* 分隔線 */}
                    </div>
                </div>

                <div className="additemarea">
                    <button
                        type="button"
                        className="plusbuttonincreate"
                        onClick={plusonestep}
                    >
                        <img
                            src="/images/plus.svg"
                            alt=""
                            className="iconincreateplus"
                        />
                    </button>

                    <button
                        type="button"
                        className="buttonincreate"
                        onClick={minusonestep}
                    >
                        <img
                            src="/images/minus.svg"
                            alt=""
                            className="iconincreate"
                        />
                    </button>
                </div>

                <hr className="hrincreaterecipe" />
                {/* 分隔線，以下照片 */}

                <div className="photoareaincreate">
                    {/* 上傳按鈕 */}

                    <div className="photouploadincreate">
                        <input
                            type="file"
                            name="recipes_img"
                            onChange={(e) => {
                                setPreviewimg(e.target.value);
                            }}
                        />

                        <img
                            className="showphotoincreate"
                            src={`/dishimages/${qwert()}`}
                            alt=""
                        />
                    </div>
                </div>
                {/* <div className="buttonintextalign">
                    <label>請選擇照片</label>
                </div> */}

                {/* <hr className="hrincreaterecipe" /> */}
                {/* 分隔線，以下完成按鈕 */}

                <div className="buttonintextalign">
                    <button className="finishincreate" type="submit">
                        新增食譜
                        <img
                            src="/images/file-plus.svg"
                            alt=""
                            className="crudincreate"
                        />
                    </button>
                </div>
            </form>
        </>
    );
}

export default Createrecipe;

// function CreateNewRecipe(){
//   var
// }

// onclick = "CreateNewRecipe()"";

// onSubmit={handleSubmit}
