import React, {Fragment} from 'react';

const ProgressBar = () => {
    return (
        <Fragment>
            <div className="percentage">
                <div className='progressPercent'>Question: 1/10</div>
                <div className='progressPercent'>Progress: 10%</div>
                <div className='progressPercent'>
                    <div className="progressBarChange" style={{width: '10%'}}></div>
                </div>
            </div>
        </Fragment>
    )
}

export default ProgressBar
