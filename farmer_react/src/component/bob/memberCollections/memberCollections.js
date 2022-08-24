import './collections.css';
import { useState, useEffect } from 'react';
import MemberNavbar from '../component/memberCenter_Navbar';
import { useNavigate } from 'react-router-dom';

function MemberCollections() {
    const [response, setResponse] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredResult, setFilteredResult] = useState([]);
    const [filterCate, setFilterCate] = useState('');
    const [deleteStatus, setDeleteStatus] = useState(false);
    const navigate = useNavigate()

    const category = ['請選擇分類', '蔬菜', '水果', '肉品', '海鮮', '餐點', '客製化餐點'];

    const loginUser = JSON.parse(localStorage.getItem('auth'));

    const getCollections = async () => {
        const r = await fetch('http://localhost:3600/member/collections', {
            headers: { loginUser: loginUser.customer_id },
        });
        const obj = await r.json();
        setResponse(obj);
        console.log(obj)
    };

    useEffect(() => {
        getCollections();
    }, [deleteStatus]);

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
        if (searchValue > 0) {
            const filteredData = response.filter((item) => {
                return item.product_type == searchValue;
            });
            setFilteredResult(filteredData);
        } else {
            setFilteredResult(response);
        }
    }

    const deleteProduct = async (event) => {
        setDeleteStatus(false);
        const r = await fetch('http://localhost:3600/member/deleteproduct', {
            method: 'PUT',
            headers: {
                member_id: loginUser.customer_id,
                product_id: event.target.id,
            },
        });
        const obj = await r.json();
        console.log(obj);
        setDeleteStatus(true);
    };

    return (
        <>
            <div className="container py-5">
                <div className="row">
                    <MemberNavbar />
                    <div className="col-9">
                        <h2 className="text-center fw-bold">我的收藏清單</h2>
                        <div className="container">
                            <div className="btn-group boc-switchpx d-flex justify-content-center">
                                <button className="btn btn-outline-dark text-center fw-bold my-4 active" onClick={()=>{navigate('/member/collections',{replace:true})}}>已收藏商品</button>
                                <button className="btn btn-outline-dark text-center fw-bold my-4" onClick={()=>{navigate('/member/recipe', {replace:true})}}>已收藏食譜</button>
                            </div>
                            <div className="row justify-content-center">
                                <form className="d-flex col-sm-7 mb-3">
                                    <select
                                        className="form-select mx-2 shadow-none"
                                        value={filterCate}
                                        onChange={(e) => {
                                            searchCategory(e.target.value);
                                        }}
                                    >
                                        {category.map((v, i) => {
                                            return (
                                                <option value={i} key={i}>
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
                                            placeholder="請搜尋商品名稱"
                                            aria-label="search"
                                            onChange={(e) => {
                                                searchItems(e.target.value);
                                            }}
                                        />
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search col-sm-2" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                        </svg>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row justify-content-center">
                                {response[0] ? searchInput.length >= 1 ||
                                filterCate.length >= 1
                                    ? filteredResult.filter((v) => {
                                            return +v.saved === 1;
                                        }).map((res) => (
                                          <div
                                              className="card p-2 bdr m-1 shadow-sm"
                                              val={res.member_id}
                                              style={{ width: '16rem' }}
                                              key={res.product_id}
                                          >
                                              <div className="position-absolute top-0 end-0">
                                                  <button
                                                      id={res.product_id}
                                                      className="btn btn-sm btn-light rounded-circle fs-6 boc-buttonPadding boc-lineheight text-end"
                                                      onClick={deleteProduct}
                                                  >
                                                      ×
                                                  </button>
                                              </div>
                                              <img
                                                  src={'/images/' + JSON.parse(res.product_img)[0]}
                                                  className="card-img-top boc-objft"
                                                  width="200px"
                                                  height="175px"
                                                  alt="..."
                                              />
                                              <div className="card-body text-center">
                                                  <p
                                                      style={{
                                                          display: 'none',
                                                      }}
                                                  >
                                                      {res.product_type}
                                                  </p>
                                                  <h5 className="card-title boc-multiline-ellipsis-detail">
                                                      {res.product_name}
                                                  </h5>
                                                  <p className="card-text boc-multiline-ellipsis">
                                                      {res.product_details}
                                                  </p>
                                                  <p className="card-text">
                                                      $ {res.product_price}
                                                  </p>
                                                  <button className="btn btn-sm boc-buttonColor text-white" onClick={()=>{navigate(`/product/${res.product_id}`, {replace:true})}}>查看商品</button>
                                              </div>
                                          </div>
                                      ))
                                    : response.filter((v) => {
                                            return +v.saved === 1;
                                        }).map((res) => (
                                          <div
                                              className="card p-2 bdr m-1 shadow-sm"
                                              style={{ width: '16rem' }}
                                              val={res.member_id}
                                              key={res.product_id}
                                          >
                                              <div className="position-absolute top-0 end-0">
                                                  <button
                                                      id={res.product_id}
                                                      className="btn btn-sm btn-light rounded-circle fs-6 boc-buttonPadding boc-lineheight text-end"
                                                      onClick={deleteProduct}
                                                  >
                                                    ×
                                                  </button>
                                              </div>
                                              <img
                                                  src={'/images/' + JSON.parse(res.product_img)[0]}
                                                  className="card-img-top boc-objft"
                                                  width="200px"
                                                  height="175px"
                                                  alt="..."
                                              />
                                              <div className="card-body text-center">
                                                  <h5 className="card-title boc-multiline-ellipsis-detail">
                                                      {res.product_name}
                                                  </h5>
                                                  <p
                                                      style={{
                                                          display: 'none',
                                                      }}
                                                  >
                                                      {res.product_type}
                                                  </p>
                                                  <p className="card-text boc-multiline-ellipsis">
                                                      {res.product_details}
                                                  </p>
                                                  <p className="card-text">
                                                      $ {res.product_price}
                                                  </p>
                                                  <button className="btn btn-sm boc-buttonColor text-white" onClick={()=>{navigate(`/product/${res.product_id}`, {replace:true})}}>查看商品</button>
                                              </div>
                                          </div>
                                      )) : 
                                <p className="text-muted text-center mt-5">尚無已收藏的商品</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MemberCollections;
