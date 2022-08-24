import { async } from 'emoji-mart';
import { data } from 'jquery';
import React, { useRef } from 'react';
import './ContactUs.css';
// import emailjs from '@emailjs/browser';

export const ContactUs = () => {
    // const form = useRef();

    // const sendEmail = (e) => {
    //     e.preventDefault();

    //     emailjs
    //         .sendForm(
    //             'kawa', //Gmail /Service ID
    //             'template_dq55ygg', //Email Templates /Templates ID
    //             form.current,
    //             '56_l3kJvCZE4gQUlM' //API keys /Public Key
    //         )
    //         .then(
    //             (result) => {
    //                 console.log(result.text);
    //                 console.log('message send');
    //             },
    //             (error) => {
    //                 console.log(error.text);
    //             }
    //         );
    //     e.target.reset();
    // };

    const sendMail = async () => {
        const r = await fetch('http://localhost:3600/comment/subscribe', {
            method: 'post',
        });
        const obj = await r.json();
        console.log(obj);
    };

    return (
        // <form ref={form} onSubmit={sendEmail}>

        <div className="ContactUs_section">
            <h2 className="mb-3">訂閱我們 / Subscribe</h2>
            <h5 className="mb-5">已追蹤更多消息!</h5>

            <div className="ContactUs_input_area">
                <input placeholder="請輸入信箱......" name="message" />
                <button type="button" className="sendButton" onClick={sendMail}>
                    送出
                </button>
            </div>
        </div>
    );
};

export default ContactUs;
