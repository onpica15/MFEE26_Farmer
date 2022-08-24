import React from 'react';
import styles from './Ad.module.css';
import clsx from 'clsx';
import { IoIosCloseCircle } from 'react-icons/io';
function Ad({ className, onClick }) {
    return (
        <div className={clsx(styles.ad, className)}>
            <IoIosCloseCircle
                className={styles.close}
                size={24}
                onClick={onClick}
            />
            <img
                className={styles.img}
                src="/images/Mesa de trabajo 1-100.jpg"
                alt=""
            />
        </div>
    );
}
export default Ad;
