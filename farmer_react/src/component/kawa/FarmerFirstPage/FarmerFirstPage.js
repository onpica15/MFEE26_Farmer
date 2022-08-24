// import logo from './logo.svg';
// import './App.css';

import IndexBanner from './IndexBanner/IndexBanner';
import News from './News/News';
import ContactUs from './ContactUs/ContactUs';
import AboutUs from './AboutUs/AboutUs';

function FarmerFirstPage() {
    return (
        <>
            <div className="firstPagePadding">
                <IndexBanner />
                <AboutUs />
                <News />
                <ContactUs />
                {/* <TopButton /> */}
            </div>
        </>
    );
}

export default FarmerFirstPage;
