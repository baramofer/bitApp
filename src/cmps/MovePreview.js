import React from 'react';
import Moment from 'react-moment';

const MovePreview = ({move, btcToUsdRate}) => {
    const dateToFormat = (move.at);
    return (
        <div className="move-preview" >
            <div className="trans-from">To {move.to.charAt(0).toUpperCase()+move.to.substring(1,move.to.length)}</div>
            <div className="trans-amount">B {move.amount} | <span className="usd-amount">$ {parseInt(btcToUsdRate*move.amount).toLocaleString('en')}</span></div>
            <div className="stat">status : <span className="stat-opt">approve</span></div>
            <div className="sent-at"><Moment>{dateToFormat}</Moment></div>
        </div>
    )
}
export default MovePreview;