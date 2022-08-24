import React, { useState } from 'react';
import Select from 'react-select';
import styles from './PriceSelect.module.css';

const options = [
    { value: 1, label: '價格由低到高' },
    { value: 2, label: '價格由高到低' },
];

const customStyles = {
    control: () => ({
        // none of react-select's styles are passed to <Control />
        width: 200,
        height: 40,
        border: '1px solid #b3b3b3',
        display: 'flex',
        borderRadius: 20,
        paddingLeft: 12,
        marginBottom: 20,
        cursor: 'pointer',
    }),
    singleValue: (provided, state) => {
        return { ...provided, fontSize: 13 };
    },
    menu: (provided, state) => ({ ...provided, width: 180, fontSize: 13 }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'grey' : 'transparent',
        ':active': {
            backgroundColor: 'lightgrey',
        },
    }),
    placeholder: (provided, state) => ({ ...provided, fontSize: 14 }),
};

function PriceSelect({ value, onSelect }) {
    return (
        <Select
            styles={customStyles}
            value={value}
            onChange={onSelect}
            options={options}
            placeholder="請選擇"
        />
    );
}

export default PriceSelect;
