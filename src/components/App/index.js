import React from 'react';
import { BrowserRouter as Router ,Route, Switch} from 'react-router-dom'

import '../../App.css';
import Header from '../Header';
import Home from '../Home';
import Footer from '../Footer';
import Welcome from '../Welcome';
import Login from '../Login';
import Signup from '../Signup';
import ErrorPage from '../ErrorPage';
import ForgetPwd from "../ForgetPwd";
import {IconContext, iconContext} from 'react-icons';

function App() {
  return (
    <Router>
      <IconContext.Provider value={{ style:{verticalAlign:'middle'} } }>
        <Header/>

        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/welcome" component={Welcome}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/forgetpwd" component={ForgetPwd}/>
          <Route component={ErrorPage}/>
        </Switch>
        <Footer/>
      </IconContext.Provider>
    </Router>
  );
}

export default App;
