import React, {useState , useEffect, useContext} from 'react'
import {Link} from 'react-router-dom';
import {FirebaseContext} from '../Firebase';




const Login = (props) => {

    const firebase = useContext(FirebaseContext);

    const [email,setEmail]= useState("");

    const [password, setPassword] = useState("");

    const [btn, setBtn] = useState(false);

    const [errorEmail,setErrorEmail]= useState('');
    const [errorPwd,setErrorPwd]= useState('');

   
   

    useEffect(() => {
        if( password.length > 5 && email !== ''){
            setBtn(true);
        }else if( btn){ 
            setBtn(false);
        }
    }, [email,password])
    const handleSubmit =  e =>{
        e.preventDefault();
        firebase.loginUser(email,password)
        .then(user => {
            setEmail("");
            setPassword('');
            props.history.push('/welcome');

        })
        .catch(error =>{
            
            if(error !== "" && error.code === "auth/user-not-found"){ 
                setEmail("");
                setPassword('');
                setErrorEmail(error);    
            }
            else if(error !== "" && error.code === "auth/wrong-password"){ 
                setPassword('');
                setErrorPwd(error);
                
        };
            
        })
    }

    
    return (
        <div className="sigUpLoginBox">
            <div className="slContainer">
            <div className='formBoxLeftLogin'>
                </div>
                <div className="formBoxRight">
                    <div className="formContent">

                    
                        <h2>Connexion</h2>
                        <form onSubmit={handleSubmit}>
                            
                            {errorEmail && <span>{errorEmail.message}</span>}
                            
                            <div className='inputBox'>
                                <input onChange={e => setEmail(e.target.value)} value={email} type='email' autoComplete='off' required />
                                <label htmlFor="email">Email</label>                          
                            </div>
                           
                            { errorPwd && <span>{errorPwd.message}</span>}
                            
                            <div className='inputBox'>
                                <input onChange={e => setPassword(e.target.value)} value={password} type='password' autoComplete='off' required />
                                <label htmlFor="password">Mot de passe</label>                              
                            </div>
                           
                            {btn? <button>Connexion</button>:<button disabled>Connexion</button>}
                       
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to='/signup'>Nouveau sur Marvel quiz inscrivez-vous.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
