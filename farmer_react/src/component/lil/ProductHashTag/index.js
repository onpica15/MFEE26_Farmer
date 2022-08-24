import styles from './ProductHashTag.module.css';
import clsx from 'clsx';

function ProductHashTag(props) {
    return (
        <>
            <div
                className={styles.hashTag}
                onClick={() => {
                    // setCollect((prev) => !prev)
                    props.onClick();
                }}
            >
                <h5
                    className={clsx(styles.hashTagH, {
                        [styles.active]: props.checked,
                    })}
                >
                    #{props.hashTag}
                </h5>
            </div>
        </>
    );
}

export default ProductHashTag;
