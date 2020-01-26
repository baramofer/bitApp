import React from 'react';
import Scroll from '../cmps/Scroll'
import MovePreview from './MovePreview'


const MoveList = ({moves, btcToUsdRate, title}) => {
    if(moves.length === 0) {
        return (
            <ul className="moves-list-container" >
                <div className="last-moves">{title}</div>
                <div className="no-moves-msg">No moves to show</div>
            </ul>)
    } else{
       return (
            <ul className="moves-list-container" >
                <div className="last-moves">{title}</div>
                <Scroll height={'150px'}>
                    {moves.map((move, idx) => {
                        return (<li key={idx}><MovePreview move={move} btcToUsdRate={btcToUsdRate} /></li>)
                    })}
                </Scroll>
            </ul>)
    }
}
export default MoveList;