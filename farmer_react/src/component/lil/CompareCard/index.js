import React, { useEffect, useState } from 'react';
import styles from './CompareCard.module.css';
import Box from '../Box';
import { getProductItem } from '../../../api/product';
import { HASHTAG } from '../../../config/variables';

function CompareCard({ sid }) {
    const [data, setData] = useState({});

    const getItem = async () => {
        const item = await getProductItem(sid);
        setData(item);
    };

    useEffect(() => {
        getItem();
    }, [sid]);

    return (
        <>
            <div className={styles.body}>
                <div className={styles.bName}>
                    <p>{data.product_name}</p>
                </div>
                <div className={styles.bPhoto}>
                    <div
                        style={{
                            width: '100px',
                            height: '100px',
                            margin: 'auto',
                        }}
                    >
                        <Box>
                            <img
                                src={data.product_img && data.product_img[0]}
                                style={{
                                    objectFit: 'cover',
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </Box>
                    </div>
                </div>
                <div className={styles.bHashTsg}>
                    {data.product_hashtag &&
                        data.product_hashtag.map((v, i) => (
                            <div key={i} style={{ display: 'inline-block' }}>
                                #{HASHTAG[v]}
                            </div>
                        ))}
                </div>
                <div className={styles.bInfo}>
                    <p>{data.product_details}</p>
                </div>
            </div>
        </>
    );
}

export default CompareCard;
