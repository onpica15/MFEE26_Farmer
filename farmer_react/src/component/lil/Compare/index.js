import React from 'react';
import styles from './Compare.module.css';
import CompareCard from '../CompareCard';
import clsx from 'clsx';
import { GrClose } from 'react-icons/gr';
import { BsSlashLg } from 'react-icons/bs';

function Compare({ onClose, sid }) {
    console.log(sid);
    return (
        <>
            <div className={clsx('container', styles.page)}>
                <div className={styles.close} onClick={onClose}>
                    <GrClose color="#fff" />
                </div>
                <div className={styles.title}>
                    <p
                        style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            margin: 0,
                        }}
                    >
                        比較商品
                    </p>
                    <BsSlashLg size={16} className={styles.slash} />
                    <p style={{ fontSize: '16px', margin: 0 }}>
                        comparative sheet
                    </p>
                </div>
                <div className="row">
                    <div className={styles.tHead}>
                        <div className={styles.tName}>
                            <p>商品名</p>
                        </div>
                        <div className={styles.tPhoto}>
                            <p>商品照片</p>
                        </div>
                        <div className={styles.tHashTsg}>
                            <p>商品標籤</p>
                        </div>
                        <div className={styles.tInfo}>
                            <p>商品細節</p>
                        </div>
                    </div>
                    {sid && sid.map((v, i) => <CompareCard sid={v} key={i} />)}
                </div>
            </div>
        </>
    );
}

export default Compare;
