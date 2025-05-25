import React from "react"
import Die from "./Die.jsx"
import {nanoid} from "nanoid"
import { useWindowSize } from 'react-use'
import {useRef, useEffect} from "react"
import Confetti from "react-confetti"

export default function App() {

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, gameWon);

    const [diceArray, setDiceArray] = React.useState(() => generateAllNewDice());

    var gameWon = diceArray.every(dice => dice.isHeld) && diceArray.every(dice => dice.value === diceArray[0].value);

    function generateAllNewDice() {
        return new Array(10)
        .fill(0)
        .map(() => ({
            value : Math.ceil(Math.random()*6),
            isHeld : false,
            id : nanoid()
        }));
    }

    function hold(id) {
        setDiceArray(prev => prev.map(entry => {
            return entry.id === id ? {...entry, isHeld : !entry.isHeld} : entry;
        }))
    }

    const dice = diceArray.map(entry => (
        <Die key = {entry.id} id = {entry.id} value = {entry.value} isHeld = {entry.isHeld} clickHandler = {hold}/>
    ))

    function changeDice() {

        if (gameWon === true){
            setDiceArray(generateAllNewDice());
        } else {
            setDiceArray(prev => prev.map(entry => {
                if (entry.isHeld === false){
                    return {...entry, value : Math.ceil(Math.random()*6)}
                }
                return entry;
            }))
        }
    }

    const {width, height} = useWindowSize();

    return (
        <main>
            {gameWon && <Confetti width={width} height={height} />}
            <h1>Tenzies</h1>
            <div className="buttonsDiv">
                {dice}
            </div>
            <button ref = {inputRef} className="rollDice" onClick={changeDice}>{gameWon === true ? "New Game" : "Roll"}</button>
        </main>
    )
}