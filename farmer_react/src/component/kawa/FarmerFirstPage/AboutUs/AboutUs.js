import React from 'react';
import './AboutUs.css';
import MarqueeSliderL from './MarqueeSliderL/MarqueeSliderL';
import MarqueeSliderR from './MarqueeSliderR/MarqueeSliderR';

const AboutUs = () => {
    return (
        <>
            <MarqueeSliderL />
            <div className="aboutUs_section mt-5 mb-5">
                <div className="aboutUs_imgwarap_area">
                    <div className="aboutUs_imgwarap">
                        <img
                            src="/images/index_images/hydroponics-system-planting-vegetables-herbs-without-using-soil-health.jpg"
                            alt=""
                        />
                    </div>
                    <div className="aboutUs_imgwarap">
                        <img
                            src="/images/index_images/portrait-asian-farmer-man-woman-holding-wooden-box-full-fresh-raw-vegetables-organic-farm-concept.jpg"
                            alt=""
                        />
                    </div>
                </div>

                <div className="aboutUs_text_area mt-3 d-flex flex-column align-items-center">
                    <div className="aboutUs_title mb-5">
                        <h2 className="aboutUs_titleText">純淨無毒、</h2>
                        <h2 className="aboutUs_titleText">在地嚴選</h2>
                    </div>

                    <p>
                        有機の小鱻肉本著健康、安心、在地化的根本，與小農合作推出一系列
                        有機食品，並提供客製化便當料理讓顧客真正決定自己想要吃的東西。
                        透過平台拉近台灣在地小農跟民眾間的距離，不僅讓消費者能吃到真正
                        自然無汙染的食材，同時協助商家開發並推廣自家品牌。提供雙方互利互惠的
                        平台環境，也為台灣的無毒食安貢獻一份心力。
                    </p>
                </div>
            </div>

            <MarqueeSliderR className="" />
        </>
    );
};

export default AboutUs;
