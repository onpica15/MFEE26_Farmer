import { useState, useEffect } from 'react'
import axios from 'axios';
import MemberNavbar from '../component/memberCenter_Navbar';
import Swal from 'sweetalert2';
import './data.css'
import { useNavigate } from 'react-router-dom';

function MemberData(){
    const [memberData, setMemberData] = useState([{
        name: '',
        email: '',
        mobile: '',
        birthday: '',
        address: '',
        account: '',
        password:''
    }])

    const loginUser = JSON.parse(localStorage.getItem("auth"))
    const navigate = useNavigate()

    const getMemberData = async ()=>{
        const response = await axios.get('http://localhost:3600/member/data', { headers: {loginUser: loginUser.customer_id}})
        setMemberData(response.data)
    }

    useEffect(()=>{
        getMemberData()
    },[])

    const sendData = (event)=>{
        event.preventDefault();
        const data = {
            name: document.form1.name.value,
            email: document.form1.email.value,
            mobile: document.form1.mobile.value,
            birthday: document.form1.birthday.value,
            address: document.form1.address.value,
            account: document.form1.account.value,
            password: document.form1.password.value,
            customer_id: document.form1.customer_id.value
        };

        fetch('http://localhost:3600/member/data',{
            method:'put',
            body: JSON.stringify(data),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(r=>r.json())
        .then(obj=>{
            console.log(obj);
            if(obj.success){
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: '資料編輯成功',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    };

    return (
    <>
        <div className="container py-5">
            <div className="row">
                <MemberNavbar />
                <div className="col-sm-9">
                    <div className="row justify-content-center mx-0 mt-3">
                        <div className="col-sm-9">
                            <div className="bg-white">
                                <div className="card-body">
                                    <h2 className="card-title text-center fw-bold">會員基本資料</h2>
                                    <p className="card-text text-center py-2"><small className="text-muted">請輸入正確資訊，確保您能享受到最佳的服務體驗</small></p>
                                    <form className="px-4" name="form1" onSubmit={sendData} noValidate>
                                            <input type="hidden" name="customer_id" defaultValue={memberData[0].customer_id}/>
                                            <div className="mb-1 row border-bottom border-top py-3">
                                                <label htmlFor="name" className="form-label col-sm-2 my-auto">姓名</label>
                                                <div className="col-sm-8">
                                                    <input type="text" className="form-control" id="name" name="name" required defaultValue={memberData[0].name} />
                                                </div>
                                                <div className="form-text red"></div>
                                            </div>
                                            <div className="mb-1 row border-bottom py-3">
                                                <label htmlFor="email" className="form-label col-sm-2 my-auto">電郵</label>
                                                <div className="col-sm-8">
                                                    <input type="email" className="form-control" id="email" name="email" required defaultValue={memberData[0].email} />
                                                </div>
                                                <div className="form-text red"></div>
                                            </div>
                                            <div className="mb-1 row border-bottom py-3">
                                                <label htmlFor="mobile" className="form-label col-sm-2 my-auto">手機</label>
                                                <div className="col-sm-8">
                                                    <input type="text" className="form-control" id="mobile" name="mobile" pattern="09\d{8}" required defaultValue={memberData[0].mobile}/>
                                                </div>
                                            </div>
                                            <div className="mb-1 row border-bottom py-3">
                                                <label htmlFor="birthday" className="form-label col-sm-2 my-auto">生日</label>
                                                <div className="col-sm-8">
                                                    <input type="date" className="form-control" id="birthday" name="birthday" required defaultValue={memberData[0].birthday}/>
                                                </div>
                                                <div className="form-text"></div>
                                            </div>
                                            <div className="mb-1 row border-bottom py-3">
                                                <label htmlFor="address" className="form-label col-sm-2 my-auto">地址</label>
                                                <div className="col-sm-8">
                                                    <input type="text" className="form-control" id="address" name="address" required defaultValue={memberData[0].address}/>
                                                </div>
                                                <div className="form-text red"></div>
                                            </div>
                                            <div className="mb-1 row border-bottom py-3">
                                                <label htmlFor="account" className="form-label col-sm-2 my-auto">密碼</label>
                                                <div className="col-sm-8">
                                                    <input type="password" className="form-control" id="account" name="account" required defaultValue={memberData[0].password}/>
                                                </div>
                                                <div className="form-text red"></div>
                                            </div>
                                            <div className="mb-1 row border-bottom py-3">
                                                <label htmlFor="password" className="form-label col-sm-2 my-auto">確認密碼</label>
                                                <div className="col-sm-8">
                                                    <input type="password" className="form-control" id="password" name="password" required defaultValue={memberData[0].password}/>
                                                </div>
                                                <div className="form-text red"></div>
                                            </div>
                                            <div className="d-grid col-6 mx-auto my-3">
                                                <button type="submit" className="bod-buttonColor text-white border-0 rounded shadow-sm py-2">修改資料</button>
                                            </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
};

export default MemberData;