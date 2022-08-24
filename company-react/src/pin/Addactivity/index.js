import _ from 'lodash'
import styles from './AddProduct.module.css'
import clsx from 'clsx'
import React, { useRef, useEffect, useState } from 'react'
import Modal from 'react-modal'
import FileUploadSample from '../../component/FileUploadSample'
import { submitData, uploadImages, changeData } from '../../api/root'
import { getProductItem } from '../../api/product'
import { GrClose } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { format } from 'date-fns'

Modal.setAppElement('#root')
function Addactivity({ sid, onClose, onUpdate, isNew }) {
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
        time: '',
        card_city: '',
        card_info: '',
        card_info1: '',
        card_a: '',
        card_b: '',
        card_c: '',
        card_d: '',
        card_e: '',
        Map_b: '',
        company_infoImg: [],
        card_img: [],
    })
    const [singleImages, setSingleImages] = useState([])
    const [images, setImages] = useState([])
    const [startDate, setStartDate] = useState(null)
    const goBack = () => {
        navigate(`/company/activity`)
    }
    const [addHashTag, setAddHashTag] = useState({})

    const handleChange = (key, newValue) => {
        setValue((prev) => {
            return { ...prev, [key]: newValue }
        })
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
        // console.log(newPicArray)
        return JSON.stringify(newPicArray)
    }

    const inesertNewInfo = () => {
        const packageToSend = {
            card_area: value.card_area,
            company_id: company_info_id,
            card_img: getSinglePicNewArray(),
            company_infoImg: getPicNewArray(),
            address: value.address,
            phone: value.phone,
            fax: value.fax,
            card_city: value.card_city,
            card_info: value.card_info,
            card_info1: value.card_info1,
            card_a: value.card_a,
            card_b: value.card_b,
            card_c: value.card_c,
            card_d: value.card_d,
            card_e: value.card_e,
            Map_a: value.Map_a,
            Map_b: value.Map_b,
        }
        // console.log(packageToSend)
        fetch('http://localhost:3600/activity/add', {
            method: 'POST',
            body: JSON.stringify(packageToSend),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((r) => r.json())
            .then((obj) => {
                if (obj.success) {
                    Swal.fire({
                        icon: 'success',
                        title: '新增成功',
                        showConfirmButton: true,
                        confirmButtonText: '確認',
                        confirmButtonColor: '#709D40',
                    }).then(() => {
                        navigate('/company/activity', { replace: true })
                    })
                }
            })
    }
    const autoInput = () => {
        console.log(value)
        const newOBK = { ...value }
        newOBK.card_area = '大樹休閒農業區'
        newOBK.card_city = '高雄 大樹'
        newOBK.address = '高雄市大樹區龍目路65號'
        newOBK.phone = '0936-384667'
        newOBK.fax = '0936-384667'
        newOBK.time =
            '星期一 08:00 ~ 17:00 / 星期二 08:00 ~ 17:00 / 星期三 08:00 ~ 17:00 / 星期四 08:00 ~ 17:00 / 星期五 08:00 ~ 17:00 / 星期六 08:00 ~ 17:00 / 星期日 08:00 ~ 17:00 '
        newOBK.card_info =
            '以鳳梨、荔枝為主軸，發展多元及具創意巧思之農遊商品與遊程；組織幹部熱情活躍，結合當地農再社區，共同行銷高雄農業人文與特色，南向國家遊客逐年成長，締造佳績。'
        newOBK.card_info1 =
            '為促進該大樹區休閒農業更加蓬勃，於102年度開始實施向行政院農業委員會申請計畫，積極推動大樹區休閒農業，以期帶動該區休閒農業之發展大樹休閒農業區位於高雄市東南方，東至高屏溪以溪中心為界，毗鄰屏東市；西以丘陵山脊為界，至大社、仁武、項松等區；南迄曹公圳接大寮區；北以嶺口溝為界接旗山區，全部面積66.9811平方公里，離屏東市約15分鐘；高雄市區約25分鐘車程；台南至大樹1小時車程即可到達，交通尚稱便利。<br/><br/>以行政區域由南往北則以大樹區龍目里、興山里、和山里、姑山及三和里為主，以周邊一帶生產農地(咖啡、鳳梨、荔枝等)，不僅農業資源豐富，並以休閒農業規畫朝向「三生農村」、「多元體驗活動」、「有機餐飲」與「樂活與慢食」等四面向發展，期望活絡農村，帶動地方商機，促進本地區休閒農業的發展。<br/><br/>區位上因交通便利，也是大樹觀光遊憩發展較為發達的地方。包括合法農場(華一休閒牧場、立大農場及綠冠專業有機農場)、合法民宿(明山莊)、歷史古厝(莊家古厝)及休閒餐廳(紅豆咖啡、愛上布諾閣及東照山咖啡)等。<br/><br/>並以鳳梨種植面積達700公頃且品種多樣化，以荔枝(玉荷包)於大樹區域內種植面積達1,852公頃，為全國鄉鎮之冠。<br/>在炎炎夏日時分，鳳梨、荔枝盛產時刻，大樹區一年一度的「鳳荔文化觀光季」就會開鑼登場，擁有「玉荷包荔枝」、「金鑽鳳梨」及「好山好水」的大樹區以最頂級的三寶歡迎各地朋友們的造訪。'
        newOBK.card_a =
            '社區巡禮→龍眼林生態步道→DIY活動→風味餐→舊鐵橋溼地公園→華一牧場→採果樂'
        newOBK.card_b =
            '採鳳梨、鳳梨蔭醬DIY、鳳梨年糕DIY、鳳梨肉丸DIY、荔枝染、童玩DIY'
        newOBK.card_c =
            '預約制常態體驗遊程: 採鳳梨/鳳梨蔭醬DIY/鳳梨酥DIY<br/>四季特色體驗: 採鳳梨、季節限定:玉荷包荔枝<br/>季節限定-玉荷包荔枝(每年5-6月)、<br/>採果樂: 金鑽鳳梨及其他品種鳳梨、<br/>其他產季時令瓜果: 紅龍果、芭樂、苦瓜…等<br/>時令性預約制農事體驗: 一日農夫體驗趣<br/>鳳梨: 催花、施肥、防曬、採摘 (預約制)…<br/>荔枝: 疏花、季節限定採摘 (預約制)'
        newOBK.card_d = '華一牧場、台灣鳳梨工場-旺來會社'
        newOBK.card_e =
            '鳳梨酥 鳳梨果乾/巴瓈圓手工鳳梨酥<br/>鳳梨酥 鳳梨蛋糕 鳳梨酵素冰/旺來會社<br/>有機鳳梨豆醬 有機鳳梨果醬/ 綠冠有機<br/>旺來汽水好心情/ 大樹休閒農業區<br/>'
        newOBK.Map_a =
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d920.2662573078239!2d120.41014178809893!3d22.688622999065633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e109839ae4a73%3A0xeca67ee3f68dd08a!2zODQw6auY6ZuE5biC5aSn5qi55Y2A6b6N55uu6LevNjXomZ8!5e0!3m2!1szh-TW!2stw!4v1660791882692!5m2!1szh-TW!2stw'
        newOBK.Map_b = ''
        // console.log(newOBK);
        setValue(newOBK)
    }

    return (
        <>
            <div className={styles.body}>
                <div className={clsx('container', styles.content)}>
                    <div className={styles.empty}></div>
                    <div className={styles.container}>
                        <form className={styles.form} name="form">
                            <button
                                className="btn btn btn-sm pin-btnlogon"
                                type="button"
                                onClick={autoInput}
                            >
                                快速填寫
                            </button>
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
                                        活動區域：
                                    </label>
                                    <div className={styles.text}>
                                        <input
                                            name="name"
                                            type="text"
                                            ref={inputRef}
                                            style={{ width: '100%' }}
                                            placeholder="請輸入活動地址"
                                            value={value.card_city}
                                            onChange={(e) =>
                                                setValue({
                                                    ...value,
                                                    card_city: e.target.value,
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
                                        傳真：
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
                                    <div className={styles.photos}>
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
                                    <div className={styles.photos}>
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
                                        新增活動
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
export default Addactivity
