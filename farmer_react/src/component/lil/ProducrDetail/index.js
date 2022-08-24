import styles from './ProductDetail.module.css';
import clsx from 'clsx';
import _ from 'lodash';

function ProductDetail({ data = {} }) {
    // console.log(data);
    return (
        <>
            <div className={styles.container}>
                <div className={clsx(styles.wrap, 'row')}>
                    <div className={clsx(styles.part1, 'col-lg-6')}>
                        <div className={styles.photo}>
                            <img src={_.get(data, 'product_img.0')} alt="" />
                        </div>
                    </div>
                    <div className={clsx(styles.part2, 'col-lg-6')}>
                        <div className={styles.title}>
                            <h5>在地小農商品</h5>
                            <h4>{data.product_name}</h4>
                        </div>
                        <div className={styles.info}>
                            <p>{data.product_details}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ProductDetail;
//TODO:
