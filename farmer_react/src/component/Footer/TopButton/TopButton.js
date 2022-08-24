import React from "react";
import { FaArrowUp } from "react-icons/fa";
import "./TopButton.css";
import { useEffect, useState } from "react";

const TopButton = () => {
    const [BackToTop, setBackToTop] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setBackToTop(true);
            } else {
                setBackToTop(false);
            }
        });
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {BackToTop && (
                <div className="TopButton" onClick={scrollUp}>
                    <FaArrowUp />
                </div>
            )}

            {/* <div className="TopButton" onClick={scrollUp}>
                <FaArrowUp />
            </div> */}
        </>
    );
};

export default TopButton;
