import React, { useRef, useEffect, useState } from 'react';
import styles from './SearchC.module.css';
import { GoSearch } from 'react-icons/go';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '../../../../hooks';
import { clearHashTag } from '../../../../store/slices/product';
import { useDispatch } from 'react-redux';

function SearchP(searchComment) {
    const inputRef = useRef();
    const dispatch = useDispatch();
    const query = useQuery();
    const [searchParams, setSearchParams] = useSearchParams();
    const [value, setValue] = useState();
    const search = query['search'];

    const handleChange = (e) => {
        const value = e.target.value;
        // console.log(value);
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

        setSearchParams(q);
        // api/Comment.js會幫我處理搜尋or篩選出來的東西，
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const q = {
                ...query,
                page: 1,
                search: value,
            };

            setSearchParams(q);
            dispatch(clearHashTag());
        }
    };
    useEffect(() => {
        if (search) {
            setValue(search);
            // 渲染的地方 ↑ useeffect
            // 有搜尋的話就渲染
        }
    }, [search]);

    return (
        <>
            {/* <div className={styles.search} onClick={handleRootClicked}>
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
            </div> */}

            <div
                className="CommentSearch_area d-flex justify-content-center m-5"
                onClick={handleRootClicked}
            >
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="水蜜桃 鮭魚 和牛..."
                    value={value}
                    // ↑要補上的
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <button className="" onClick={handleIconClicked}>
                    搜尋
                </button>
            </div>
        </>
    );
}

export default SearchP;
