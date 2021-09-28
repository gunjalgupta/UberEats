import React, {useState} from 'react';
import './Login.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginRestaurant } from '../actions/resActions';
import { useHistory, Link } from 'react-router-dom';

function Login() {

    const dispatch = useDispatch();
    const [email , setEmail ] = useState("");
    const [pwd , setPwd ] = useState("");
    const [error , setError] = useState("");
    const history = useHistory();
    
    async function cuslogin(event) {
        event.preventDefault();
        try {
            const loginAdmin = {
                email,
                pwd,
            };
            console.log("------",loginAdmin)
            console.log("local", localStorage.getItem('token'))
            const res = await axios.post("http://localhost:8081/restaurant/login",loginAdmin);
                localStorage.setItem('restaurant', JSON.stringify(res.data));
                console.log("response",res);
                console.log("data",res.data);
        
                localStorage.setItem('token', res.data.token);
            if(res.data.success == 1) {
                dispatch(loginRestaurant({
                    email: res.data.email,
                    restaurantId: res.data.restaurantId,
                    name: res.data.name,
                    loggedIn: true, 
                }))
              history.push("/rprofile")
            }
            //console.log("response", res);
        }catch(err){
            console.log(err.response.data.message);
            console.log("incatch")
            setError(err.response.data.message)
        }
    }

    const divStyle = {
        color: 'red'
      }; 

    return(
    <div className ="login_cen">
    <div className ="logi">
            <img className="login__logo" 
            src="https://d1a3f4spazzrp4.cloudfront.net/arch-frontend/1.1.1/d1a3f4spazzrp4.cloudfront.net/eats/eats-logo-1a01872c77.svg"
            alt=""
            />
        <div className ="login_wc">
            <h4>Welcome back</h4>
            <div className ="login__container">
                <p>Sign in with your email and password</p>
                <form>
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
                    <input type="password" placeholder="password" onChange={(e) => setPwd(e.target.value)} value={pwd}></input>
                    <button onClick={cuslogin} className="login__button">Next</button>
                </form>
                <div className="login__text">
                    <p>New to Uber?</p>
                    <Link to="/rregister" className="login_ul"><p className="login__create">Create an account</p></Link>
                </div>
                <div style = {divStyle}>
                    {error && <p> {error} </p>}
                        
                </div>
            </div>
        </div>
    </div>
    </div>
    )
}



export default Login;