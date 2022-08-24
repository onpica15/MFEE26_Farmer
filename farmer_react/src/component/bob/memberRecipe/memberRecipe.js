import './recipe.css';
import { useState, useEffect } from 'react';
import MemberNavbar from '../component/memberCenter_Navbar';
import { useNavigate } from 'react-router-dom';
import { FaThumbsUp } from "react-icons/fa";


function MemberRecipe(){
    const [response, setResponse] = useState([]);
    const [searchInput, setSearchInput] = useState('')
    const [filteredResult, setFilteredResult] = useState([])
    const [filterCate, setFilterCate] = useState('')
    const [deleteStatus, setDeleteStatus] = useState(false)
    const navigate = useNavigate()

    const category = ['台灣料理', '日式料理', '美式料理', '韓式料理', '中式料理', '南洋料理'];

    const loginUser = JSON.parse(localStorage.getItem("auth"))

    const getCollections = async ()=>{
        const r = await fetch('http://localhost:3600/member/myrecipes',{ headers: {loginUser: loginUser.customer_id}})
        const obj = await r.json()
        setResponse(obj)
    }

    useEffect(()=>{
        getCollections()
        }, [deleteStatus])

    function searchItems (searchValue){
        setSearchInput(searchValue)
        if (searchValue !== '') {
            const filteredData = response.filter((item)=>{
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            })
            setFilteredResult(filteredData)
        } else {
            setFilteredResult(response)
        }
    }

    function searchCategory(searchValue){
        setFilterCate(searchValue)
        if (searchValue !== '') {
            const filteredData = response.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            });
            setFilteredResult(filteredData)
        } else {
            setFilteredResult(response)
        }
    }
    
    const deleteProduct = async (event)=>{
        setDeleteStatus(false);
        const r = await fetch('http://localhost:3600/member/deleterecipes',{
            method: 'DELETE',
            headers: {
                customer_id: loginUser.customer_id,
                recipes_sid: event.target.id,
            }
        });
        const obj = await r.json();
        console.log(obj);
        setDeleteStatus(true);
    }

    return (
        <>
        <div className="container py-5">
            <div className="row">
                <MemberNavbar/>
                    <div className="col-sm-9">
                        <div className="container">
                            <h2 className="text-center fw-bold">我的收藏清單</h2>
                            <div className="container">
                                <div className="btn-group bore-switchpx d-flex justify-content-center">
                                    <button className="btn btn-outline-dark text-center fw-bold my-4" onClick={()=>{navigate('/member/collections',{replace:true})}}>已收藏商品</button>
                                    <button className="btn btn-outline-dark text-center fw-bold my-4 active" onClick={()=>{navigate('/member/recipe',{replace:true})}}>已收藏食譜</button>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <form className="d-flex col-sm-7 mb-3">
                                    <select className="form-select mx-2 shadow-none" value={filterCate} onChange=
                                    {(e)=>{searchCategory(e.target.value)}}>
                                        <option value="">請選擇分類</option>
                                        {category.map((v,i)=>{
                                            return (
                                                <option value={v} key={i}>{v}</option>
                                            )
                                        })}
                                    </select>
                                    <div className="border rounded col-sm-7 d-flex align-items-center">
                                        <input className="form-control me-2 border-0 shadow-none" id="text" type="search" name="search" placeholder="請搜尋食譜名稱" aria-label="search" onChange={(e)=>{searchItems(e.target.value)}}/>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search col-sm-2" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                        </svg>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row justify-content-center">
                            {response[0] ? searchInput.length >= 1 || filterCate.length >=1 ? 
                            (filteredResult.map((res)=>
                                <div className="card p-2 bdr m-1 shadow-sm position-relative" val={res.member_id} style={{width: '16rem'}} key={res.product_id}>
                                    <div className="position-absolute top-0 end-0">
                                        <button id={res.recipes_sid} className="btn btn-sm btn-light rounded-circle bore-buttonPadding fs-6 bore-lineheight" onClick={deleteProduct}>×</button>
                                    </div>
                                    <img src={`/images/dishimages/${res.recipes_img}`} className="card-img-top bore-objft" width="200px" height="175px" alt="..."/>
                                    <div className="card-body text-center">
                                        <p style={{display:'none'}}>{res.recipes_type}</p>
                                        <h5 className="card-title bore-multiline-ellipsis-details">{res.recipes_name}</h5>
                                        <p className="card-text bore-multiline-ellipsis">{res.recipes_description}</p>
                                        <p className="card-text"><FaThumbsUp></FaThumbsUp> {res.recipes_like}位會員按讚</p>
                                        <button className="btn btn-sm bore-buttonColor text-white" onClick={()=>{navigate(`/recipe/each/${res.recipes_sid}`, {replace:true})}}>查看食譜</button>
                                    </div>
                                </div>
                            ))
                            : 
                            (response.map((res)=>
                                <div className="card p-2 bdr m-1 shadow-sm position-relative" style={{width: '16rem'}} val={res.customer_id} key={res.recipes_sid}>
                                    <div className="position-absolute top-0 end-0">
                                        <button id={res.recipes_sid} className="btn btn-sm btn-light rounded-circle bore-buttonPadding fs-6 bore-lineheight" onClick={deleteProduct}>×</button>
                                    </div>
                                    <img src={`/images/dishimages/${res.recipes_img}`} className="card-img-top bore-objft" width="200px" height="175px" alt="..."/>
                                    <div className="card-body text-center">
                                        <p style={{display:'none'}}>{res.recipes_type}</p>
                                        <h5 className="card-title bore-multiline-ellipsis-details">{res.recipes_name}</h5>
                                        <p className="card-text bore-multiline-ellipsis">{res.recipes_description}</p>
                                        <p className="card-text"><FaThumbsUp></FaThumbsUp> {res.recipes_like}位會員按讚</p>
                                        <button className="btn btn-sm bore-buttonColor text-white" onClick={()=>{navigate(`/recipe/each/${res.recipes_sid}`, {replace:true})}}>查看食譜</button>
                                    </div>
                                </div>
                            )) :
                            <p className="text-muted text-center mt-5">尚無已收藏的食譜</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default MemberRecipe;