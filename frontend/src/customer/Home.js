import React, { useEffect , useState} from "react";
//import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import M from 'materialize-css';
import { Button } from 'react-bootstrap';
import { BrowserRouter as Router, useHistory } from 'react-router-dom'
import Restaurant from '../components/Restaurants'
import { Menu, LocationOn,WatchLater,ArrowDownward } from "@mui/icons-material";
import './Home.css'

const Home =()=>{

    const history = useHistory()
    const [customerData, setcustomerData] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [image, setImage] = useState([])
    const [headbg,setheadbg]=useState('transparent');
  const [shadow,setshadow]=useState('none');
  const [inputdisplay,setinputdisplay]=useState(0);


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


    useEffect(()=>{

        getRestaurants()
    }, []);

    const getRestaurants = async () =>{
        const customerId =  JSON.parse(localStorage.getItem("customer")).customerId;
        await axios.get(`http://localhost:8081/customerprofile/getRestaurants/${customerId}`,{})
    //     .then((response) => 
    //   {
    //     return JSON.parse(response)
    //   })
        .then(responseData => {
            console.log("res",responseData);
            if (responseData.data.error) {
                console.log("res",responseData);
                M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
            }
            else {
                    //setcustomerData(responseData.data)
                    setRestaurants(responseData.data)
                    console.log(responseData.data)
                    //console.log("resss ",customerData);
                    localStorage.setItem('restaurant', JSON.stringify(responseData.data));
                
            }
        })

    }
    
     function searchRestaurant (){
        const name= {name:"Naan"}
        
        axios.post ("http://localhost:8081/customerprofile/searchRestaurant",name)
        
            .then(responseData => {
                console.log("res",responseData);
                if (responseData.data.error) {
                    console.log("res",responseData);
                    M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
                }
                else {
                        setcustomerData(responseData.data)
                        //setRestaurants(responseData.data)
                        console.log(responseData.data)
                        //console.log("resss ",customerData);
                        //localStorage.setItem('restaurant', JSON.stringify(responseData.data));
                    
                }
            })

    }

    return(
        <div className= "cushome">
             <div className="header__upper">
                <div className="header__upperheader"  style={{backgroundColor:headbg,boxShadow:shadow}}   >
                  <div className="header__upperheaderleft">
                     <Menu />
                     <img
                         src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg "
                          alt="uber eats" />
                 </div>
                 <div className="header__upperheadercenter"   >
                    <LocationOn />
                    <input type="text" placeholder="What are you craving? " />
                 </div>

                 <div className="header__upperheaderright">
                      <p> Sign out </p>
                 </div>
                </div>
             </div>
             <br />
             <br />
             <br />
             <br />
             <br />
             <br />

            <div className="res_home">
            {
                restaurants.map(restaurant =>(
                    <Restaurant key ={restaurant.restaurantId} Name ={restaurant.rname} Opens_at={restaurant.fromTime} imageKey={restaurant.profilepic}/>
                ))
            }
            </div>
            <button onClick={getRestaurants}>Click here</button>
        </div>
    )
}

export default Home;