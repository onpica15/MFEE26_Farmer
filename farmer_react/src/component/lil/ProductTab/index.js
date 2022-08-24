import styles from './ProductTab.module.css';
import clsx from 'clsx';
import { useState } from 'react';
import ProductDetail from '../ProducrDetail';
import ProductRecipe from '../ProductRecipe';

function ProductTab({ data }) {
    const [selected, setSelected] = useState(0);

    const handleClicked = (id) => {
        setSelected(id);
    };

    const renderInfo = () => {
        switch (selected) {
            case 0:
                return <ProductDetail data={data} />;

            case 1:
                return <ProductRecipe />;
            default:
                break;
        }
    };

    return (
        <>
            <div style={{ padding: '0 50px' }}>
                <div className={styles.tabWrap}>
                    <div
                        className={clsx(styles.tab_product_detail, styles.tab, {
                            [styles.active]: selected === 0,
                        })}
                        onClick={() => {
                            handleClicked(0);
                        }}
                    >
                        <p>商品細節</p>
                    </div>
                    <div
                        className={clsx(styles.tab_product_recipe, styles.tab, {
                            [styles.active]: selected === 1,
                        })}
                        onClick={() => {
                            handleClicked(1);
                        }}
                    >
                        <p>食譜推薦</p>
                    </div>
                </div>
                <div>{renderInfo()}</div>
            </div>
        </>
    );
}
export default ProductTab;
