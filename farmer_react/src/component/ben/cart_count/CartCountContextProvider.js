import CartCountContext from './CartCountContext';
import React, { useContext, useState, useEffect } from 'react';
import { CART_LIST_TOBUY } from './../../../config/ajax-path';

export default function CartCountContextProvider({ children }) {
    const [cartList, setCartList] = useState([]);
    const [render, setrender] = useState(0);

    const member_info_id = localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth')).customer_id
        : 500000000;

    let data = cartList;
    const getData = () => {
        // console.log(member_info_id);
        fetch(`${CART_LIST_TOBUY}`, {
            method: 'GET',
            headers: { member_id: `${member_info_id}` },
        })
            .then((r) => r.json())
            .then((obj) => {
                if (data !== obj) {
                    setCartList(obj);
                    setrender(render + 1);
                }
            });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <CartCountContext.Provider value={{ cartList, setCartList }}>
            {children}
        </CartCountContext.Provider>
    );
}
