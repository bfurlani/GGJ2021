import React, { useState } from 'react'
import sprite_running_1 from '../assets/png/Run (1).png'
import sprite_running_2 from '../assets/png/Run (2).png'
import sprite_running_3 from '../assets/png/Run (3).png'
import sprite_running_4 from '../assets/png/Run (4).png'
import sprite_running_5 from '../assets/png/Run (5).png'
import sprite_running_6 from '../assets/png/Run (6).png'
import sprite_running_7 from '../assets/png/Run (7).png'
import sprite_running_8 from '../assets/png/Run (8).png'

import {keyHandler, KEYPRESS} from 'react-key-handler'

function Character(){

    const [state, setState] = useState (() => {
        return "Something random"
    })

    return (
        <div>
            <img src={sprite_running_1} alt="Yeah image not there... buddy" />
        </div>
    )
}

export default Character;