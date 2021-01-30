import React from 'react';
import './mapStyles/map.css'
function Block(){
    
    return(
        <div>
            <span className="block" onKeyDown={() =>handleKeyPress()}>Block</span>
        </div>
    );


}

export default Block;