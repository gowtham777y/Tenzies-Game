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

    const [diceArray, setDiceArray] = React.useState(generateAllNewDice());

    console.log(diceArray);

    const dice = diceArray.map(entry => (
        <Die key = {entry.id} value = {entry.value} isHeld = {entry.isHeld}/>
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