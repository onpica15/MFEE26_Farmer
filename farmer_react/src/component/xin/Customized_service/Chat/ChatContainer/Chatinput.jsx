import React from 'react';
// import 'emoji-mart/css/emoji-mart.css';
// import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import useOutsideClick from './hooks/useOutsideClick';

const ChatInput = ({ message, setMessage, sendMessage, selectFile }) => {
    const { showEmoji, setShowEmoji, ref } = useOutsideClick(false);
    const handleEmojiShow = () => {
        setShowEmoji((v) => !v);
    };
    const handleEmojiSelect = (e) => {
        setMessage((message) => (message += e.native));
    };

    return (
        <div className="mt-auto align-items-end border-info py-3 px-4 border-top d-lg-block chat-input">
            <div className="input-group flex-fill ">
                <input
                    type="text"
                    className="form-control xin-btn-nofocus"
                    name="message"
                    value={message}
                    placeholder="請輸入訊息"
                    onChange={({ currentTarget: input }) =>
                        setMessage(input.value)
                    }
                    onKeyPress={(e) =>
                        e.code === 'Enter' ? sendMessage() : null
                    }
                />
                <label htmlFor="file-input">
                    <div className="btn xin-btn-nofocus">
                        <img
                            src="/images/uploadimgicon.png"
                            alt="file"
                            className="emojistyle"
                        />
                    </div>
                </label>
                <input
                    style={{ display: 'none' }}
                    type="file"
                    id="file-input"
                    className="file-input"
                    onChange={selectFile}
                />
                <button
                    className="btn xin-btn-nofocus"
                    type="button"
                    onClick={handleEmojiShow}
                >
                    <img
                        src="/images/emojiIcon.png"
                        alt="emoji"
                        className="emojistyle"
                    />
                </button>
                <button
                    className="btn btn-info xin-btn-nofocus"
                    onClick={() => sendMessage()}
                >
                    送出
                </button>
            </div>
            <div>
                {showEmoji && (
                    <div className="emoji-area" ref={ref}>
                        <Picker
                            onEmojiSelect={handleEmojiSelect}
                            emojiSize={20}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatInput;
