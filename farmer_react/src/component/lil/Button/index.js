import { useState } from 'react';
import styles from './Button.module.css';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
// classes = { button, active }
// example:
// <Button classes={{ button: 'anotherClass', active: 'anotherClass' }}>
//   My Btn
// </Button>

function Button(props) {
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();

    const goToPath = (sid) => {
        console.log(props.sid);
        navigate(`/recipe/each/${props.sid}`);
    };

    return (
        <>
            <button
                type="submit"
                className={clsx(styles.brown, styles.btn, {
                    [styles.brown_active]: clicked,
                })}
                onClick={() => {
                    setClicked(!clicked);
                    goToPath();
                }}
            >
                {props.name}
            </button>
        </>
    );
}

export default Button;
