import { useState } from 'react';
import { GrClose } from 'react-icons/gr';

const CloseButton = () => {
    const [ButtonClose, setButtonClose] = useState(false);
    return (
        <>
            <div className="CreateComment_closeBtn_BG">
                <GrClose
                    className="CreateComment_closeBtn"
                    size={40}
                    onClick={() => setButtonClose(true)}
                />
                <p trigger={ButtonClose} setButtonClose={setButtonClose}>
                    TEST
                </p>
            </div>
        </>
    );
};

export default CloseButton;
