import React from 'react';

const ChatHeader = ({ user }) => {
    return (
        <div className="align-items-start py-2 px-4 w-100 border-bottom border-info d-lg-block sticky-top bg-white">
            <div className="d-flex align-items-center py-1">
                <div className="position-relative">
                    <img
                        src={
                            user.username === '管理員'
                                ? 'logo/fresh_LOGO_icon.svg'
                                : 'images/user.png'
                        }
                        className="rounded-circle mx-2"
                        alt={user.username}
                        width="40"
                        height="40"
                    />
                </div>
                <div className="flex-grow-1">
                    <strong>{user.username}</strong>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;
