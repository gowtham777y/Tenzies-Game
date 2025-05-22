import React from "react"
import Die from "./Die.jsx"
import {nanoid} from "nanoid"

export default function App() {

    function generateAllNewDice() {
        return new Array(10)
        .fill(0)
        .map(() => ({
            value : Math.ceil(Math.random()*6),
            isHeld : true,
            id : nanoid()
        }));
    }

    function hold(id) {
        setDiceArray(prev => prev.map(entry => {
            if (entry.id === id){
                return {...entry, isHeld: !entry.isHeld}
            }
            return entry;
        }))
    }

    const [diceArray, setDiceArray] = React.useState(generateAllNewDice());

    const dice = diceArray.map(entry => (
        <Die key = {entry.id} id = {entry.id} value = {entry.value} isHeld = {entry.isHeld} clickHandler = {hold}/>
    ))

    function changeDice() {
        setDiceArray(generateAllNewDice());
    }

    return (
        <main>
            <div className="buttonsDiv">
                {dice}
            </div>
            <button className="rollDice" onClick={changeDice}>Roll</button>
        </main>
    )
}