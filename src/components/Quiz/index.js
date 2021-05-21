import React, {Component} from 'react';
import {QuizMarvel} from '../QuizMarvel';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';

class Quiz extends Component {
    state = {
        levelNames: ["debutant", "confirme", "expert" ],
        quizLevel : 0,
        maxQuestions: 10,
        storedQuestions:[],
        question:null,
        options:[],
        idQuestion: 0,
        disabled:true,
        userAnswer: null
    }
    loadQuestions = Level =>{
        const fetchedArrayQuiz = QuizMarvel[0].quizz[Level];
        if(fetchedArrayQuiz.length >= this.state.maxQuestions){
            
            const newArray = fetchedArrayQuiz.map(({ answer,...keepRest}) => keepRest );
            this.setState({
                storedQuestions: newArray
            })
        }else{
            console.log("Pas assez de question")
        }
    }
    componentDidMount(){
        this.loadQuestions(this.state.levelNames[this.state.quizLevel])
    }
    componentDidUpdate(prevProps,prevState){
        if(this.state.storedQuestions !== prevState.storedQuestions){
            this.setState( {
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options
            })
        }
    }
    submitAnswer = seltectedAnswer => {
        this.setState({
            userAnswer: seltectedAnswer,
            disabled : false

        })
    }
    render(){
      
        const displayOption = this.state.options.map((option, index)=>{
            return (
                <p key={index}
                className={`answerOptions  ${this.state.userAnswer === option ? "selected" : null}`}
                onClick={()=> this.submitAnswer(option)}
                >
                    {option}
                </p>
                )
        })
        return (
            <div>
                <Levels/>
                <ProgressBar/>
                <h2>{this.state.question}</h2>
                {displayOption}
                <button disabled={this.state.disabled} className="btnSubmit">Suivant</button>
            </div>
         )
    }
}

export default Quiz
