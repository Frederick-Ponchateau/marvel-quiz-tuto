import React, {Fragment} from 'react';



const ProgressBar = ({idQuestion , maxQuestions}) => {
    const getWidth = (totalQuestions, questionsId)=>{
        return (100 / totalQuestions) * questionsId;
    }
    const actualQuestion = idQuestion +1;
    const progressPercent = getWidth(maxQuestions,actualQuestion);
    //console.log(progressPercent);
    return (
        <Fragment>
            <div className="percentage">
                <div className='progressPercent'>{`Question: ${actualQuestion}/${maxQuestions}`}</div>
                <div className='progressPercent'>{`Progression : ${progressPercent}%`}</div>
                <div className='progressPercent'>
                    <div className="progressBarChange" style={{width: `${progressPercent}%`}}></div>
                </div>
            </div>
        </Fragment>
    )
}

export default React.memo(ProgressBar)
