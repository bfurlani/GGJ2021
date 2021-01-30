import React, { useEffect, useState } from 'react'
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

    let images = [sprite_running_1, sprite_running_2, sprite_running_3, sprite_running_4, sprite_running_5, sprite_running_6, sprite_running_7, sprite_running_8]

    const [currentImage, setCurrentImage] = useState (() => {
        return images[0]
    })

    const runningRight = useKeyPress('d')

    useEffect(()=>{
        beginRun()
    })

    return (
        <div>
            <img src={currentImage} alt="F" />
            {runningRight && <img src={currentImage} alt="F" />}
        </div>
    )

    function beginRun(){
        let counter = 0
        setTimeout(()=>{
            counter++
        }, 500)

        setCurrentImage(images[counter])
    }
}

export default Character;