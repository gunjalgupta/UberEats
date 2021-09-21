import './App.css';
import Header from './Header';
import Footer from './Footer';
import Center from './Center';
import CLogin from './customer/Login';
//import Home from './customer/Home'
import CRegister from './customer/Register'
import RLogin from './restaurant/Login';
import RRegister from './restaurant/Register'
import RProfile from './restaurant/UpdateProfile';
import CProfile from './customer/UpdateProfile';
import CHome from "./customer/Home";
import RHome from "./restaurant/Home";
import Resprofile  from './restaurant/Resprofile';
//import Details from './customer/Details'
//import Profilepic from './customer/Profilepic';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (
    <Router>
    <div className="app">
    <Switch>
           <Route path='/clogin'>
            <CLogin />
          </Route>
         <Route path='/cregister'>
            <CRegister/>
          </Route>
          <Route path='/rlogin'>
            <RLogin />
          </Route>
         <Route path='/rregister'>
            <RRegister/>
          </Route>
          <Route path = '/resprofile'>
            <Resprofile />
            </Route>
          <Route path='/rprofile/'>
            <RProfile/>
          </Route>
          <Route path='/cprofile/'>
            <CProfile/>
          </Route>
          <Route path='/chome/'>
            <CHome/>
          </Route>
          <Route path='/rhome/'>
            <RHome/>
          </Route>

    <Route path= "/">
     <Header />
    <Center />  
    <Footer  /> 
    </Route>
        
          </Switch>
    </div>
    </Router>
  );
}

export default App;



