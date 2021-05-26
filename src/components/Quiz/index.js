import React, {Component, Fragment } from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { FaChevronRight } from 'react-icons/fa';
import { QuizMarvel } from '../QuizMarvel';
import Levels from '../Levels';
import ProgressBar from '../ProgressBar';
import QuizOver from '../QuizOver';



toast.configure();
//const levelNames = ["debutant", "confirme", "expert"];

class Quiz extends Component {
    constructor(props) {
        super(props)
        this.initialState = {
            levelNames : ["debutant", "confirme", "expert"],
            quizLevel : 0,
            maxQuestions: 10,
            storedQuestions:[],
            question:null,
            options:[],
            idQuestion: 0,
            disabled:true,
            userAnswer: null,
            score: 0,
            showWelcomeMsg:false,
            quizEnd:false
        }
        this.state = this.initialState;
        this.storedDataRef = React.createRef();
    }
    
   

    

  

    loadQuestions = Level =>{
        const fetchedArrayQuiz = QuizMarvel[0].quizz[Level];
        if(fetchedArrayQuiz.length >= this.state.maxQuestions){

            this.storedDataRef.current = fetchedArrayQuiz;
            
            const newArray = fetchedArrayQuiz.map(({ answer,...keepRest}) => keepRest );
            this.setState({
                storedQuestions: newArray
            })
        }
    }

    componentDidMount(){
        this.loadQuestions(this.state.levelNames[this.state.quizLevel])
    }
    componentDidUpdate(prevProps,prevState){
        if((this.state.storedQuestions !== prevState.storedQuestions) && this.state.storedQuestions.length){
            this.setState( {
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options
            })
        }

        if((this.state.idQuestion !== prevState.idQuestion) && this.state.storedQuestions.length){

          
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                disabled:true

            })
        }
        if(this.state.quizEnd !== prevState.quizEnd){

            const gradepercent = this.getPercentage(this.state.maxQuestions, this.state.score);

            this.gameOver(gradepercent);
        }
        /*************
         * * On recupere le pseudo pour l'afficher
         *************/
        if(this.props.userData.pseudo !== prevProps.userData.pseudo){
           // console.log(this.props.userData.pseudo)
            this.showToastMsg(this.props.userData.pseudo)
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
           
            this.setState({
                quizEnd:true
            })
        }else{
            this.setState(prevState => ({
                idQuestion : prevState.idQuestion + 1
            }))
           
        }

        const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer;

        if(this.state.userAnswer === goodAnswer){
            this.setState(prevState => ({
                score: prevState.score + 1
            }))
            toast.success(`Bravo +1`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                
                });
        }else{
            toast.error(`Raté 0`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                
                });
        }

    }
    showToastMsg = pseudo => {
        if(!this.state.showWelcomeMsg){
            this.setState({
                showWelcomeMsg:true
            })
            toast.warn(`Bienvenue  ${pseudo}, et bonne chance!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                bodyClassName: "toastify-color"
                
                });
        }
    }

    getPercentage = (maxQuest,ourScore) =>( ourScore / maxQuest)*100;

    gameOver = percent =>{


        if(percent >= 50){
            this.setState({
                quizLevel: this.state.quizLevel +1 ,
                percent
            })
        }else{
            this.setState({percent})
        }
     
    }
    loadLevelQuestions = param =>{
        this.setState({...this.initialState, quizLevel: param})
        this.loadQuestions(this.state.levelNames[param]);
    }

    render(){
        // console.log(this.props.userData)
        const displayOption = this.state.options.map((option, index)=>{
            return (
                <p key={index}
                className={`answerOptions  ${this.state.userAnswer === option ? "selected" : null}`}
                onClick={()=> this.submitAnswer(option)}
                >
                <FaChevronRight />   {option}
                </p>
                )
        })
        return this.state.quizEnd ? (
            <QuizOver
                ref={this.storedDataRef} 
                levelNames={this.state.levelNames}
                score={this.state.score}
                maxQuestions={this.state.maxQuestions}
                quizLevel={this.state.quizLevel}
                percent={this.state.percent}
                loadLevelQuestions={this.loadLevelQuestions}               
            />
        )
        :
        (
            <Fragment>
                <Levels 
                    levelNames={this.state.levelNames}
                    quizLevel={this.state.quizLevel}
                />
                <ProgressBar 
                    idQuestion={this.state.idQuestion}
                    maxQuestions={this.state.maxQuestions}
                />
                <h2>{this.state.question}</h2>
                {displayOption}
                <button
                    disabled={this.state.disabled} 
                    className="btnSubmit"
                    onClick={()=> this.nextQuestion()}
                    >
                    {this.state.idQuestion < this.state.maxQuestions-1 ? "Suivant":"Terminer"}
                </button>
            </Fragment>
        )
       
    }
}

export default Quiz
