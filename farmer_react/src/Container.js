import React from 'react';
import './Main.css';

function Container({ children }) {
    return (
        <>
            <div className="main">{children}</div>
        </>
    );
}

export default Container;
