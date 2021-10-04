import React, { useEffect , useState} from "react";
import { Menu, LocationOn,WatchLater,ArrowDownward } from "@mui/icons-material";
import axios from 'axios';
import M from 'materialize-css'
import Restaurant from '../components/Restaurants'
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import { useHistory } from "react-router-dom";

const Favourite= function (){

    const dispatch= useDispatch();
    const history= useHistory();
    const [headbg,setheadbg]=useState('transparent');
    const [shadow,setshadow]=useState('none');
    const [inputdisplay,setinputdisplay]=useState(0);
    const [restaurants, setRestaurants] = useState([])
  
    
    window.addEventListener('scroll',()=>{
      if(window.scrollY>=50){
        setheadbg('#FFFFFF');
        setshadow('rgb(226 226 226) 0px -2px 0px inset');
        setinputdisplay(1);
  
      }
      else{
        setheadbg('transparent');
        setshadow('none');
        setinputdisplay(0);
  
  
      }
    })


  function signout(){
    dispatch(logout());
    localStorage.setItem("customer",null);
    history.push("/")
  }

    useEffect(()=>{
        const customerId =  JSON.parse(localStorage.getItem("customer")).customerId;

        axios.post(`http://localhost:8081/customer/showfav/${customerId}`,{})
        .then(response => {
            console.log("res",response);
            if (response.data.error) {
                console.log("res",response);
                M.toast({ html: response.data.error, classes: "#c62828 red darken-3" })
            }
            else {
                    console.log(response.data)
                    setRestaurants(response.data)
                    //console.log("resss ",customerData);
                    //localStorage.setItem('customer', JSON.stringify(response.data[0]));
                    //M.toast({ html: response.data.error, classes: "#c62828 red darken-3" })
                
            }
        })
       
    }, [restaurants]);

    
    return(
        <div>
        <div className="header__upper">
                <div className="header__upperheader"  style={{backgroundColor:headbg,boxShadow:shadow}}   >
                  <div className="header__upperheaderleft">
                     <Menu />
                     <a  href = "/chome">
                     <img
                         src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg "
                          alt="uber eats" />
                          </a>
                 
                 </div>

                
                 <div className="header__upperheadercenter"   >
                    <LocationOn />
                    <input type="text" placeholder="What are you craving? " 
                       />
                  
                 </div>
                 
                 <div className="header__upperheaderright" onClick={signout}>
                   
                      <p> Sign out </p>
                 </div>
                </div>
             </div>
             <div className="res" style={{marginTop: 100,marginLeft: 30 }}><h3>Favourites</h3></div>
             <div className="res" style={{marginTop: 10, display: "flex"}}>
            {
                restaurants.map(restaurant =>(
                    <Restaurant id ={restaurant.restaurantId} Name ={restaurant.rname} Opens_at={restaurant.fromTime} imageKey={restaurant.profilepic}/>
                ))
            } 

              
            </div>
    </div>
    )
}

export default Favourite;