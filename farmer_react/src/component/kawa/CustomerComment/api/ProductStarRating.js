import React, { useState, useEffect } from 'react';
import { COMMENT_MAIN } from '../../../../config/ajax-path';
import ReactStars from 'react-rating-stars-component';

const ProductStarRating = () => {
    const [totalComment, setTotalComment] = useState([]);
    const [ratingStarArray, setratingStarArray] = useState([]);

    const getData = () => {
        fetch(COMMENT_MAIN, {
            method: 'GET',
        })
            .then((r) => r.json())
            .then((obj) => {
                setTotalComment(obj);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        const newratingStarArray = totalComment.map((v) => {
            return v.rating;
        });
        setratingStarArray(newratingStarArray);
    }, [totalComment]);

    const starsTotal = totalComment.map((v, i) => {
        const arr = +v.rating;
        return arr;
    });
    const average = starsTotal.reduce((a, b) => a + b, 0) / starsTotal.length;
    // console.log('average', average); //3.9245283018867925
    const averageNum = Math.round(average);
    // 將平均數放入星星顯示
    // const averageStar = {
    //   size: 30,
    //   // value: `${average}`,
    //   // value: 3,
    //   value: `${averageNum}`,
    //   edit: false,
    //   isHalf: true,
    // }

    return (
        <>
            <h1 className="text-center">Title</h1>
            <h2>總評價為{!isNaN(averageNum) && averageNum}</h2>
            {/* <ReactStars {...averageStar}  */}
            {!isNaN(averageNum) && (
                <ReactStars size={30} value={averageNum} edit={false} isHalf />
            )}
        </>
    );
};

export default ProductStarRating;
