import React ,{useEffect, useState}from 'react'
import Stepper from 'react-stepper-horizontal';

const Levels = ({quizLevel,levelNames}) => {

    const [levels, setLevels] =useState([])
    useEffect(() => {
      const quizSteps =  levelNames.map(level=> ({title :level.toUpperCase()}))
      setLevels(quizSteps)
    }, [levelNames]);
    console.log(levels)
    return (
        <div style={{backgroundColor:"transparent"}} className="levelsContainer">
           
             <Stepper steps={ levels}
            activeStep={ quizLevel } 
            circleTop={0}
            activeTitleColor={'#d31017'}
            activeColor={'#d31017'}/>
    
        </div>
    )
}

export default React.memo(Levels)
