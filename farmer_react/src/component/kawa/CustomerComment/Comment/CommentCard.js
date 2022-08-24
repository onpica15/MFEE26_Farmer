import React from 'react';
import './CommentCard.css';

const CommentCard = () => {
    return (
        <>
            <div className="container">
                <div className="CommentCard d-flex col-6">
                    {/* ----------- */}
                    <div className="CommentCard_imgwrap me-3">
                        <img src="./images/avatar_cat.jpg" alt="" />
                    </div>
                    {/* ----------- */}
                    <div>
                        <div className="d-flex">
                            <p className="CommentCardAccount pe-3">thor69758</p>
                            <p className="CommentCardTime">
                                2022/5/23 下午2:30:59
                            </p>
                        </div>

                        <p className="CommentContext">
                            包裝很仔細，外送大哥也很親切，會推薦親朋好友來買的
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CommentCard;
