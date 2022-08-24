import styles from './SearchForSupplier.module.css'
import { GoSearch } from 'react-icons/go'
import React, { useEffect, useRef, useState } from 'react'
import { useQuery } from '../../hooks'

function SearchForSupplier() {
    const inputRef = useRef()
    const [query, setQuery] = useQuery()
    const [value, setValue] = useState()
    const search = query['search']

    const handleChange = (e) => {
        const value = e.target.value
        setValue(value)
    }
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setQuery({
                page: 1,
                search: value,
            })
        }
    }

    function handleIconClicked(e) {
        e.stopPropagation()

        setQuery({
            page: 1,
            search: value,
        })
    }

    function handleRootClicked() {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    useEffect(() => {
        if (search) {
            setValue(search)
        }
    }, [search])

    return (
        <>
            <div className={styles.search} onClick={handleRootClicked}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="請輸入產品名"
                    value={value}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <span onClick={handleIconClicked} className={styles.icon}>
                    <GoSearch size={20} />
                </span>
            </div>
        </>
    )
}

//TODO: span Click

export default SearchForSupplier
