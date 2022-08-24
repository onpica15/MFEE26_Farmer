import styles from './ProductCard.module.css';
import { BsCart4 } from 'react-icons/bs';
import { MdAdd } from 'react-icons/md';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineHeart } from 'react-icons/ai';
import { useState } from 'react';
import { UNIT } from '../../../config/variables';
import clsx from 'clsx';
import Box from '../Box';

function ProductCard({
    className,
    name,
    supplier,
    price,
    unit,
    img,
    inventory,
    onClick,
    hotSale,
    onSubmit,
    onCollect,
    saved,
    onCompare,
    sid,
    compared,
    compareModal,
}) {
    const [amount, setAmount] = useState(1);
    // const [collect, setCollect] = useState(false);
    const [hover, setHover] = useState(false);
    // const [save, setSave] = useState(false);

    const handleClickMinus = () => {
        setAmount(amount > 1 ? amount - 1 : amount);
    };
    const handleClickPlus = () => {
        setAmount(amount + 1); //TODO: storage
    };

    const addToCart = () => {
        setAmount(1);
        console.log(amount);
        onSubmit(amount);
    };
    const handleCompare = () => {
        onCompare(sid);
    };

    return (
        <div className={className}>
            <div
                className={clsx(styles.card, { [styles.transition]: hover })}
                onMouseOver={() => {
                    setHover(true);
                }}
                onMouseOut={() => {
                    setHover(false);
                }}
            >
                <div
                    className={clsx(styles.card_sold_out, {
                        [styles.show]: !inventory,
                    })}
                >
                    <div className={styles.sold_out}>已售完</div>
                </div>
                <div
                    className={clsx(styles.checked, {
                        [styles.checked_active]: compared,
                        [styles.display]: compareModal,
                    })}
                    onClick={handleCompare}
                >
                    <MdAdd size={28} />
                </div>
                <div onClick={onClick}>
                    <div>
                        <Box>
                            <div className={styles.card_img}>
                                <img src={img} alt="" />
                            </div>
                        </Box>
                        <div className={styles.card_detail}>
                            <p>{supplier}</p>
                            <h3>{name}</h3>
                            <div className={styles.card_price}>
                                <div className={styles.dollar_tag}>$</div>
                                <div className={styles.dollar}>{price}</div>
                                <div className={styles.slash}>/</div>
                                <div className={styles.type}>{UNIT[unit]}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    // className={clsx(styles.card_cart, {
                    //     [styles.hidden]: hover,
                    // })}
                    className={styles.card_cart}
                >
                    <div
                        className={clsx(styles.collect, {
                            [styles.active]: saved,
                        })}
                        onClick={() => {
                            onCollect(!saved);
                        }}
                    >
                        <AiOutlineHeart size={24} /> {/* TODO: 連接收藏 */}
                    </div>
                    <div className={styles.count}>
                        <div
                            className={styles.minus}
                            onClick={handleClickMinus}
                        >
                            <AiOutlineMinus size={14} />
                        </div>
                        <div className={styles.num_box}>
                            <div className={styles.num}>{amount}</div>
                        </div>
                        <div className={styles.plus} onClick={handleClickPlus}>
                            <AiOutlinePlus size={14} />
                        </div>
                    </div>
                    <div className={styles.buy} onClick={addToCart}>
                        <BsCart4 size={24} /> {/* TODO: add to cart */}
                    </div>
                </div>

                {hotSale && <div className={styles.hotSale}>hot sale</div>}
            </div>
        </div>
    );
}

export default ProductCard;
