import React, { useState } from 'react'
import useKeyPress from './keyPress'
import sprite_running_1 from '../assets/png/Run (1).png'
import sprite_running_2 from '../assets/png/Run (2).png'
import sprite_running_3 from '../assets/png/Run (3).png'
import sprite_running_4 from '../assets/png/Run (4).png'
import sprite_running_5 from '../assets/png/Run (5).png'
import sprite_running_6 from '../assets/png/Run (6).png'
import sprite_running_7 from '../assets/png/Run (7).png'
import sprite_running_8 from '../assets/png/Run (8).png'

function Character(){

    const [state, setState] = useState (() => {
        return "Something random"
    })

    const running = useKeyPress('d')

    return (
        <div>
            {running && setTimeout(() => {
                <div>Running</div>
            }, 1000)}
        </div>
    )
}

export default Character;