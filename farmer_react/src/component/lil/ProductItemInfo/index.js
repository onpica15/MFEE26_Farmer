import styles from './ProductItemInfo.module.css';
import _ from 'lodash';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineHeart } from 'react-icons/ai';
import Box from '../Box';
import { UNIT, SUPPLIER, HASHTAG } from '../../../config/variables';
import LineShare from '../LineShare';
import { useNavigate } from 'react-router-dom';
import { getStarRating } from '../../../api/product';
import ReactStars from 'react-rating-stars-component';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

function ProductItemInfo({ data, sid, onSubmit, onCollect, saved }) {
    const images = data.product_img;
    const navigate = useNavigate();
    // const [collect, setCollect] = useState(false);
    const [addCart, setAddCart] = useState(false);
    const [amount, setAmount] = useState(1);
    // const [save, setSave] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const selectedImgUrl = images && images[selectedImage];
    const member_info = JSON.parse(localStorage.getItem('auth')) || {};
    const userId = member_info.customer_id;
    const [rating, setRating] = useState({});

    const goToPath = () => {
        navigate(`/cart`);
    };

    const handleImageClicked = (event, index) => {
        setSelectedImage(index);
    };

    const countRating = async (sid) => {
        const data = await getStarRating(sid);
        //{average: 4.04, rows: 13}
        setRating(data);
    };
    useEffect(() => {
        countRating(sid);
    }, [sid]);

    return (
        <>
            <div className={styles.container}>
                {/* <div className="bread">
                    <p>商品/水果/屏東現採有機萊姆</p>
                </div> */}
                <div className={clsx(styles.product_info_wrap, 'row')}>
                    <div
                        className={clsx(
                            styles.product_imgs,
                            'col-md-6',
                            'col-12'
                        )}
                    >
                        <div className={styles.img_main}>
                            <div className={styles.img_1}>
                                <Box>
                                    <img
                                        className={styles.img_show}
                                        src={selectedImgUrl}
                                        alt=""
                                    />
                                </Box>
                            </div>
                        </div>
                        <div className={styles.img_else}>
                            {images &&
                                images.map((el, index) => (
                                    <div
                                        key={el}
                                        className={styles.img_2}
                                        onClick={(event) =>
                                            handleImageClicked(event, index)
                                        }
                                    >
                                        <Box>
                                            <img
                                                src={el}
                                                alt=""
                                                className={styles.img_show}
                                            />
                                        </Box>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div
                        className={clsx(
                            styles.product_info,
                            'col-md-6',
                            // 'col-sm-12',
                            'col-12'
                        )}
                    >
                        <h2>{data.product_name}</h2>
                        <p>{SUPPLIER[data.product_supplier]}</p>
                        <div className={styles.star}>
                            <div className={styles.star_area}>
                                {!_.isNil(rating.average) && (
                                    <ReactStars
                                        size={16}
                                        value={rating.average}
                                        edit={false}
                                        isHalf
                                    />
                                )}
                            </div>
                            <div className={styles.point}>{`${
                                rating.average || 0
                            }`}</div>
                            <div className={styles.total_point}>{`(${
                                rating.rows || 0
                            })`}</div>
                        </div>
                        <div className={styles.info_price}>
                            <div className={styles.dollar_tag}>$</div>
                            <div className={styles.dollar}>
                                {data.product_price}
                            </div>
                            <div className={styles.slash}>/</div>
                            <div className={styles.type}>
                                {UNIT[data.product_unit]}
                            </div>
                        </div>
                        <div className={styles.info_count}>
                            <div
                                className={styles.minus}
                                style={{ fontWeight: 'normal' }}
                                onClick={() => {
                                    setAmount(() => {
                                        return amount > 1 ? amount - 1 : amount;
                                    });
                                }}
                            >
                                <AiOutlineMinus />
                            </div>
                            <div className={styles.num_box}>
                                <div className={styles.num}>{amount}</div>
                            </div>
                            <div
                                className={styles.plus}
                                style={{ fontWeight: 'normal' }}
                                onClick={() => {
                                    setAmount(amount + 1);
                                }}
                            >
                                <AiOutlinePlus />
                            </div>
                        </div>
                        <div className={styles.storage}>
                            <div className={styles.storage_title}>
                                剩餘庫存:
                            </div>
                            <div className={styles.storage_num}>
                                {data.product_inventory}
                            </div>
                        </div>
                        <div
                            className={clsx(styles.add_to_cart, {
                                [styles.added]: addCart,
                            })}
                            onClick={() => {
                                if (!userId) {
                                    MySwal.fire({
                                        title: '請先登入帳號',
                                        confirmButtonColor: '#82CA35',
                                    });
                                    return;
                                }
                                setAddCart((prev) => !prev);
                                onSubmit(amount, addCart);
                                if (addCart) {
                                    goToPath();
                                }
                            }}
                        >
                            {addCart ? '立刻結帳' : '加入購物車'}
                        </div>
                        <div
                            className={clsx(styles.add_to_collect, {
                                [styles.collected]: saved,
                            })}
                            onClick={() => {
                                onCollect(!saved);
                            }}
                        >
                            {saved ? '已收藏' : '加入收藏'}
                            <AiOutlineHeart
                                size={20}
                                className={styles.heart}
                            />
                        </div>
                        <div className={styles.hashtag_area}>
                            {data.product_hashtag &&
                                data.product_hashtag.map((v, i) => {
                                    return (
                                        <div className={styles.hashtag} key={i}>
                                            #{HASHTAG[v]}
                                        </div>
                                    );
                                })}
                        </div>
                        <LineShare />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductItemInfo;
