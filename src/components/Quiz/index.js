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
        userAnswer: null,
        score: 0
    }

    storedDataRef = React.createRef();

    loadQuestions = Level =>{
        const fetchedArrayQuiz = QuizMarvel[0].quizz[Level];
        if(fetchedArrayQuiz.length >= this.state.maxQuestions){

            this.storedDataRef.current = fetchedArrayQuiz;
            
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

        if(this.state.idQuestion !== prevState.idQuestion){

            console.log('oulaaa')
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                disabled:true

            })
        }
    }
    submitAnswer = seltectedAnswer => {
        this.setState({
            userAnswer: seltectedAnswer,
            disabled : false

        })
    }
    nextQuestion =()=>{
        if(this.state.idQuestion === this.state.maxQuestions - 1){
            //end
        }else{
            this.setState(prevState => ({
                idQuestion : prevState.idQuestion + 1
            }))
            console.log('jesuila');
        }

        const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;

        if(this.state.userAnswer === goodAnswer){
            this.setState(prevState => ({
                score: prevState.score + 1
            }))
        }

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
                <button
                    disabled={this.state.disabled} 
                    className="btnSubmit"
                    onClick={()=> this.nextQuestion()}
                    >
                        Suivant
                    </button>
            </div>
         )
    }
}

export default Quiz
