import React, { useEffect, useRef } from 'react';

const ChatBody = ({ user, messages }) => {
    const scroll = useRef();
    //滾動到最後訊息
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // if (message.type === 'file') {
    //     console.log(123);

    //     return (
    //         <div>
    //             <Uploadimages fileName={message.fileName} blob={blob} />
    //         </div>
    //     );
    // }
    return (
        <div
            style={{ overflowY: 'scroll' }}
            className="position-relative overflow-auto chat-height "
        >
            <div className="p-4 d-flex flex-column">
                {messages.map((message, index) => {
                    console.log(message);
                    return message.type === 'file' ? (
                        <div
                            key={index}
                            className={
                                message.userId === user.userId
                                    ? 'chat-message-right mb-4 xin-bg-color bg-gradient rounded'
                                    : 'chat-message-left mb-4 bg-light rounded'
                            }
                        >
                            <img
                                style={{ width: 250, height: 'auto' }}
                                src={message.content}
                                alt=""
                            />
                        </div>
                    ) : (
                        <div
                            key={index}
                            className={
                                message.userId === user.userId
                                    ? 'chat-message-right mb-4 xin-bg-color bg-gradient rounded'
                                    : 'chat-message-left mb-4 bg-light rounded'
                            }
                        >
                            <div
                                className="flex-shrink-1  py-2 px-3 ml-3"
                                ref={scroll}
                            >
                                {message.message.includes('http') ? (
                                    <a href={message.message}>
                                        {message.message}
                                    </a>
                                ) : (
                                    message.message
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ChatBody;
