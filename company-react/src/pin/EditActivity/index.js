import styles from './AddProduct.module.css'
import clsx from 'clsx'
import React, { useRef, useEffect, useState } from 'react'
import Modal from 'react-modal'
import FileUploadSample from '../../component/FileUploadSample'
import { uploadImages } from '../../api/root'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

Modal.setAppElement('#root')
function Editactivity({ sid, onClose, onUpdate, isNew }) {
    const company_activity_id = sessionStorage.getItem('activitysid')
        ? sessionStorage.getItem('activitysid')
        : null
    const company_info_id = localStorage.getItem('comAuth')
        ? JSON.parse(localStorage.getItem('comAuth')).company_id
        : null
    const inputRef = useRef()
    const navigate = useNavigate()
    const [value, setValue] = useState({
        card_area: '',
        address: '',
        phone: '',
        fax: '',
        time: '星期一 08:00 ~ 17:00 / 星期二 08:00 ~ 17:00 / 星期三 08:00 ~ 17:00 / 星期四 08:00 ~ 17:00 / 星期五 08:00 ~ 17:00 / 星期六 08:00 ~ 17:00 / 星期日 08:00 ~ 17:00 ',
        card_info: '',
        card_info1: '',
        card_a: '',
        card_b: '',
        card_c: '',
        card_d: '',
        card_e: '',
        Map_a: '',
        Map_b: '',
        company_infoImg: [],
        card_img: [],
    })
    const [singleImages, setSingleImages] = useState([])
    const [images, setImages] = useState([])
    const [startDate, setStartDate] = useState(null)

    const [addHashTag, setAddHashTag] = useState({})

    const handleChange = (key, newValue) => {
        setValue((prev) => {
            return { ...prev, [key]: newValue }
        })
    }
    const goBack = () => {
        navigate(`/company/activity`)
    }
    const handleToggleHashTag = (key) => {
        const value = addHashTag[key]
        setAddHashTag((prev) => {
            return { ...prev, [key]: !value }
        })

        console.log('handleToggleHashTag', addHashTag)
    }

    const handleSubmit = async () => {
        try {
            let pictures = value.photo

            if (!images.length && !pictures.length) {
                console.log('no images')
                return
            }

            if (!Object.keys(addHashTag)) {
                console.log('no hashTag')
                return
            }

            if (images.length) {
                const result = await uploadImages(images)

                pictures = result.data.map((v) => v.name)
            }
            const newValue = {
                ...value,
            }
            const data = { ...newValue, photo: pictures }
        } catch (e) {
            console.error(e)
        }
    }

    const getPicNewArray = () => {
        const newPicArray = images.map((v) => {
            return v.name
        })
        return JSON.stringify(newPicArray)
    }
    const getSinglePicNewArray = () => {
        const newPicArray = singleImages.map((v) => {
            return v.name
        })
        return JSON.stringify(newPicArray)
    }

    const getData = () => {
        console.log(company_activity_id)
        fetch('http://localhost:3600/activity/activitydata', {
            method: 'GET',
            headers: { sid: company_activity_id },
        })
            .then((r) => r.json())
            .then((obj) => {
                const newPicArray = JSON.parse(obj[0].company_infoImg)
                const newSinglePicArray = JSON.parse(obj[0].card_img)
                const newOBJ = {
                    ...obj[0],
                    company_infoImg: newPicArray,
                    card_img: newSinglePicArray,
                }
                // console.log(newOBJ)
                setValue(newOBJ)
            })
    }

    useEffect(() => {
        getData()
    }, [])

    const inesertNewInfo = () => {
        const packageToSend = {
            card_area: value.card_area,
            company_id: company_info_id,
            card_img: getSinglePicNewArray(),
            company_infoImg: getPicNewArray(),
            address: value.address,
            phone: value.phone,
            fax: value.fax,
            card_city: value.phone,
            card_info: value.card_info,
            card_info1: value.card_info1,
            card_a: value.card_a,
            card_b: value.card_b,
            card_c: value.card_c,
            card_d: value.card_d,
            card_e: value.card_e,
            Map_a: value.Map_a,
            Map_b: value.Map_b,
            company_activity_id: company_activity_id,
        }

        fetch('http://localhost:3600/activity/edit', {
            method: 'PUT',
            body: JSON.stringify(packageToSend),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then((obj) => {
                console.log(obj)
                Swal.fire({
                    icon: 'success',
                    title: '修改成功',
                    showConfirmButton: true,
                    confirmButtonText: '確認',
                    confirmButtonColor: '#709D40',
                }).then(() => {
                    navigate('/company/activity', { replace: true })
                })
                // sessionStorage.removeItem('activitysid')
            })
    }

    return (
        <>
            <div className={styles.body}>
                <div className={clsx('container', styles.content)}>
                    <div className={styles.empty}></div>
                    <div className={styles.container}>
                        <form className={styles.form} name="form">
                            <div className="row">
                                <div className="col-6">
                                    <label className={styles.label}>
                                        活動名稱：
                                    </label>
                                    <div className={styles.text}>
                                        <input
                                            name="name"
                                            type="text"
                                            ref={inputRef}
                                            style={{ width: '100%' }}
                                            placeholder="請輸入活動名稱"
                                            value={value.card_area}
                                            onChange={(e) =>
                                                setValue({
                                                    ...value,
                                                    card_area: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label className={styles.label}>
                                        活動地址：
                                    </label>
                                    <div className={styles.text}>
                                        <input
                                            name="name"
                                            type="text"
                                            ref={inputRef}
                                            style={{ width: '100%' }}
                                            placeholder="請輸入活動地址"
                                            value={value.address}
                                            onChange={(e) =>
                                                setValue({
                                                    ...value,
                                                    address: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label className={styles.label}>
                                        連絡電話：
                                    </label>
                                    <div className={styles.text}>
                                        <input
                                            name="name"
                                            type="text"
                                            ref={inputRef}
                                            style={{ width: '100%' }}
                                            placeholder="請輸入連絡電話"
                                            value={value.phone}
                                            onChange={(e) =>
                                                setValue({
                                                    ...value,
                                                    phone: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label className={styles.label}>
                                        農場傳真：
                                    </label>
                                    <div className={styles.text}>
                                        <input
                                            name="name"
                                            type="text"
                                            ref={inputRef}
                                            style={{ width: '100%' }}
                                            placeholder="請輸入傳真號碼"
                                            value={value.fax}
                                            onChange={(e) =>
                                                setValue({
                                                    ...value,
                                                    fax: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <label className={styles.label}>
                                        開放時間：
                                    </label>
                                    <textarea
                                        value={value.time}
                                        onChange={(e) =>
                                            setValue({
                                                ...value,
                                                time: e.target.value,
                                            })
                                        }
                                        className={styles.textarea}
                                    ></textarea>
                                </div>
                                <div className="col-6">
                                    <label className={styles.label}>
                                        活動介紹：
                                    </label>
                                    <textarea
                                        rows={8}
                                        value={value.card_info}
                                        onChange={(e) =>
                                            setValue({
                                                ...value,
                                                card_info: e.target.value,
                                            })
                                        }
                                        className={styles.textarea}
                                    ></textarea>
                                </div>
                                <div className="col-6">
                                    <label className={styles.label}>
                                        活動詳情：
                                    </label>
                                    <textarea
                                        rows={8}
                                        value={value.card_info1}
                                        onChange={(e) =>
                                            setValue({
                                                ...value,
                                                card_info1: e.target.value,
                                            })
                                        }
                                        className={styles.textarea}
                                    ></textarea>
                                </div>
                                <div className="col-6">
                                    <label className={styles.label}>
                                        體驗活動：
                                    </label>
                                    <textarea
                                        rows={8}
                                        value={value.card_a}
                                        onChange={(e) =>
                                            setValue({
                                                ...value,
                                                card_a: e.target.value,
                                            })
                                        }
                                        className={styles.textarea}
                                    ></textarea>
                                </div>
                                <div className="col-6">
                                    <label className={styles.label}>
                                        遊覽景點：
                                    </label>
                                    <textarea
                                        rows={8}
                                        value={value.card_b}
                                        onChange={(e) =>
                                            setValue({
                                                ...value,
                                                card_b: e.target.value,
                                            })
                                        }
                                        className={styles.textarea}
                                    ></textarea>
                                </div>
                                <div className="col-6">
                                    <label className={styles.label}>
                                        建議遊程：
                                    </label>
                                    <textarea
                                        rows={8}
                                        value={value.card_c}
                                        onChange={(e) =>
                                            setValue({
                                                ...value,
                                                card_c: e.target.value,
                                            })
                                        }
                                        className={styles.textarea}
                                    ></textarea>
                                </div>
                                <div className="col-6">
                                    <label className={styles.label}>
                                        在地美食：
                                    </label>
                                    <textarea
                                        rows={8}
                                        value={value.card_d}
                                        onChange={(e) =>
                                            setValue({
                                                ...value,
                                                card_d: e.target.value,
                                            })
                                        }
                                        className={styles.textarea}
                                    ></textarea>
                                </div>
                                <div className="col-6">
                                    <label className={styles.label}>
                                        伴手禮與農特產：
                                    </label>
                                    <textarea
                                        rows={8}
                                        value={value.card_e}
                                        onChange={(e) =>
                                            setValue({
                                                ...value,
                                                card_e: e.target.value,
                                            })
                                        }
                                        className={styles.textarea}
                                    ></textarea>
                                </div>
                                <div className="col-6">
                                    <label className={styles.label}>
                                        地圖導覽：
                                    </label>
                                    <textarea
                                        rows={8}
                                        value={value.Map_a}
                                        onChange={(e) =>
                                            setValue({
                                                ...value,
                                                Map_a: e.target.value,
                                            })
                                        }
                                        className={styles.textarea}
                                    ></textarea>
                                </div>
                                <div className="col-6">
                                    <label className={styles.label}>
                                        交通建議：
                                    </label>
                                    <textarea
                                        rows={8}
                                        value={value.Map_b}
                                        onChange={(e) =>
                                            setValue({
                                                ...value,
                                                Map_b: e.target.value,
                                            })
                                        }
                                        className={styles.textarea}
                                    ></textarea>
                                </div>
                                <div className="col-6">
                                    <label className={styles.label}>
                                        活動宣傳照片：
                                    </label>
                                    <div
                                        className={styles.photos}
                                        onBlur={() => {}}
                                    >
                                        <FileUploadSample
                                            onChange={setSingleImages}
                                            photos={value.card_img}
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label className={styles.label}>
                                        活動導覽照片：
                                    </label>
                                    <div
                                        className={styles.photos}
                                        onBlur={() => {}}
                                    >
                                        <FileUploadSample
                                            onChange={setImages}
                                            photos={value.company_infoImg}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                            <div className="d-flex justify-content-center ">
                                <div
                                    className={clsx('mb-5', 'pe-2')}
                                    // onClick={handleSubmit}
                                >
                                    <div
                                        className={styles.button}
                                        onClick={() => {
                                            handleSubmit()
                                            inesertNewInfo()
                                        }}
                                    >
                                        修改活動
                                    </div>
                                </div>
                                <div
                                    className={clsx('mb-5', 'ps-2')}
                                    onClick={handleSubmit}
                                >
                                    <div
                                        className={styles.button}
                                        onClick={() => goBack()}
                                    >
                                        返回
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Editactivity
