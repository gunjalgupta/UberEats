import './App.css';
import Login from './customer/Login';
import Home from './customer/Home'
import Register from './customer/Register'
import Details from './customer/Details'
import Profilepic from './customer/Profilepic';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {

  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
         <Route path='/register'>
            <Register/>
          </Route>
          <Route path='/details'>
            <Details />
          </Route>
          <Route path='/profilepic'>
            <Profilepic />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
