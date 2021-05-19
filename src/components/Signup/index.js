import React , {useState} from 'react'

const Singup = () => {
    const data ={
        pseudo: "",
        email: "",
        password:'',
        confirmPassword:''
    }
    const [loginData, setloginData] = useState(data)
    const handleChange = e =>{
        setloginData({...loginData, [e.target.id]: e.target.value});
        
    }
   
    const {pseudo,email,password,confirmPassword} = loginData;
    const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword
    ? <button disabled> Inscription </button> : <button> Inscription </button>;

    return (
        <div className="singUpLoginBox">
            <div className="slContainer">
                <div className='formBoxLeftSignup'>
                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        <h2>Inscription</h2>
                        <form>
                            <div className='inputBox'>
                                <input onChange={handleChange} value={pseudo} type='text' id='pseudo' autoComplete='off' required />
                                <label htmlFor="pseudo">Pseudo</label>                              
                            </div>
                            <div className='inputBox'>
                                <input onChange={handleChange} value={email} type='email' id='email' autoComplete='off' required />
                                <label htmlFor="email">Email</label>                          
                            </div>
                            <div className='inputBox'>
                                <input onChange={handleChange} value={password} type='password' id='password' autoComplete='off' required />
                                <label htmlFor="password">Mot de passe</label>                              
                            </div>
                            <div className='inputBox'>
                                <input onChange={handleChange} value={confirmPassword} type='password' id='confirmPassword' autoComplete='off' required />
                                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>                              
                            </div>
                            {btn}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Singup
