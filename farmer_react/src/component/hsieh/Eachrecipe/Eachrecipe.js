import './Eachrecipe.css';
import './../Recipesearch/Rightsidemenu.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Eachrecipe() {
    const [eachrecipe, setEachrecipe] = useState({
        recipes_sid: '',
        recipes_name: '',
        recipes_time_cost: '',
        recipes_portion: '',
        recipes_calories: '',
        recipes_type: '',
        recipes_cooking_degree: '',
        recipes_ingredient: '',
        recipes_ingredient1: '',
        recipes_ingredient2: '',
        recipes_ingredient3: '',
        recipes_ingredient4: '',
        recipes_ingredient5: '',
        recipes_ingredient6: '',
        recipes_ingredient7: '',
        recipes_ingredient8: '',
        recipes_ingredient9: '',
        recipes_step: '',
        recipes_step1: '',
        recipes_step2: '',
        recipes_step3: '',
        recipes_step4: '',
        recipes_step5: '',
        recipes_step6: '',
        recipes_step7: '',
        recipes_step8: '',
        recipes_step9: '',
        recipes_description: '',
        recipes_img: '',
        recipe_creater: '',
        recipes_collection: '',
        recipes_like: '',
        created_at: '',
    });

    const loginUser = JSON.parse(localStorage.getItem('auth'));

    const navigate = useNavigate();

    async function eachrecipeinfo(recipes_sid) {
        const r = await fetch(
            `http://localhost:3600/recipe/each/${recipes_sid}`
        );
        const obj = await r.json();
        setEachrecipe(obj);
        console.log(eachrecipe);
    }

    const params = useParams();
    useEffect(() => {
        eachrecipeinfo(params.recipes_sid);
        window.scrollTo({ top: 0, behavior: 'instant' }); // 調整往下滑
    }, [params.recipes_sid]);
    // 獲取食譜個別資訊

    // useEffect(() => {

    // }, []);  useEffect基本架構

    const Deleterecipe = async (e) => {
        e.preventDefault();
        const data = {
            recipes_sid: params.recipes_sid,
        };

        if (eachrecipe.customer_id === loginUser.customer_id) {
            const r = await fetch('http://localhost:3600/recipe/delete', {
                method: 'DELETE',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const obj = await r.json();
            // console.log(obj);
            alreadydelete(obj);
            console.log(alreadydelete);
        } else {
            alert('您並非本食譜撰寫者，無權刪除食譜');
            window.href = 'http://localhost:3000/recipe';
            // navigate('/recipe', { replace: true });
            return;
        }
    };

    function alreadydelete(obj) {
        if (obj.success) {
            alert('');
        } else {
            alert('刪除成功');
            navigate('/recipe', { replace: true });
        }
    }

    function sendtoupdate() {
        if (eachrecipe.customer_id != loginUser.customer_id) {
            alert('您並非本食譜撰寫者，無權修改食譜');
            navigate(`/recipe/each/${params.recipes_sid}`, { replace: true });
        } else {
            navigate(`/recipe/updaterecipe/${params.recipes_sid}`, {
                replace: false,
            });
        }
    }

    function gotocreate() {
        // console.log(loginUser.customer_id);
        if (loginUser.customer_id != '' || null) {
            navigate('/recipe/createrecipe', { replace: false });
        } else {
            alert('請先登入帳號');
            return;
        }
    }

    return (
        <>
            <div className="menuincreate">
                <button className="rightsidebutton" onClick={gotocreate}>
                    <img src="/images/file-plus.svg" alt="" />
                </button>
            </div>
            <p className="eachrecipetitle">{eachrecipe.recipes_name}</p>

            <hr className="lineineach" align="center" />

            <div className="recipeinfo">
                <div className="pictureineachrecipe">
                    <img src={`/dishimages/${eachrecipe.recipes_img}`} alt="" />
                </div>
                <div className="recipedetailineach">
                    <div className="autherineach">
                        <p className="authernameineach">
                            作者：{eachrecipe.recipe_creater}
                        </p>

                        {/* <div className="likeandcollectineach">
                            <button className="buttonineach">
                                <img
                                    src="/images/heart.svg"
                                    alt=""
                                    className="iconineach"
                                />
                            </button>

                            <button className="buttonineach">
                                <img
                                    src="/images/good.svg"
                                    alt=""
                                    className="iconineach"
                                />
                            </button>
                        </div> */}
                    </div>

                    {/* 分隔線 */}

                    <div className="recipeinfomationineach">
                        <div className="recipedataineach">
                            <div className="greencircleineach">
                                <img src="/images/clock1.svg" alt="" />
                            </div>
                            <div>
                                <p>
                                    料理所需時間
                                    <br />約 {eachrecipe.recipes_time_cost} 分鐘
                                </p>
                            </div>
                        </div>

                        {/* 分隔線 */}

                        <div className="recipedataineach">
                            <div className="greencircleineach">
                                <img src="/images/heat1.svg" alt="" />
                            </div>
                            <div>
                                <p>
                                    熱量
                                    <br />約 {eachrecipe.recipes_calories} 大卡
                                </p>
                            </div>
                        </div>

                        {/* 分隔線 */}

                        <div className="recipedataineach">
                            <div className="greencircleineach">
                                <img src="/images/portion.svg" alt="" />
                            </div>
                            <div>
                                <p>
                                    份量
                                    <br />
                                    {eachrecipe.recipes_portion} 人份
                                </p>
                            </div>
                        </div>

                        {/* 分隔線 */}

                        <div className="recipedataineach">
                            <div className="greencircleineach">
                                <img src="/images/cooking.svg" alt="" />
                            </div>
                            <div>
                                <p>
                                    料理類型
                                    <br /> {eachrecipe.recipes_type}
                                </p>
                            </div>
                        </div>

                        {/* 分隔線 */}

                        <div className="recipedataineach">
                            <div className="greencircleineach">
                                <img src="/images/degree.svg" alt="" />
                            </div>
                            <div>
                                <p>
                                    料理難易度
                                    <br />
                                    {eachrecipe.recipes_cooking_degree}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 分隔線 */}

                    <div className="eachrecipedescription">
                        <p>{eachrecipe.recipes_description}</p>
                    </div>
                </div>
            </div>

            {/* 分隔線 */}

            <div className="grayineachrecipe">
                <div className="cookineachrecipe">
                    <div className="materialineach">
                        <div className="blackineachrecipe">使用食材</div>
                        <div className="showarea1ineach">
                            <p className="chapter1ineach">
                                {eachrecipe.recipes_ingredient}
                                {/* 食材1 */}
                            </p>
                            {/* 分隔線 */}
                            <div
                                className={
                                    eachrecipe.recipes_ingredient1.length === 0
                                        ? 'chapter1ineach1'
                                        : 'chapter1ineach'
                                }
                            >
                                <p>
                                    {eachrecipe.recipes_ingredient1}
                                    {/* 食材2 */}
                                </p>
                            </div>

                            {/* 分隔線 */}

                            <div
                                className={
                                    eachrecipe.recipes_ingredient2.length === 0
                                        ? 'chapter1ineach1'
                                        : 'chapter1ineach'
                                }
                            >
                                <p>
                                    {eachrecipe.recipes_ingredient2}
                                    {/* 食材3 */}
                                </p>
                            </div>

                            {/* 分隔線 */}
                            <div
                                className={
                                    eachrecipe.recipes_ingredient3.length === 0
                                        ? 'chapter1ineach1'
                                        : 'chapter1ineach'
                                }
                            >
                                <p>
                                    {eachrecipe.recipes_ingredient3}
                                    {/* 食材4 */}
                                </p>
                            </div>

                            {/* 分隔線 */}

                            <div
                                className={
                                    eachrecipe.recipes_ingredient4.length === 0
                                        ? 'chapter1ineach1'
                                        : 'chapter1ineach'
                                }
                            >
                                <p>
                                    {eachrecipe.recipes_ingredient4}
                                    {/* 食材5 */}
                                </p>
                            </div>

                            {/* 分隔線 */}

                            <div
                                className={
                                    eachrecipe.recipes_ingredient5.length === 0
                                        ? 'chapter1ineach1'
                                        : 'chapter1ineach'
                                }
                            >
                                <p>
                                    {eachrecipe.recipes_ingredient5}
                                    {/* 食材6 */}
                                </p>
                            </div>

                            {/* 分隔線 */}

                            <div
                                className={
                                    eachrecipe.recipes_ingredient6.length === 0
                                        ? 'chapter1ineach1'
                                        : 'chapter1ineach'
                                }
                            >
                                <p>
                                    {eachrecipe.recipes_ingredient6}
                                    {/* 食材7 */}
                                </p>
                            </div>

                            {/* 分隔線 */}

                            <div
                                className={
                                    eachrecipe.recipes_ingredient7.length === 0
                                        ? 'chapter1ineach1'
                                        : 'chapter1ineach'
                                }
                            >
                                <p>
                                    {eachrecipe.recipes_ingredient7}
                                    {/* 食材8 */}
                                </p>
                            </div>

                            {/* 分隔線 */}

                            <div
                                className={
                                    eachrecipe.recipes_ingredient8.length === 0
                                        ? 'chapter1ineach1'
                                        : 'chapter1ineach'
                                }
                            >
                                <p>
                                    {eachrecipe.recipes_ingredient8}
                                    {/* 食材9 */}
                                </p>
                            </div>

                            {/* 分隔線 */}

                            {/* <div
                                className={
                                    eachrecipe.recipes_ingredient9.length === 0
                                        ? 'chapter1ineach1'
                                        : 'chapter1ineach'
                                }
                            > */}
                            <div className="chapter1ineach1">
                                <p>
                                    {eachrecipe.recipes_ingredient9}
                                    {/* 食材10 */}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 分隔線 */}

                    <div className="cookingineach">
                        <div className="greenineachrecipe">料理方式</div>
                        <div className="showarea2ineach">
                            {/* 步驟呈現的區域 */}
                            <div className="numberineachrecipe">1</div>
                            <div className="chapter2ineach">
                                {eachrecipe.recipes_step}
                                {/* 步驟1 */}
                            </div>
                        </div>

                        {/* 分隔線 */}

                        <div
                            className={
                                eachrecipe.recipes_step1.length === 0
                                    ? 'showarea2ineach1'
                                    : 'showarea2ineach'
                            }
                        >
                            <div className="numberineachrecipe">2</div>
                            <div className="chapter2ineach">
                                {eachrecipe.recipes_step1}
                                {/* 步驟2 */}
                            </div>
                        </div>

                        {/* 分隔線 */}

                        <div
                            className={
                                eachrecipe.recipes_step2.length === 0
                                    ? 'showarea2ineach1'
                                    : 'showarea2ineach'
                            }
                        >
                            <div className="numberineachrecipe">3</div>
                            <div className="chapter2ineach">
                                {eachrecipe.recipes_step2}
                                {/* 步驟3 */}
                            </div>
                        </div>

                        {/* 分隔線 */}

                        <div
                            className={
                                eachrecipe.recipes_step3.length === 0
                                    ? 'showarea2ineach1'
                                    : 'showarea2ineach'
                            }
                        >
                            <div className="numberineachrecipe">4</div>
                            <div className="chapter2ineach">
                                {eachrecipe.recipes_step3}
                                {/* 步驟4 */}
                            </div>
                        </div>

                        {/* 分隔線 */}

                        <div
                            className={
                                eachrecipe.recipes_step4.length === 0
                                    ? 'showarea2ineach1'
                                    : 'showarea2ineach'
                            }
                        >
                            <div className="numberineachrecipe">5</div>
                            <div className="chapter2ineach">
                                {eachrecipe.recipes_step4}
                                {/* 步驟5 */}
                            </div>
                        </div>

                        {/* 分隔線 */}

                        <div
                            className={
                                eachrecipe.recipes_step5.length === 0
                                    ? 'showarea2ineach1'
                                    : 'showarea2ineach'
                            }
                        >
                            <div className="numberineachrecipe">6</div>
                            <div className="chapter2ineach">
                                {eachrecipe.recipes_step5}
                                {/* 步驟6 */}
                            </div>
                        </div>

                        {/* 分隔線 */}

                        <div
                            className={
                                eachrecipe.recipes_step6.length === 0
                                    ? 'showarea2ineach1'
                                    : 'showarea2ineach'
                            }
                        >
                            <div className="numberineachrecipe">7</div>
                            <div className="chapter2ineach">
                                {eachrecipe.recipes_step6}
                                {/* 步驟7 */}
                            </div>
                        </div>

                        <div
                            className={
                                eachrecipe.recipes_step7.length === 0
                                    ? 'showarea2ineach1'
                                    : 'showarea2ineach'
                            }
                        >
                            <div className="numberineachrecipe">8</div>
                            <div className="chapter2ineach">
                                {eachrecipe.recipes_step7}
                                {/* 步驟8 */}
                            </div>
                        </div>

                        <div
                            className={
                                eachrecipe.recipes_step8.length === 0
                                    ? 'showarea2ineach1'
                                    : 'showarea2ineach'
                            }
                        >
                            <div className="numberineachrecipe">9</div>
                            <div className="chapter2ineach">
                                {eachrecipe.recipes_step8}
                                {/* 步驟9 */}
                            </div>
                        </div>

                        <div
                            className={
                                eachrecipe.recipes_step9.length === 0
                                    ? 'showarea2ineach1'
                                    : 'showarea2ineach'
                            }
                        >
                            <div className="numberineachrecipe">10</div>
                            <div className="chapter2ineach">
                                {eachrecipe.recipes_step9}
                                {/* 步驟10 */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="buttonlistineach">
                <Link to={`/recipe`}>
                    <button className="recipelistbutton">
                        食譜列表
                        <img
                            src="/images/files.svg"
                            alt=""
                            className="crudineach"
                        />
                    </button>
                </Link>

                <button className="hsiehcreate" onClick={sendtoupdate}>
                    修改食譜
                    <img src="/images/pen.svg" alt="" className="crudineach" />
                </button>

                <Link to={`http://localhost:3600/recipe/delete`}>
                    <button
                        className="hsiehdelete"
                        onClick={(e) => Deleterecipe(e)}
                    >
                        刪除食譜
                        <img
                            src="/images/trashcan.svg"
                            alt=""
                            className="crudineach"
                        />
                    </button>
                </Link>
            </div>
        </>
    );
}

export default Eachrecipe;
