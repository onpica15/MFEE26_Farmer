import './orders.css';
import { useState, useEffect } from 'react';
import MemberNavbar from '../component/memberCenter_Navbar';
import { useNavigate } from 'react-router-dom';

function MemberOrders() {
    const [response, setResponse] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [filteredResult, setFilteredResult] = useState([]);
    const [filterCate, setFilterCate] = useState('');

    const dateCategory = ['三個月內', '半年內', '一年內'];

    const loginUser = JSON.parse(localStorage.getItem('auth'));
    const navigate = useNavigate();

    const getOrders = async () => {
        const r = await fetch('http://localhost:3600/member/orders', {
            headers: { loginUser: loginUser.customer_id },
        });
        const obj = await r.json();
        setResponse(obj);
        console.log(obj);
    };
    const totalOrders = async () => {
        const r = await fetch('http://localhost:3600/member/orderlist', {
            headers: { loginUser: loginUser.customer_id },
        });
        const obj = await r.json();
        setOrderList(obj);
        console.log(obj);
    };

    useEffect(() => {
        getOrders();
        totalOrders();
    }, []);

    function searchItems(searchValue) {
        setSearchInput(searchValue);
        if (searchValue !== '') {
            const filteredData = orderList.filter((item) => {
                return Object.values(item)
                    .join('')
                    .toLowerCase()
                    .includes(searchValue.toLowerCase());
            });
            setFilteredResult(filteredData);
        } else {
            setFilteredResult(orderList);
        }
    }

    function searchCategory(searchValue) {
        setFilterCate(searchValue);
        if (searchValue === '三個月內') {
            const filteredData = orderList.filter((item) => {
                return Date.parse(item.created_time) > (Date.now() - 1000*60*60*24*90);
            });
            setFilteredResult(filteredData);
        } else if (searchValue === '半年內') {
            const filteredData = orderList.filter((item) => {
                return Date.parse(item.created_time) > (Date.now() - 1000*60*60*24*180);
            });
            setFilteredResult(filteredData);
        } else if (searchValue === '一年內') {
            const filteredData = orderList.filter((item) => {
                return Date.parse(item.created_time) > (Date.now() - 1000*60*60*24*365);
            });
            setFilteredResult(filteredData);
        } else {
            setFilteredResult(orderList);
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
                                訂單查詢
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
                                        <option value="">請選擇期間</option>
                                        {dateCategory.map((v,i)=>{
                                            return(
                                                <option value={v} key={i}>{v}</option>
                                            )
                                        })}
                                    </select>
                                    <div className="border rounded col-sm-7 d-flex align-items-center">
                                        <input
                                            className="form-control me-2 border-0 shadow-none"
                                            id="text"
                                            type="search"
                                            name="search"
                                            placeholder="請搜尋訂單編號"
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
                        <div className="container row justify-content-center">
                            {orderList[0] ? searchInput.length >= 1 || filterCate.length >= 1
                                ? filteredResult.map((res) => (
                                      <div
                                          className="card p-4 col-10 shadow-sm mb-4"
                                          key={res.order_no}
                                      >
                                          <table className="table text-center caption-top mb-0">
                                              <caption>
                                                  <h5>
                                                      訂單日期：
                                                      {res.created_time}
                                                  </h5>
                                              </caption>
                                              <thead className="table-dark">
                                                  <tr>
                                                      <th scope="col">
                                                          商品圖片
                                                      </th>
                                                      <th scope="col">
                                                          商品/編號
                                                      </th>
                                                      <th scope="col">數量</th>
                                                      <th scope="col">
                                                          商品金額
                                                      </th>
                                                      <th scope="col">
                                                          訂單狀態
                                                      </th>
                                                      <th scope="col">
                                                          顧客回饋
                                                      </th>
                                                  </tr>
                                              </thead>
                                              <tbody>
                                                  {response
                                                      .filter((v) => {
                                                          return (
                                                              v.order_no ===
                                                              res.order_no
                                                          );
                                                      }).filter((v3)=>{
                                                        return (
                                                            v3.order_type === '1'
                                                        )
                                                      })
                                                      .map((v2, i2) => {
                                                          return (
                                                              <tr
                                                                  key={
                                                                      v2.product_id
                                                                  }
                                                              >
                                                                  <td className="align-middle">
                                                                      <div className="bg-light ratio ratio-1x1 rounded">
                                                                          <img
                                                                              className="card-img boo-objft"
                                                                              src={
                                                                                  '/images/' +
                                                                                  JSON.parse(
                                                                                      v2.product_img
                                                                                  )[0]
                                                                              }
                                                                              alt=""
                                                                          />
                                                                      </div>
                                                                  </td>
                                                                  <td className="align-middle">
                                                                      <p>
                                                                          {
                                                                              v2.product_name
                                                                          }
                                                                      </p>
                                                                      <p>
                                                                          商品編號-
                                                                          {
                                                                              v2.product_id
                                                                          }
                                                                      </p>
                                                                  </td>
                                                                  <td className="align-middle">
                                                                      <p>
                                                                          {
                                                                              v2.product_count
                                                                          }
                                                                      </p>
                                                                  </td>
                                                                  <td className="align-middle">
                                                                      <p>
                                                                          $
                                                                          {
                                                                              v2.product_price
                                                                          }
                                                                      </p>
                                                                  </td>
                                                                  <td className="align-middle">
                                                                      <p>
                                                                          {
                                                                              v2.order_status
                                                                          }
                                                                      </p>
                                                                  </td>
                                                                  <td className="align-middle">
                                                                    <button type="button" className="btn boo-buttonColor text-white btn-sm" onClick={()=>{
                                                                        localStorage.setItem('comment_product',`${v2.sid}`);
                                                                        navigate('/createcomment', {replace:true});
                                                                    }}>來去評價</button>
                                                                  </td>
                                                              </tr>
                                                          );
                                                      })}
                                                      {response
                                                      .filter((v) => {
                                                          return (
                                                              v.order_no ===
                                                              res.order_no
                                                          );
                                                      }).filter((v3)=>{
                                                        return(
                                                            v3.order_type === "2"
                                                        )
                                                      })
                                                      .map((v2, i2) => {
                                                          return (
                                                              <tr key={v2.sid}>
                                                                  <td className="align-middle">
                                                                      <div className="bg-light ratio ratio-1x1 rounded">
                                                                          <img
                                                                              className="card-img boo-objft"
                                                                              src={
                                                                                  v2.lunch_pic
                                                                              }
                                                                              alt=""
                                                                          />
                                                                      </div>
                                                                  </td>
                                                                  <td className="align-middle">
                                                                      <p>
                                                                          {
                                                                              v2.lunch_name
                                                                          }
                                                                      </p>
                                                                      <p>
                                                                          商品編號-
                                                                          {
                                                                              v2.sid
                                                                          }
                                                                      </p>
                                                                  </td>
                                                                  <td className="align-middle">
                                                                      <p>
                                                                          {
                                                                              v2.lunchbox_stock
                                                                          }
                                                                      </p>
                                                                  </td>
                                                                  <td className="align-middle">
                                                                      <p>
                                                                          $
                                                                          {
                                                                              v2.total_price
                                                                          }
                                                                      </p>
                                                                  </td>
                                                                  <td className="align-middle">
                                                                      <p>
                                                                          {
                                                                              v2.order_status
                                                                          }
                                                                      </p>
                                                                  </td>
                                                                  <td className="align-middle">
                                                                    <button type="button" className="btn boo-buttonColor text-white btn-sm" onClick={()=>{
                                                                        localStorage.setItem('comment_product',`${v2.sid}`);
                                                                        navigate('/createcomment', {replace:true});
                                                                    }}>來去評價</button>
                                                                  </td>
                                                              </tr>
                                                          );
                                                      })}
                                              </tbody>
                                              <tfoot>
                                                  <tr>
                                                      <td
                                                          colSpan="5"
                                                          className="text-end border-0"
                                                      >
                                                          <h5>訂單編號：</h5>
                                                      </td>
                                                      <td className="border-0">
                                                          <h5>
                                                              {res.order_no}
                                                          </h5>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td
                                                          colSpan="5"
                                                          className="text-end border-0 py-0"
                                                      >
                                                          <h5>訂單總金額：</h5>
                                                      </td>
                                                      <td className="border-0 py-0">
                                                          <h5>
                                                              ${' '}
                                                              {
                                                                  res.product_amount_total
                                                              }
                                                          </h5>
                                                      </td>
                                                  </tr>
                                              </tfoot>
                                          </table>
                                      </div>
                                  ))
                                : orderList.map((res) => (
                                      <div
                                          className="card p-4 col-10 shadow-sm mb-4"
                                          key={res.order_no}
                                      >
                                          <table className="table text-center caption-top mb-0">
                                              <caption>
                                                  <h5>
                                                      訂單日期：
                                                      {res.created_time}
                                                  </h5>
                                              </caption>
                                              <thead className="table-dark">
                                                  <tr>
                                                      <th scope="col">
                                                          商品圖片
                                                      </th>
                                                      <th scope="col">
                                                          商品/編號
                                                      </th>
                                                      <th scope="col">數量</th>
                                                      <th scope="col">
                                                          商品金額
                                                      </th>
                                                      <th scope="col">
                                                          訂單狀態
                                                      </th>
                                                      <th scope="col">
                                                          顧客回饋
                                                      </th>
                                                  </tr>
                                              </thead>
                                              <tbody>
                                                  {response
                                                      .filter((v) => {
                                                          return (
                                                              v.order_no ===
                                                              res.order_no
                                                          );
                                                      }).filter((v3) =>{
                                                        return(
                                                            v3.order_type === "1"
                                                        )
                                                      })
                                                      .map((v2, i2) => {
                                                          return (
                                                              <tr
                                                                  key={
                                                                      v2.product_id
                                                                  }
                                                              >
                                                                  <td className="align-middle">
                                                                      <div className="bg-light ratio ratio-1x1 rounded">
                                                                          <img
                                                                              className="card-img boo-objft"
                                                                              src={`/images/${JSON.parse(
                                                                                  v2.product_img
                                                                              )[0]}`}
                                                                              alt=""
                                                                          />
                                                                      </div>
                                                                  </td>
                                                                  <td className="align-middle">
                                                                      <p>
                                                                          {
                                                                              v2.product_name
                                                                          }
                                                                      </p>
                                                                      <p>
                                                                          商品編號-
                                                                          {
                                                                              v2.product_id
                                                                          }
                                                                      </p>
                                                                  </td>
                                                                  <td className="align-middle">
                                                                      <p>
                                                                          {
                                                                              v2.product_count
                                                                          }
                                                                      </p>
                                                                  </td>
                                                                  <td className="align-middle">
                                                                      <p>
                                                                          $
                                                                          {
                                                                              v2.product_price
                                                                          }
                                                                      </p>
                                                                  </td>
                                                                  <td className="align-middle">
                                                                      <p>
                                                                          {
                                                                              v2.order_status
                                                                          }
                                                                      </p>
                                                                  </td>
                                                                  <td className="align-middle">
                                                                    <button type="button" className="btn boo-buttonColor text-white btn-sm" onClick={()=>{
                                                                        localStorage.setItem('comment_product',`${v2.sid}`);
                                                                        navigate('/createcomment', {replace:true});
                                                                    }}>來去評價</button>
                                                                  </td>
                                                              </tr>
                                                          );
                                                      })}
                                                  {response
                                                      .filter((v) => {
                                                          return (
                                                              v.order_no ===
                                                              res.order_no
                                                          );
                                                      }).filter((v3)=>{
                                                        return(
                                                            v3.order_type === "2"
                                                        )
                                                      })
                                                      .map((v2, i2) => {
                                                          return (
                                                              <tr key={v2.sid}>
                                                                  <td className="align-middle">
                                                                      <div className="bg-light ratio ratio-1x1 rounded">
                                                                          <img
                                                                              className="card-img boo-objft"
                                                                              src={
                                                                                  v2.lunch_pic
                                                                              }
                                                                              alt=""
                                                                          />
                                                                      </div>
                                                                  </td>
                                                                  <td className="align-middle">
                                                                      <p>
                                                                          {
                                                                              v2.lunch_name
                                                                          }
                                                                      </p>
                                                                      <p>
                                                                          商品編號-
                                                                          {
                                                                              v2.sid
                                                                          }
                                                                      </p>
                                                                  </td>
                                                                  <td className="align-middle">
                                                                      <p>
                                                                          {
                                                                              v2.lunchbox_stock
                                                                          }
                                                                      </p>
                                                                  </td>
                                                                  <td className="align-middle">
                                                                      <p>
                                                                          $
                                                                          {
                                                                              v2.total_price
                                                                          }
                                                                      </p>
                                                                  </td>
                                                                  <td className="align-middle">
                                                                      <p>
                                                                          {
                                                                              v2.order_status
                                                                          }
                                                                      </p>
                                                                      
                                                                  </td>
                                                                  <td className="align-middle">
                                                                    <button type="button" className="btn boo-buttonColor text-white btn-sm" onClick={()=>{
                                                                        localStorage.setItem('comment_product',`${v2.sid}`);
                                                                        navigate('/createcomment', {replace:true});
                                                                    }}>來去評價</button>
                                                                  </td>
                                                              </tr>
                                                          );
                                                      })}
                                              </tbody>
                                              <tfoot>
                                                  <tr>
                                                      <td
                                                          colSpan="5"
                                                          className="text-end border-0"
                                                      >
                                                          <h5>訂單編號：</h5>
                                                      </td>
                                                      <td className="border-0">
                                                          <h5>
                                                              {res.order_no}
                                                          </h5>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td
                                                          colSpan="5"
                                                          className="text-end border-0 py-0"
                                                      >
                                                          <h5>訂單總金額：</h5>
                                                      </td>
                                                      <td className="border-0 py-0">
                                                          <h5>
                                                              ${' '}
                                                              {
                                                                  res.product_amount_total
                                                              }
                                                          </h5>
                                                      </td>
                                                  </tr>
                                              </tfoot>
                                          </table>
                                      </div>
                                  )) :
                                  <p className="text-muted text-center mt-5">尚無訂單資訊</p>
                                  }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MemberOrders;
