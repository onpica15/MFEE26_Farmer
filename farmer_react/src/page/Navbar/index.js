import Nav from '../../component/Navbar/Nav';
import NavV2 from '../../component/Navbar_v2/Nav_v2';
import React from 'react';
import { useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();
    // const location = window.location.pathname;
    // return <>{location === `/` ? <Nav /> : <NavV2 />} </>;
    console.log(location);
    return <>{location.pathname === '/' ? <Nav /> : <NavV2 />} </>;
}

export default Navbar;
