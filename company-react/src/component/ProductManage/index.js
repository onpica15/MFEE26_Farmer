import styles from './ProductManage.module.css'
import clsx from 'clsx'
import { GrClose } from 'react-icons/gr'
import { getProductItem } from '../../api/product'
import { useEffect, useState } from 'react'
import { UNIT, SUPPLIER, HASHTAG } from '../../config/variables'
import Box from '../Box'

function ProductManage({ onClose, sid }) {
    const [data, setData] = useState({})
    const item = async (sid) => {
        const data = await getProductItem(sid)
        setData(data)
    }
    console.log(sid, data.product_hashtag)

    useEffect(() => {
        item(sid)
    }, [])
    return (
        <>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.product_detail}>
                        <div className={styles.col}>
                            <div className={styles.product_imgs}>
                                <div className={styles.img_main}>
                                    <div className={styles.img_1}>
                                        <Box>
                                            <img
                                                src={
                                                    data.img_urls &&
                                                    data.img_urls[0]
                                                }
                                                alt=""
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </Box>{' '}
                                    </div>
                                </div>
                                <div className={styles.img_else}>
                                    {data.img_urls &&
                                        data.img_urls
                                            .filter((v, i) => {
                                                return i !== 0
                                            })
                                            .map((v, i) => {
                                                return (
                                                    <div
                                                        className={styles.img_2}
                                                    >
                                                        <Box>
                                                            <img
                                                                src={v}
                                                                alt=""
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    objectFit:
                                                                        'cover',
                                                                }}
                                                            />
                                                        </Box>
                                                    </div>
                                                )
                                            })}

                                    {/* <div className={styles.img_2}>
                    <img src="images/F-lemon.jpg" alt="" />
                  </div>
                  <div className={styles.img_2}>
                    <img src="images/F-lemon.jpg" alt="" />
                  </div>
                  <div className={styles.img_2}>
                    <img src="images/F-lemon.jpg" alt="" />
                  </div> */}
                                </div>
                            </div>
                        </div>
                        <div className={styles.col}>
                            <h2>{data.product_name}</h2>
                            <p>{SUPPLIER[data.product_supplier]}</p>
                            <div
                                className={clsx(
                                    styles.price_on_the_market,
                                    styles.d_flex
                                )}
                            >
                                <div
                                    className={clsx(
                                        styles.info_price,
                                        styles.d_flex
                                    )}
                                >
                                    <div className={styles.dollar_tag}>$</div>
                                    <div className={styles.dollar}>
                                        {data.product_price}
                                    </div>
                                    <div className={styles.slash}>/</div>
                                    <div className={styles.type}>
                                        {UNIT[data.product_unit]}
                                    </div>
                                </div>
                                <div
                                    className={clsx(
                                        styles.on_the_market,
                                        styles.d_flex
                                    )}
                                >
                                    <div className={styles.storage_title}>
                                        商品狀態:
                                    </div>
                                    <div
                                        className={styles.storage_num}
                                        style={{ color: '#c92d2d' }}
                                    >
                                        {data.product_status
                                            ? '上架中'
                                            : ' 下架'}
                                    </div>
                                </div>
                            </div>
                            <div
                                className={clsx(styles.storage, styles.d_flex)}
                            >
                                <div className={styles.storage_title}>
                                    剩餘庫存:
                                </div>
                                <div className={styles.storage_num}>
                                    {data.product_inventory}
                                </div>
                            </div>
                            <div
                                className={clsx(styles.expired, styles.d_flex)}
                            >
                                <div className={styles.expired_title}>
                                    保鮮期:
                                </div>
                                <div className={styles.expired_days}>
                                    {data.product_expire}
                                </div>
                            </div>
                            <div className={styles.item_info}>
                                <p>{data.product_details}</p>
                            </div>
                            <div
                                className={clsx(
                                    styles.item_hashtags,
                                    styles.d_flex
                                )}
                            >
                                {data.product_hashtag &&
                                    data.product_hashtag.map((v, i) => {
                                        return (
                                            <div
                                                className={styles.hashtag}
                                                key={i}
                                            >
                                                #{HASHTAG[v]}
                                            </div>
                                        )
                                    })}
                            </div>
                            <div className={styles.close} onClick={onClose}>
                                <GrClose color="#fff" />
                            </div>
                            {/* <div
                                className={styles.edit}
                                onClick={() => {}} //TODO:
                            >
                                <p>修改資料</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductManage
