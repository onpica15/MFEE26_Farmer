import './login_register.css'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function LoginRegister() {
    const navigate = useNavigate()

    const checkForm = async (event) => {
        event.preventDefault()
        const data = {
            farm_name: document.form1.farm_name.value,
            company_name: document.form1.company_name.value,
            company_id_number: document.form1.company_id_number.value,
            company_phone: document.form1.company_phone.value,
            company_email: document.form1.company_email.value,
            company_password: document.form1.company_password.value,
        }
        const email_re = new RegExp(
            '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
        )
        const password_re = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$')

        const farm_name_f = document.form1.farm_name
        const company_name_f = document.form1.company_name
        const company_id_number_f = document.form1.company_id_number
        const company_phone_f = document.form1.company_phone
        const company_email_f = document.form1.company_email
        const company_password_f = document.form1.company_password

        const fields = [
            farm_name_f,
            company_name_f,
            company_id_number_f,
            company_phone_f,
            company_email_f,
            company_password_f,
        ]
        const fieldTexts = []
        for (let f of fields) {
            fieldTexts.push(f.nextElementSibling)
        }

        for (let i in fields) {
            fields[i].classList.remove('is-invalid')
            fieldTexts[i].innerText = ''
        }

        let isPass = true

        if (farm_name_f.value.length < 1) {
            fields[0].classList.add('is-invalid')
            fieldTexts[0].innerText = '廠商名稱為必填'
            isPass = false
        }
        if (company_name_f.value.length < 1) {
            fields[1].classList.add('is-invalid')
            fieldTexts[1].innerText = '負責人名稱為必填'
            isPass = false
        }
        if (company_id_number_f.value.length < 10) {
            fields[2].classList.add('is-invalid')
            fieldTexts[2].innerText = '身分證字號必填'
            isPass = false
        }
        if (company_phone_f.value.length < 10) {
            fields[3].classList.add('is-invalid')
            fieldTexts[3].innerText = '手機號碼必填'
            isPass = false
        }
        if (company_email_f.value.length < 1) {
            fields[4].classList.add('is-invalid')
            fieldTexts[4].innerText = '帳號必填'
            isPass = false
        }
        if (company_password_f.value.length < 1) {
            fields[5].classList.add('is-invalid')
            fieldTexts[5].innerText = '密碼必填'
            isPass = false
        }

        if (!isPass) {
            return // 結束函式
        }
        const r = await fetch('http://localhost:3600/company/register', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const obj = await r.json()
        console.log(obj)
        Login(obj)

        function Login(obj) {
            if (obj.success) {
                Swal.fire({
                    icon: 'success',
                    title: '註冊成功',
                    showConfirmButton: true,
                    confirmButtonText: '確認',
                    confirmButtonColor: '#709D40',
                }).then(() => {
                    navigate('/company/login', { replace: true })
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: '註冊申請失敗',
                    showConfirmButton: true,
                    confirmButtonText: '請輸入正確資訊',
                    confirmButtonColor: '#709D40',
                })
            }
        }
    }

    function autoInput() {
        document.form1.farm_name.value = '舊山線休閒農業區'
        document.form1.company_name.value = '王小明'
        document.form1.company_id_number.value = 'F123456789'
        document.form1.company_phone.value = '0912123123'
        document.form1.company_email.value = 'test0824@test.com'
        document.form1.company_password.value = '123456'
    }

    return (
        <>
            <div className="mybody">
                <div
                    className="modal modal-signin position-static d-block  py-2  "
                    tabIndex="-1"
                    role="dialog"
                    id="modalSignin"
                >
                    <div
                        className="modal-dialog position-relative"
                        role="document"
                    >
                        <div className="modal-content shadow bg-light bg-opacity-50 ">
                            <div className="btn-group  ">
                                <button
                                    className="btn btn ytbtncolor2"
                                    type="button"
                                    onClick={() => {
                                        navigate('/company/login', {
                                            replace: true,
                                        })
                                    }}
                                >
                                    廠商登入
                                </button>
                                <button
                                    className="btn btn ytbtncolor1"
                                    type="button"
                                >
                                    廠商註冊
                                </button>
                            </div>

                            <div className="modal-header p-4 pb-4 border-bottom-0 position-relative">
                                <div className="modal-body p-5 pt-0">
                                    <form
                                        name="form1"
                                        method="post"
                                        onSubmit={checkForm}
                                        className="needs-validation"
                                        noValidate
                                    >
                                        <div className="mb-3">
                                            <label
                                                htmlFor="farm_name"
                                                className="form-label"
                                            >
                                                廠商名稱：
                                                <button
                                                    className="btn btn btn-sm pin-register position-absolute top-0 end-0"
                                                    type="button"
                                                    onClick={autoInput}
                                                >
                                                    快速填寫
                                                </button>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control bg-light bg-opacity-50"
                                                id="farm_name"
                                                name="farm_name"
                                                placeholder="請輸入廠商名稱"
                                            />
                                            <div className="invalid-feedback"></div>
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="company_name"
                                                className="form-label"
                                            >
                                                負責人：
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control bg-light bg-opacity-50"
                                                id="company_name"
                                                name="company_name"
                                                placeholder="請輸入負責人姓名"
                                            />
                                            <div className="invalid-feedback"></div>
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="company_id_number"
                                                className="form-label"
                                            >
                                                身分證字號：
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control bg-light bg-opacity-50"
                                                id="company_id_number"
                                                name="company_id_number"
                                                placeholder="請輸入負責人身分證字號"
                                            />
                                            <div className="invalid-feedback"></div>
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="company_phone"
                                                className="form-label"
                                            >
                                                手機號碼：
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control bg-light bg-opacity-50"
                                                id="company_phone"
                                                name="company_phone"
                                            />
                                            <div className="invalid-feedback"></div>
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="company_email"
                                                className="form-label"
                                            >
                                                Email address：
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control bg-light bg-opacity-50"
                                                id="company_email"
                                                name="company_email"
                                            />
                                            <div className="invalid-feedback"></div>
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="company_password"
                                                className="form-label "
                                            >
                                                Password：
                                            </label>
                                            <input
                                                type="password"
                                                className="form-control bg-light bg-opacity-50"
                                                id="company_password"
                                                name="company_password"
                                            />
                                            <div className="invalid-feedback"></div>
                                        </div>
                                        <div className="d-grid gap-2 pt-3">
                                            <button
                                                type="submit"
                                                className="btn btn-primary"
                                            >
                                                送出
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginRegister
