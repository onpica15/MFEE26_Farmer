import Marquee from 'react-fast-marquee';
import './MarqueeSliderR.css';

const MarqueeSliderR = () => {
    // https://www.npmjs.com/package/react-fast-marquee 

    const settings = {
        pauseOnClick: true,
        direction: 'right',
        speed: 20,
        delay: 0,
        loop: 0,
        gradient: true,
        gradientWidth: 100,
    };

    return (
        <>
            <Marquee {...settings}>
                <div className="slider d-flex">
                    <div className="Marquee_img_wrap">
                        <img src="/images/index_images/farmerpic_11.jpg" alt="" />
                    </div>
                    <div className="Marquee_img_wrap">
                        <img src="/images/index_images/farmerpic_12.jpg" alt="" />
                    </div>
                    <div className="Marquee_img_wrap">
                        <img src="/images/index_images/farmerpic_13.jpg" alt="" />
                    </div>
                    <div className="Marquee_img_wrap">
                        <img src="/images/index_images/farmerpic_14.jpg" alt="" />
                    </div>
                    <div className="Marquee_img_wrap">
                        <img src="/images/index_images/farmerpic_15.jpg" alt="" />
                    </div>
                    <div className="Marquee_img_wrap  mx-auto">
                        <img src="/images/index_images/farmerpic_16.jpg" alt="" />
                    </div>
                    <div className="Marquee_img_wrap">
                        <img src="/images/index_images/farmerpic_17.jpg" alt="" />
                    </div>
                    <div className="Marquee_img_wrap">
                        <img src="/images/index_images/farmerpic_18.jpg" alt="" />
                    </div>
                    <div className="Marquee_img_wrap">
                        <img src="/images/index_images/farmerpic_19.jpg" alt="" />
                    </div>
                    <div className="Marquee_img_wrap">
                        <img src="/images/index_images/farmerpic_20.jpg" alt="" />
                    </div>
                </div>
            </Marquee>
        </>
    );
};

export default MarqueeSliderR;
