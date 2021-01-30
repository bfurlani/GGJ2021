import React, { useState } from 'react'
import {keyHandler, KEYPRESS} from 'react-key-handler'

function handleKeyPress({keyValue}){
    return(
        <div>
            {keyValue === 'd' && (
                <ol>
                    <li>hello</li>
                    <li>world</li>
                </ol>
            )}
        </div>
    );
}

export default keyHandler({keyEventName: KEYPRESS, keyValue: 'd'})(handleKeyPress);