import './memberVerify.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import AuthContext from '../component/authContext';
import Swal from 'sweetalert2';
import { FaCheckCircle } from 'react-icons/fa'
import { async } from 'emoji-mart';
import { OKShareButton } from 'react-share';

function MemberVerify() {
    const { setAuth } = useContext(AuthContext)
    const navigate = useNavigate();

    const checkForm = async (event) => {
        event.preventDefault();
        const data = {
            checkNumber: document.form1.checknumber.value,
        };

        const r = await fetch('http://localhost:3600/member/verify', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const obj = await r.json();
        console.log(obj);
        Login(obj);
    };

    function Login(obj) {
        if (obj.success) {
            localStorage.setItem('auth', JSON.stringify(obj.data));
            setAuth({ ...obj.data, authorized: true });
            Swal.fire({
                icon: 'success',
                title: '驗證成功',
                showConfirmButton: true,
                confirmButtonText: '歡迎加入',
                confirmButtonColor: "#82CA35"
            }).then(()=>{
                navigate('/member/data', { replace: true });
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: '驗證失敗',
                showConfirmButton: true,
                confirmButtonText: '請輸入正確驗證碼',
                confirmButtonColor: "#82CA35"
            }).then(()=>{
                navigate('/member/verify', { replace: true });
            })
        }
    }

    const verifyResend = async () => {
        const r = await fetch('http://localhost:3600/member/verifyresend', {
            method: 'put',
        });
        const obj = await r.json();
        console.log(obj);
        if (obj.send) {
            Swal.fire({
                icon: 'success',
                title: '已重新寄送驗證信',
                showConfirmButton: false,
                timer: 1500,
            })
        }
    }

    return (
        <>
            <div className="bover-bodyvh d-flex justify-content-center align-items-center bove-bodybg">
                <div className="col-sm-3 shadow mb-5 rounded rounded-3 bg-white mx-4">
                    <div className="d-flex justify-content-center my-3">
                        <FaCheckCircle className="bover-iconSize bover-svgColor"></FaCheckCircle>
                    </div>
                    <div className="p-3">
                        <h4 className="fw-bold text-center m-0">
                            您即將完成註冊
                        </h4>
                    </div>
                    <div className="col-9 m-auto p-3">
                        <h6 className="fw-semibold text-center m-0">
                            我們已寄送驗證碼至您的信箱，請於下方輸入驗證碼即可完成會員開通。
                        </h6>
                    </div>
                    <div className="d-grid gap-2 col-7 mx-auto my-3">
                        <form name="form1" onSubmit={checkForm}>
                            <input type="text" name="checknumber" className="form-control shadow-none border-dark text-center fw-bolder fs-4" />
                            <div className="d-grid gap-2 col-9 mx-auto mt-4">
                                <button className="border-0 shadow-sm rounded py-2 bover-buttonColor text-white" type="submit">驗證</button>
                            </div>
                        </form>
                        <div className="d-grid gap-2 col-9 mx-auto mt-4">
                            <button className="btn btn-secondary" type="button" onClick={(e)=>{
                                        e.preventDefault();
                                        verifyResend();
                                    }}>重新寄送驗證信</button>
                            <button className="btn btn-dark" type="button" onClick={(e)=>{
                                        e.preventDefault()
                                        navigate('/member', {replace: true})
                                        }}>返回登入頁面</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MemberVerify;
