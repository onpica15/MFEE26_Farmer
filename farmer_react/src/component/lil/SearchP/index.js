import React, { useRef, useEffect, useState } from 'react';
import styles from './SearchP.module.css';
import { GoSearch } from 'react-icons/go';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '../../../hooks';
import { clearHashTag } from '../../../store/slices/product';
import { useDispatch } from 'react-redux';

function SearchP(searchProduct) {
    const inputRef = useRef();
    const dispatch = useDispatch();
    const query = useQuery();
    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState();
    const search = query['search'];

    const handleChange = (e) => {
        const value = e.target.value;
        setValue(value);
    };

    const handleRootClicked = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleIconClicked = (e) => {
        e.stopPropagation();
        console.log('click on icon');

        const q = {
            ...query,
            page: 1,
            search: value,
        };
        delete q.type;

        setSearchParams(q);
        dispatch(clearHashTag());
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const q = {
                ...query,
                page: 1,
                search: value,
            };
            delete q.type;

            setSearchParams(q);
            dispatch(clearHashTag());
        }
    };
    useEffect(() => {
        if (search) {
            setValue(search);
        }
    }, [search]);

    return (
        <>
            <div className={styles.search} onClick={handleRootClicked}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="水蜜桃 鮭魚 和牛..."
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <span className={styles.icon} onClick={handleIconClicked}>
                    <GoSearch size={20} />
                </span>
            </div>
        </>
    );
}

export default SearchP;
