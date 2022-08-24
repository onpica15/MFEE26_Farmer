import { useRef, useState, useEffect } from 'react';

const useOutsideClick = (initialValue) => {
    const ref = useRef(null);
    const [showEmoji, setShowEmoji] = useState(initialValue);
    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) setShowEmoji(false);
    };
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [ref]);
    return { showEmoji, setShowEmoji, ref };
};

export default useOutsideClick;
