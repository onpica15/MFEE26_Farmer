import React, { Component } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './IndexBanner.css';
import Slider from 'react-slick';

// const IndexBanner = () => {
//   return (
//     <>
//       <div>
//         <div className="indexBanner_imgwrap">
//           <img src="./index_images/main_banner_05.jpg" alt="" />
//         </div>

//         <div className="indexBanner_text_area">
//           <h2 className="pb-3">食在安心。</h2>
//           <p>
//             ローズウッド仕上げの⽊製キャビネット
//             <br />
//             オンラインストア限定
//           </p>
//         </div>
//       </div>
//     </>
//   )
// }

export default class Fade extends Component {
    render() {
        const settings = {
            dots: true,
            fade: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
        };
        return (
            <div>
                <Slider {...settings}>
                    <div>
                        <div className="indexBanner_imgwrap">
                            <img
                                src="/images/index_images/main_banner_05.jpg"
                                alt=""
                            />
                        </div>

                        <div className="indexBanner_text_area">
                            <h2 className="pb-3">食在安心</h2>
                            <p>
                                體現出對於有機食材的堅持，
                                <br />
                                讓客戶能有一個更健康、更安心的選擇。
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="indexBanner_imgwrap">
                            <img
                                src="/images/index_images/main_banner_04.jpg"
                                alt=""
                            />
                        </div>

                        <div className="indexBanner_text_area">
                            <h2 className="pb-3">食在安心</h2>
                            <p>
                                體現出對於有機食材的堅持，
                                <br />
                                讓客戶能有一個更健康、更安心的選擇。
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="indexBanner_imgwrap">
                            <img
                                src="/images/index_images/main_banner_03.jpg"
                                alt=""
                            />
                        </div>

                        <div className="indexBanner_text_area">
                            <h2 className="pb-3">食在安心</h2>
                            <p>
                                體現出對於有機食材的堅持，
                                <br />
                                讓客戶能有一個更健康、更安心的選擇。
                            </p>
                        </div>
                    </div>

                    <div>
                        <div className="indexBanner_imgwrap">
                            <img
                                src="/images/index_images/main_banner_02.jpg"
                                alt=""
                            />
                        </div>

                        <div className="indexBanner_text_area">
                            <h2 className="pb-3">食在安心</h2>
                            <p>
                                體現出對於有機食材的堅持，
                                <br />
                                讓客戶能有一個更健康、更安心的選擇。
                            </p>
                        </div>
                    </div>
                </Slider>
            </div>
        );
    }
}

// export default IndexBanner
