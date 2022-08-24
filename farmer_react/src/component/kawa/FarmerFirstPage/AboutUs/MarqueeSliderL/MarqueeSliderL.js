import Marquee from 'react-fast-marquee';
import './MarqueeSliderL.css';

const MarqueeSliderL = () => {
    // https://www.npmjs.com/package/react-fast-marquee 

    const settings = {
        pauseOnClick: true,
        direction: 'left',
        speed: 20,
        delay: 0,
        loop: 0,
        gradientWidth: 100,
    };

    return (
        <>
            <Marquee {...settings}>
                <div className="slider d-flex">
                    <div className="Marquee_img_wrap">
                        <img src="/images/index_images/farmerpic_01.jpg" alt="" />
                    </div>
                    <div className="Marquee_img_wrap">
                        <img src="/images/index_images/farmerpic_02.jpg" alt="" />
                    </div>
                    <div className="Marquee_img_wrap">
                        <img src="/images/index_images/farmerpic_03.jpg" alt="" />
                    </div>
                    <div className="Marquee_img_wrap">
                        <img src="/images/index_images/farmerpic_04.jpg" alt="" />
                    </div>
                    <div className="Marquee_img_wrap">
                        <img src="/images/index_images/farmerpic_05.jpg" alt="" />
                    </div>
                    <div className="Marquee_img_wrap  mx-auto">
                        <img src="/images/index_images/farmerpic_06.jpg" alt="" />
                    </div>
                    <div className="Marquee_img_wrap">
                        <img src="/images/index_images/farmerpic_07.jpg" alt="" />
                    </div>
                    <div className="Marquee_img_wrap">
                        <img src="/images/index_images/farmerpic_08.jpg" alt="" />
                    </div>
                    <div className="Marquee_img_wrap">
                        <img src="/images/index_images/farmerpic_09.jpg" alt="" />
                    </div>
                    <div className="Marquee_img_wrap">
                        <img src="/images/index_images/farmerpic_10.jpg" alt="" />
                    </div>
                </div>
            </Marquee>
        </>
    );
};

export default MarqueeSliderL;
