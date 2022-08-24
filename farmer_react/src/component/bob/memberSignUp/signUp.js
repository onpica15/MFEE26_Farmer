import './signUp.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function SignUp() {
    const navigate = useNavigate();

    const checkForm = async (event) => {
        event.preventDefault();
        const data = {
            username: document.form1.username.value,
            email: document.form1.email.value,
            password: document.form1.password.value,
            checkPassword: document.form1.checkPassword.value,
        };

        const email_re = new RegExp(
            '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
        );
        const password_re = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

        const name_f = document.form1.username;
        const email_f = document.form1.email;
        const password_f = document.form1.password;
        const checkPassword_f = document.form1.checkPassword;

        const fields = [name_f, email_f, password_f, checkPassword_f];
        const fieldTexts = [];
        for (let f of fields) {
            fieldTexts.push(f.nextElementSibling);
        }

        for (let i in fields) {
            fields[i].classList.remove('is-invalid');
            fieldTexts[i].innerText = '';
        }

        let isPass = true;

        if (name_f.value.length < 1) {
            fields[0].classList.add('is-invalid');
            fieldTexts[0].innerText = '姓名為必填資訊';
            isPass = false;
        }

        if (!email_re.test(data.email)) {
            fields[1].classList.add('is-invalid');
            fieldTexts[1].innerText = 'email格式錯誤';
            isPass = false;
        }

        if (!password_re.test(data.password)) {
            fields[2].classList.add('is-invalid');
            fieldTexts[2].innerText = '需至少包含1個英文與數字';
            isPass = false;
        }

        if (
            data.checkPassword.length < 1 ||
            data.password !== data.checkPassword
        ) {
            fields[3].classList.add('is-invalid');
            fieldTexts[3].innerText = '輸入的密碼不相符';
            isPass = false;
        }

        if (!isPass) {
            return; // 結束函式
        }

        const r = await fetch('http://localhost:3600/member/signup', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const obj = await r.json();
        console.log(obj);
        register(obj);
    };

    function register(obj) {
        if (obj.success) {
            Swal.fire({
                icon: 'success',
                title: '註冊申請成功',
                showConfirmButton: true,
                confirmButtonText: '進入驗證頁面',
                confirmButtonColor: '#82CA35',
            }).then(() => {
                navigate('/member/verify', { replace: true });
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: '註冊申請失敗',
                showConfirmButton: true,
                confirmButtonText: '請填寫正確資料',
                confirmButtonColor: '#82CA35',
            });
        }
    }

    function autoInput() {
        document.form1.username.value = 'farmer';
        document.form1.email.value = 'mfee26farmer@gmail.com';
        document.form1.password.value = 'a123456';
        document.form1.checkPassword.value = 'a123456';
    }

    return (
        <>
            <div className="bosu-bodyvh d-flex justify-content-center align-items-center bosu-bodybg">
                <div className="shadow mb-5 bg-body rounded rounded-3 bg-white">
                    <div className="bg-light p-3 rounded-top position-relative">
                        <h4 className="fw-semibold text-center m-0">
                            加入會員
                        </h4>
                        <button
                            className="btn btn-outline-light btn-small position-absolute top-0 end-0 shadow-none"
                            type="button"
                            onClick={autoInput}
                        >
                            填寫
                        </button>
                    </div>
                    <form
                        className="px-5 pb-4 pt-3 mx-2 needs-validation"
                        noValidate
                        name="form1"
                        method="post"
                        onSubmit={checkForm}
                    >
                        <label htmlFor="username" className="m-2">
                            姓名
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            className="form-control p-2 bg-light"
                            placeholder="請輸入您的姓名"
                        />
                        <div className="invalid-feedback"></div>
                        <label htmlFor="email" className="m-2">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="form-control p-2 bg-light"
                            placeholder="請輸入您的E-mail"
                        />
                        <div className="invalid-feedback"></div>
                        <label htmlFor="password" className="m-2">
                            密碼
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="form-control p-2 bg-light"
                            placeholder="請輸入您的密碼"
                        />
                        <div className="invalid-feedback"></div>
                        <label htmlFor="checkPassword" className="m-2">
                            確認密碼
                        </label>
                        <input
                            type="password"
                            id="checkPassword"
                            name="checkPassword"
                            required
                            className="form-control p-2 bg-light"
                            placeholder="再次確認密碼"
                        />
                        <div className="invalid-feedback"></div>
                        <div className="d-grid gap-2 my-4">
                            <button
                                className="border-0 shadow-sm rounded py-2 bosu-buttonColor btn-block text-white"
                                type="submit"
                            >
                                加入會員
                            </button>
                        </div>
                        <div className="d-grid gap-2 my-4">
                            <button
                                className="btn btn btn-dark btn-block"
                                type="button"
                                onClick={(event) => {
                                    event.preventDefault();
                                    navigate('/member', {
                                        replace: true,
                                    });
                                }}
                            >
                                返回登入頁面
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;
