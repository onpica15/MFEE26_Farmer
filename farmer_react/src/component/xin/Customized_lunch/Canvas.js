/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState, useContext } from 'react';
import CartCountContext from '../../ben/cart_count/CartCountContext';

function Canvas(props) {
    const Swal = require('sweetalert2');
    const member_info = JSON.parse(localStorage.getItem('auth'));
    // console.log(member_info.customer_id);
    const { cartList, setCartList } = useContext(CartCountContext);
    const { totalPrice, foodCount, setFoodCount, dataFromFoodArea } = props;
    const [cache, setCache] = useState({});
    const [textArea, setTextArea] = useState('');
    const [inputName, setInputName] = useState('');
    const cRef = useRef();
    const shadowRef = useRef();
    const drawLocations = [
        [120, 320],
        [130, 330],
        [150, 165],
        [330, 170],
        [400, 325],
    ];
    const drawSize = [
        [280, 180],
        [250, 150],
        [160, 160],
        [240, 150],
        [170, 170],
    ];
    const lunchCount = () => {
        return Array(5)
            .fill(1)
            .map((v, i) => (
                <option key={i} value={i + 1}>
                    {i + 1}
                </option>
            ));
    };
    //畫便當盒 async await
    const getImageFromPath = async (path) => {
        return new Promise((resolve, reject) => {
            if (!!cache[path]) {
                return resolve(cache[path]);
            }
            const img = new Image();
            img.onload = function () {
                resolve(img);
                setCache({ ...cache, [path]: img });
            };
            img.src = path;
        });
    };

    const doDraw = async () => {
        const shadowCtx = shadowRef.current.getContext('2d');
        const realCtx = cRef.current.getContext('2d');

        const tmpCart = dataFromFoodArea.slice(0, 5); // 只取前面五筆
        // let countComplete = tmpCart.length

        let i = 0;
        // 清除畫面
        shadowCtx.clearRect(
            0,
            0,
            shadowRef.current.width,
            shadowRef.current.height
        );
        // 背景圖
        let img = await getImageFromPath(`/images/perferBox2.png`);
        shadowCtx.drawImage(img, 0, 0, 700, 650);
        for (let item of tmpCart) {
            img = await getImageFromPath(`${item.image}`);
            shadowCtx.drawImage(
                img,
                drawLocations[i][0],
                drawLocations[i][1],
                drawSize[i][0],
                drawSize[i][1]
            );
            i++;
        }
        realCtx.clearRect(0, 0, cRef.current.width, cRef.current.height); // 清除畫面
        realCtx.drawImage(shadowRef.current, 0, 0);
    };
    // 存canvas畫布
    let key = 'draw-food';
    const saveCanvas = () => {
        const imgTxt = cRef.current.toDataURL();
        sessionStorage.setItem(key, imgTxt);
    };

    useEffect(() => {
        doDraw();
    }, [dataFromFoodArea]);
    //送資料
    async function sendData(event) {
        if (dataFromFoodArea.length === 0) {
            Swal.fire({
                icon: 'error',
                title: '食材至少選擇一樣唷:)',
            });
            event.preventDefault();
            return;
        } else {
            Swal.fire({
                title: '訂單即將送出',
                text: '請確認選擇食材是否正確:D',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '確認',
                cancelButtonText: '取消',
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log(result);
                    Swal.fire({
                        title: '訂單已送出~感謝您的訂購',
                        showConfirmButton: false,
                    });
                    setTimeout(function () {
                        window.location.href =
                            'http://localhost:3000/customized_lunch';
                    }, 1500);
                }
            });
            event.preventDefault();
        }
        //送formData
        const fd = new FormData(document.form1);
        fd.append(
            'lunch_1',
            dataFromFoodArea[0].name === '' ? '' : dataFromFoodArea[0].name
        );
        fd.append(
            'lunch_2',
            dataFromFoodArea[1] ? dataFromFoodArea[1].name : ''
        );
        fd.append(
            'lunch_3',
            dataFromFoodArea[2] ? dataFromFoodArea[2].name : ''
        );
        fd.append(
            'lunch_4',
            dataFromFoodArea[3] ? dataFromFoodArea[3].name : ''
        );
        fd.append(
            'lunch_5',
            dataFromFoodArea[4] ? dataFromFoodArea[4].name : ''
        );
        fd.append('total_price', totalPrice / foodCount);
        fd.append('lunch_pic', sessionStorage.getItem(key));
        fd.append('member_id', member_info.customer_id);
        // console.log(member_info.customer_id);
        try {
            const response = await fetch(
                'http://localhost:3600/customized_lunch/add',
                {
                    method: 'POST',
                    body: fd,
                }
            );
            const result = await response.json();
            setCartList(result);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="col-12 col-md-6 xin-canvas text-center flex-grow-1">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb m-3">
                        <li className="breadcrumb-item ">
                            <a className="text-decoration-none" href="#/">
                                首頁
                            </a>
                        </li>
                        <li
                            className="breadcrumb-item active "
                            aria-current="page"
                        >
                            客製化餐點
                        </li>
                    </ol>
                </nav>

                <canvas
                    ref={shadowRef}
                    width="600"
                    height="600"
                    hidden
                ></canvas>
                <canvas
                    className="canvasFood "
                    id="myCanvas"
                    ref={cRef}
                    width="600"
                    height="600"
                ></canvas>
                <form
                    name="form1"
                    onSubmit={() => {
                        sendData(event);
                    }}
                >
                    <div className="xin-canvas-topay d-flex flex-column align-items-center flex-wrap">
                        <div className="d-md-flex lunch-name-area mb-3 h4">
                            <label htmlFor="">便當名稱:</label>
                            <input
                                type="text"
                                className="lunch-name-input form-control"
                                name="lunch_name"
                                value={inputName}
                                onChange={(e) => {
                                    setInputName(e.target.value);
                                }}
                            />
                            <div className="form-group d-flex align-items-center my-3 my-md-0 ms-md-3 justify-content-center">
                                <label
                                    htmlFor="exampleFormControlSelect1 "
                                    className="xin-font-primary-color h4 m-0 pe-1"
                                >
                                    便當數量:
                                </label>
                                <select
                                    value={foodCount}
                                    onChange={(e) => {
                                        setFoodCount(e.target.value);
                                    }}
                                    className="form-select lunchbox_stock  me-3 "
                                    id="exampleFormControlSelect1"
                                    name="lunchbox_stock"
                                    required
                                >
                                    {lunchCount()}
                                </select>
                            </div>
                        </div>
                        <div className="d-flex flex-wrap col-12 justify-content-center w-100">
                            <div className="canvaslabelTitle form-group d-flex flex-column  mb-3">
                                <label
                                    htmlFor="exampleFormControlTextarea1"
                                    className="canvaslabel"
                                >
                                    備註欄:
                                </label>
                                <textarea
                                    value={textArea}
                                    onChange={(e) => {
                                        setTextArea(e.target.value);
                                    }}
                                    className="form-control canvasTextArea "
                                    id="exampleFormControlTextarea1"
                                    rows="3"
                                    name="custom_remark"
                                ></textarea>
                            </div>
                        </div>

                        <div className="canvasBtns  d-flex justify-content-center mt-md-5 mb-4">
                            <button
                                className="priceArea price-btn  btn-success me-3 xin-font-primary-color rounded-pill disabled"
                                style={{ color: '#FAFAFA' }}
                            >
                                總價:{totalPrice}
                            </button>
                            <button
                                type="submit"
                                className="btn-primary pay-btn rounded-pill"
                                style={{ color: '#FAFAFA' }}
                                onClick={saveCanvas}
                            >
                                送出訂單
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Canvas;
