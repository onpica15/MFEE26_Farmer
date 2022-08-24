import { useEffect, useState } from 'react';
import './Game.css';
import Card from './Card.js';
import axios from 'axios';

const initialCards = [
    { src: '/game-images/bulbasaur.png', matched: false },
    { src: '/game-images/butterfree.png', matched: false },
    { src: '/game-images/charmander.png', matched: false },
    { src: '/game-images/pidgeotto.png', matched: false },
    { src: '/game-images/pikachu.png', matched: false },
    { src: '/game-images/squirtle.png', matched: false },
];

function Game(props) {
    const [cards, setCards] = useState([]);
    const [turn, setTurn] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [startFlip, setStartFlip] = useState(true);
    const loginUser = JSON.parse(localStorage.getItem('auth'));

    // const loginUser = JSON.parse(localStorage.getItem("auth"))

    const Swal = require('sweetalert2');
    //解構蛋的點數
    const { eggpoints, setEggPoints } = props;
    //跳轉頁面時候先看盤子
    useEffect(() => {
        setTimeout(() => {
            setStartFlip(false);
        }, 1500);
        shuffleCards();
    }, []);

    function shuffleCards() {
        //setCards(null)
        const shuffledCards = [...initialCards, ...initialCards]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));

        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setTurn(0);
        setDisabled(false);
        setStartFlip(true);
        setTimeout(() => {
            setStartFlip(false);
        }, 1000);
    }

    function handleChoice(card) {
        choiceOne
            ? choiceOne.id !== card.id && setChoiceTwo(card)
            : setChoiceOne(card);
    }

    function resetTurn() {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurn((prevTurn) => prevTurn + 1);
        setDisabled(false);
    }

    function checkwin() {
        const nowpoints = eggpoints - 5;
        Swal.fire({
            title: '是否花費5點繼續搶點?',
            // text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '搶起來!',
        }).then((result) => {
            if (result.isConfirmed) {
                //確認是否花費點數再翻一次
                if (eggpoints >= 5) {
                    setEggPoints(eggpoints - 5);
                    setTurn(0);
                    shuffleCards();
                    axios
                        .post('http://localhost:3600/game/addpoints', {
                            change_points: nowpoints,
                            change_memberid: loginUser.customer_id,
                        })
                        .then((result) => {
                            console.log(result.data);
                        });
                    Swal.fire('Good luck!', '已完成扣點.', 'success');
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: '點數不足!',
                        //footer: '<a href="">試試搶點</a>',
                    });
                }
            }
        });
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setEggPoints(eggpoints + 2);
                // Swal.fire('搶到2點')
                axios
                    .post('http://localhost:3600/game/addpoints', {
                        change_points: eggpoints + 2,
                        change_memberid: loginUser.customer_id,
                    })
                    .then((result) => {
                        console.log(result.data);
                    });
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });
                resetTurn();
            } else {
                setTimeout(() => {
                    resetTurn();
                }, 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    return (
        <div className="game-container po_couponspace">
            <p className="gametext">Turns: {turn}</p>
            <div className="game-grid">
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={
                            card === choiceOne ||
                            card === choiceTwo ||
                            card.matched ||
                            startFlip
                        }
                        disabled={disabled}
                        matched={card.matched}
                        checkwin={checkwin}
                        turn={turn}
                        eggpoints={eggpoints}
                        setEggPoints={setEggPoints}
                    />
                ))}
            </div>
            {/* <button onClick={shuffleCards}>New Game</button> */}
            <button onClick={checkwin}>New Game</button>
        </div>
    );
}

export default Game;
