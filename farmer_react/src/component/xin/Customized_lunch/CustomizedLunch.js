import Foods from './Foods';
import Canvas from './Canvas';
import SelectedFood from './SelectedFood';
import './Customized_product.css';
import { useState } from 'react';

function CustomizedLunch() {
    const [isShowed, setIsShowed] = useState(true);
    const [isShowedSelectFood, setIsShowedSelectFood] = useState(true);
    const [dataFromFoodArea, setDataFromFoodArea] = useState([]);
    const [foodCount, setFoodCount] = useState(1);
    const [foodList, setFoodList] = useState([]); //撈資料庫
    //算數量
    const caclTotalCount = () => {
        let count = 0;
        for (let i = 0; i < dataFromFoodArea.length; i++) {
            count = dataFromFoodArea.length;
        }
        return count;
    };
    //算價格
    const calcTotalPrice = () => {
        let total = 0;

        for (let i = 0; i < dataFromFoodArea.length; i++) {
            total += dataFromFoodArea[i].price * foodCount;
        }
        return total;
    };

    return (
        <>
            <div className="container-fluid g-0">
                <div className="pho-bg row w-100 m-0 g-0">
                    <Foods
                        isShowed={!isShowed}
                        setIsShowed={setIsShowed}
                        dataFromFoodArea={dataFromFoodArea}
                        setDataFromFoodArea={setDataFromFoodArea}
                        foodList={foodList}
                        setFoodList={setFoodList}
                    />
                    <Canvas
                        dataFromFoodArea={dataFromFoodArea}
                        setDataFromFoodArea={setDataFromFoodArea}
                        totalPrice={calcTotalPrice()}
                        foodCount={foodCount}
                        setFoodCount={setFoodCount}
                    />
                    <SelectedFood
                        calcCount={caclTotalCount()}
                        foodList={foodList}
                        isShowedSelectFood={!isShowedSelectFood}
                        setIsShowedSelectFood={setIsShowedSelectFood}
                        dataFromFoodArea={dataFromFoodArea}
                        setDataFromFoodArea={setDataFromFoodArea}
                    />
                </div>
            </div>
        </>
    );
}

export default CustomizedLunch;
