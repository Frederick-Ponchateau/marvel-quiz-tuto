import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA1paKAoX2jh8Lf-DdLkXuTtHdY6ozMeM8",
    authDomain: "marvel-quiz-bb14f.firebaseapp.com",
    projectId: "marvel-quiz-bb14f",
    storageBucket: "marvel-quiz-bb14f.appspot.com",
    messagingSenderId: "528458864181",
    appId: "1:528458864181:web:2b7857a15d911e5cb3037c"
  };


class Firebase {
    constructor(){
        app.initializeApp(config);
        this.auth = app.auth();
    }

    //Inscription
    signupUser = (email, password)=>
    this.auth.createUserWithEmailAndPassword(email, password);

    //Connexion    
    loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    //Deconexion
    signoutUser = () => this.auth.signOut()

}

export default Firebase;