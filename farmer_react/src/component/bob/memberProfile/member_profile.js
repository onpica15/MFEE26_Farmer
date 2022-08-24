import './profile.css';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MemberNavbar from '../component/memberCenter_Navbar';
import axios from 'axios';
import { FaHeart } from "react-icons/fa";

function MemberProfile() {
    const hiddenFileInput = useRef('');
    const [image, setImage] = useState({ preview: '', data: '' });
    const [profileData, setProfileData] = useState([
        {
            username: '',
            intro: '',
            profile_img: '',
        },
    ]);
    const [editStatus, setEditStatus] = useState(true);
    const [postRecipe, setPostRecipe] = useState([]);
    const loginUser = JSON.parse(localStorage.getItem('auth'));
    const navigate = useNavigate()

    const getProfileData = async () => {
        const response = await axios.get(
            'http://localhost:3600/member/getintro',
            { headers: { loginUser: loginUser.customer_id } }
        );
        setProfileData(response.data);
    };

    const getRecipeData = async () => {
        const response = await axios.get(
            'http://localhost:3600/member/postrecipe',
            { headers: { loginUser: loginUser.customer_id } }
        );
        setPostRecipe(response.data);
    };

    useEffect(() => {
        getProfileData();
        getRecipeData();
    }, [editStatus]);

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

        fetch('http://localhost:3600/member/profile', {
            method: 'post',
            body: fd,
            headers: {
                customer_id: loginUser.customer_id,
            },
        })
            .then((r) => r.json())
            .then((obj) => console.log(obj));
    }

    const sendProfile = (event) => {
        event.preventDefault();
        const data = {
            nickname: document.form1.nickname.value,
            intro: document.form1.intro.value,
            customer_id: loginUser.customer_id,
        };

        fetch('http://localhost:3600/member/editintro', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then((obj) => {
                console.log(obj);});
        };

    return (
        <>
            <div className="container py-5">
                <div className="row">
                    <MemberNavbar />
                    <div className="col-9">
                        <div className="container justify-content-around align-items-center">
                            <h2 className="text-center fw-bold m-3">
                                個人檔案
                            </h2>
                            <div className="row justify-content-center">
                                <div
                                    className="card mb-3 text-white bg-dark shadow-sm"
                                    style={{ maxWidth: '540px' }}
                                >
                                    <div className="row g-0 p-2">
                                        <div className="col-1 position-absolute bop-camPosition">
                                            <form
                                                style={{ display: 'none' }}
                                                onSubmit={handleSubmit}
                                            >
                                                <input
                                                    id="inputData"
                                                    name="file"
                                                    type="file"
                                                    ref={hiddenFileInput}
                                                    accept="image/*"
                                                    onChange={handleOnChange}
                                                />
                                            </form>
                                            <button
                                                className="btn btn-sm btn-outline-light rounded-circle lh-1 p-0"
                                                onClick={handleClick}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="15"
                                                    height="15"
                                                    fill="currentColor"
                                                    className="bi bi-camera-fill m-1"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                                    <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="col-md-4 bop-w150 bop-h150 p-2 m-auto">
                                            <img
                                                className="img-fluid border border-white border-2 rounded-circle w-100 h-100 bop-objft"
                                                src={
                                                    image.preview
                                                        ? image.preview
                                                        : '/images/' +
                                                          profileData[0]
                                                              .profile_img
                                                }
                                                alt="123"
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body position-relative">
                                                <form
                                                    name="form1"
                                                    onSubmit={sendProfile}
                                                >
                                                    <input
                                                        type="hidden"
                                                        name="customer_id"
                                                        defaultValue={
                                                            loginUser.customer_id
                                                        }
                                                    />
                                                    {editStatus ? (
                                                        <>
                                                            <div className="mb-3">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    會員暱稱
                                                                </label>
                                                                <textarea
                                                                    type="text"
                                                                    name="nickname"
                                                                    className="form-control-plaintext text-white border-top"
                                                                    readOnly
                                                                    defaultValue={
                                                                        profileData[0]
                                                                            ? profileData[0]
                                                                                  .nickname
                                                                            : ''
                                                                    }
                                                                    rows="1"
                                                                ></textarea>
                                                            </div>
                                                            <div>
                                                                <label
                                                                    htmlFor="exampleFormControlTextarea1"
                                                                    className="form-label"
                                                                >
                                                                    會員簡介
                                                                </label>
                                                                <textarea
                                                                    className="form-control-plaintext text-white border-top"
                                                                    name="intro"
                                                                    rows="1"
                                                                    readOnly
                                                                    defaultValue={
                                                                        profileData[0]
                                                                            ? profileData[0]
                                                                                  .intro
                                                                            : ''
                                                                    }
                                                                ></textarea>
                                                            </div>
                                                            <button
                                                                className="btn btn-outline-light btn-sm position-absolute rounded lh-1 bop-editPosition"
                                                                onClick={(
                                                                    event
                                                                ) => {
                                                                    event.preventDefault();
                                                                    setEditStatus(
                                                                        false
                                                                    );
                                                                }}
                                                            >
                                                                編輯
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="mb-3">
                                                                <label
                                                                    htmlFor="exampleFormControlInput1"
                                                                    className="form-label"
                                                                >
                                                                    會員暱稱
                                                                </label>
                                                                <textarea
                                                                    type="text"
                                                                    name="nickname"
                                                                    className="form-control"
                                                                    rows="1"
                                                                ></textarea>
                                                            </div>
                                                            <div>
                                                                <label
                                                                    htmlFor="exampleFormControlTextarea1"
                                                                    className="form-label"
                                                                >
                                                                    會員簡介
                                                                </label>
                                                                <textarea
                                                                    className="form-control"
                                                                    name="intro"
                                                                    rows="1"
                                                                ></textarea>
                                                            </div>
                                                            <button
                                                                className="btn btn-outline-light btn-sm position-absolute rounded lh-1 bop-editPosition"
                                                                type="submit"
                                                                onClick={() => {
                                                                    setEditStatus(
                                                                        true
                                                                    );
                                                                }}
                                                            >
                                                                送出
                                                            </button>
                                                        </>
                                                    )}
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h2 className="text-center fw-bold my-5">我的食譜發表</h2>
                            <div className="container my-5">
                                <div className="row justify-content-center">
                                    {postRecipe[0] ? postRecipe.map((v,i)=>{
                                        return(
                                            <div
                                              className="card p-2 bdr m-1 shadow-sm"
                                              style={{ width: '16rem' }}
                                              val={v.customer_id}
                                              key={v.recipes_sid}
                                          >
                                              <img
                                                  src={'/images/dishimages/' + v.recipes_img}
                                                  className="card-img-top bop-objft"
                                                  width="200px"
                                                  height="175px"
                                                  alt="..."
                                              />
                                              <div className="card-body text-center">
                                                  <h5 className="card-title">
                                                      {v.recipes_name}
                                                  </h5>
                                                  <p
                                                      style={{
                                                          display: 'none',
                                                      }}
                                                  >
                                                      {v.recipes_type}
                                                  </p>
                                                  <p className="card-text bop-multiline-ellipsis">
                                                      {v.recipes_description}
                                                  </p>
                                                  <p className="card-text">
                                                    <FaHeart></FaHeart> {v.recipes_collection}人收藏
                                                  </p>
                                                  <button className="btn btn-sm bop-buttonColor text-white" onClick={()=>{navigate(`/recipe/each/${v.recipes_sid}`, {replace:true})}}>查看食譜</button>
                                              </div>
                                          </div>
                                        )
                                    }) : 
                                    <p className="text-muted text-center mt-5">您尚無發表過食譜</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MemberProfile;
