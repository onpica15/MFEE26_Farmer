import React from 'react';
import { useParams } from 'react-router-dom';
import {
    LineShareButton,
    LineIcon,
    FacebookShareButton,
    FacebookIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    TelegramShareButton,
    TelegramIcon,
} from 'react-share';

function LineShare() {
    const { sid } = useParams();
    const location = document.location.origin;

    const shareUrl = `${location}/product/${sid}`;

    return (
        <>
            <LineShareButton
                url={shareUrl}
                title={'跟你分享'}
                style={{ marginRight: '10px' }}
            >
                <LineIcon size={32} round />
            </LineShareButton>
            <FacebookMessengerShareButton
                url={shareUrl}
                title={'跟你分享'}
                style={{ marginRight: '10px' }}
            >
                <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>
            <FacebookShareButton
                url={shareUrl}
                title={'跟你分享'}
                style={{ marginRight: '10px' }}
            >
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TelegramShareButton
                url={shareUrl}
                title={'跟你分享'}
                style={{ marginRight: '10px' }}
            >
                <TelegramIcon size={32} round />
            </TelegramShareButton>
        </>
    );
}
export default LineShare;
