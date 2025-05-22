import React from "react"

export default function Die(props){
    
    return (
        <button style = {props.isHeld && {backgroundColor : "#59E391"}}
        onClick={() => props.clickHandler(props.id)}>{props.value}</button>
    )
}