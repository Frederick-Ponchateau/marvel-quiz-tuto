import React, {Fragment,useEffect,useState} from 'react';
import {GiTrophyCup, GiTrunkMushroom} from 'react-icons/gi';
import Loader from '../Loader/Loader';
import Modal from '../Modal';
import axios from 'axios';

const QuizOver = React.forwardRef((props,ref) => {
  
    const {
        levelNames, 
        score,
        maxQuestions,
        quizLevel,
        percent,
        loadLevelQuestions 
    }=props;

    const [asked, setasked] = useState([]);

    const [openMdl, setOpenMdl] = useState(false);

    const [characterInfos, setcharacterInfos] = useState([]);

    const [loading, setLoading] = useState(true);

    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
console.log(API_PUBLIC_KEY)
    const hash= 'b8039d0de02501550a6171ecf624e854';

    console.log(asked)

    useEffect(()=>{
        setasked(ref.current)
    },[ref])

    const showModal = id => {
        setOpenMdl(true);

        axios
        .get(`https://gateway.marvel.com/v1/public/characters/${id}?apikey=${API_PUBLIC_KEY}`)
        .then(response=>{
            setcharacterInfos(response.data);
            setLoading(false);
        })
        .catch(error => {console.log(error)})
    }

    const hideModal = () => {
        setOpenMdl(false);
        setLoading(true);
    }

    const averageGrade = maxQuestions/2;

    if(score < averageGrade){
        setTimeout(()=> loadLevelQuestions(quizLevel),3000);
    }

    const decision = score >= averageGrade ? (
        <Fragment>
            <div className="stepsBtnContainer">
                {
                    
                    quizLevel < levelNames.length ?(
                        <Fragment>
                            <p className="successMsg">Bien joué ,passez au niveau suivant !</p>
                            <button 
                                className="btnResult success"
                                onClick={() => loadLevelQuestions(quizLevel)}
                            >
                                Niveau Suivant
                            </button>
                        </Fragment>
                    ):
                    (
                        <Fragment>
                            <p className="successMsg">
                                <GiTrophyCup size='50px'/>
                                Bien joué , vous êtes un expert !
                                
                            </p>
                            <button 
                                className="btnResult gameOver"
                                onClick={() => loadLevelQuestions(0)}
                            >
                                Accueil
                            </button>
                        </Fragment>
                    )
                }
            </div>
            <div className ="percentage">
                <div className="progressPercent">Réussite: {percent} % </div>
                <div className="progressPercent">Note : {score}/{maxQuestions} </div>
            </div>
        </Fragment>
    )
    :
    (
        <Fragment>
             <div className="stepsBtnContainer">              
                <p className="failureMsg">Vous avez échoué !</p>               
            </div>
            <div className ="percentage">
                <div className="progressPercent">Réussite: {percent} % </div>
                <div className="progressPercent">Note : {score}/{maxQuestions} </div>
            </div>
        </Fragment>
    )
    const questionAnswer =    
    score >= averageGrade ? (
        asked.map(question=>{
            return (
                <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>
                        <button 
                        className="btnInfo"
                        onClick={() => showModal(question.heroId)}
                        >
                            Infos
                        </button>
                    </td>
                </tr>
            )
        })
    )
    :
    (
        <tr>           
            <td colSpan="3">
                <Loader loadingMsg={"Pas de réponses!"}
                styling={{ 
                    textAlign:'center',
                    color:"red"
                }}/>
            </td>
        </tr>
    )
    const resultInModal = !loading ? 
    (
        <Fragment>
            <div className="modalHeader">
                <h2>{characterInfos.data.results[0].name}</h2>
            </div>
            <div className="modalBody">
                <h3>Titre 2</h3>
            </div>
            <div className="modalFooter">
                <button className="modalBtn">Fermer</button>
            </div>
        </Fragment>
    ) 
    :
    (
        <Fragment>
        <div className="modalHeader">
            <h2>Réponses de Marvel...</h2>
        </div>
        <div className="modalBody">
            <Loader loadingMsg={"Pas de réponses!"}
                styling={{ 
                    textAlign:'center',
                    color:"red"
                }}
            />
        </div>
       
    </Fragment>
    )  
    return (
        <Fragment>
           
               {decision}
            
            
            <hr/>
            <p>Les reponses aux questions posées:</p>
            <div className="answerContainer">
                <table className="answers">
                <thead>
                        <tr>
                            <th>Questions</th>
                            <th>Réponses</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionAnswer}
                    </tbody>
                </table>
            </div>
            <Modal showModal={openMdl} hideModal={hideModal}>
               {resultInModal}
            </Modal>
        </Fragment>
    )
})

export default React.memo(QuizOver)
