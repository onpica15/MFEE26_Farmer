import './cardgame.css';

function Card(props) {
    const { eggpoints, setEggPoints } = props;
    const Swal = require('sweetalert2');

    function handleChoice() {
        if (!props.disabled) {
            if (props.turn >= 5) {
                Swal.fire({
                    title: '今日已完成搶點',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown',
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp',
                    },
                });
                //props.checkwin();
            } else {
                props.handleChoice(props.card);
                // console.log(props);
            }
        }
    }

    return (
        <div className="game-card">
            <div className={props.flipped ? 'flipped' : ''}>
                <img
                    className={`front ${props.card.matched ? 'matched' : ''}`}
                    src={props.card.src}
                    alt="card front"
                />
                <img
                    className="back"
                    src="/game-images/card_back.png"
                    alt="card back"
                    onClick={() => handleChoice()}
                />
            </div>
        </div>
    );
}

export default Card;
