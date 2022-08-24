import Button from '../Button';
import styles from './ProductRecipe.module.css';
import Box from '../Box';
import clsx from 'clsx';
import { getRecommendRecipe } from '../../../api/product';
import { useEffect, useState } from 'react';

function ProductRecipe() {
    // state data[]
    const [recipes, setRecipes] = useState([]);

    const getRecipeData = async () => {
        // 3 ids to get data
        const ids = getRandoms();
        console.log(ids);

        const data = await Promise.all(ids.map((el) => getRecommendRecipe(el)));

        setRecipes(data);
    };
    console.log(recipes);
    // useEffect on init

    useEffect(() => {
        getRecipeData();
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.title}>食譜推薦</div>
                <div className={clsx(styles.wrap, 'row')}>
                    {recipes.map((v, i) => (
                        <div
                            key={i}
                            className={clsx(
                                styles.RCard,
                                'col-lg-4',
                                'col-sm-6',
                                'col-12'
                            )}
                        >
                            <div className={styles.RCard_img}>
                                <Box>
                                    <img
                                        src={`/images/dishimages/${v.recipes_img}`}
                                        alt=""
                                        style={{
                                            width: ' 100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </Box>
                            </div>
                            <div className={styles.RCard_info}>
                                <h4>{v.recipes_name}</h4>
                                <span>料理難易度:</span>
                                <span>{v.recipes_cooking_degree}</span>
                                <br />
                                <span>分享者:</span>
                                <span>{v.cooking_create_member_Id}</span>
                                <br />
                                <div className={styles.Button}>
                                    <Button
                                        name="如何製作？"
                                        sid={v.recipes_sid}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
export default ProductRecipe;

function getRandoms() {
    let sids = [];

    while (sids.length < 3) {
        let ran = parseInt(Math.random() * 39) + 1;

        for (let j = 0; j < sids.length; j++) {
            if (sids[j] === ran) {
                sids.splice(j, 1);
            }
        }
        sids.push(ran);
    }

    return sids;
}
