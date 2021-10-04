import React, { useEffect , useState} from "react";
//import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import M from 'materialize-css';
import Dish from '../components/Resdishes'
import { Button } from 'react-bootstrap';
import { BrowserRouter as Router, useHistory } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Restaurant from '../components/Restaurants'
import { Menu, LocationOn,WatchLater,ArrowDownward } from "@mui/icons-material";
import './Home.css'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import { useDispatch } from "react-redux";
import { logoutRestaurant } from "../actions/resActions";


const Home =()=>{

    const history = useHistory()
    const dispatch = useDispatch()
    const [customerData, setcustomerData] = useState([])
    const [restaurant, setRestaurant] = useState([])
    const [dishes, setDishes] = useState([])
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

  function signout(){
    dispatch(logoutRestaurant());
    localStorage.setItem("restaurant",null);
    history.push("/")
  }

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

    useEffect(()=>{
      getDishes();
       
    }, []);

  
    const getDishes = async () =>{
      const restaurantId =  JSON.parse(localStorage.getItem("restaurant")).restaurantId;
      //const restaurantId =1
      await axios.post(`http://localhost:8081/restaurant/getdish/${restaurantId}`,{})
      .then(responseData => {
          if (responseData.data.error) {
              console.log("res",responseData);
             // M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
          }
          else {
            console.log(" dishes",responseData.data)
                  //setcustomerData(responseData.data)
                  setDishes(responseData.data)
                  
                  //console.log("resss ",customerData);
                  //localStorage.setItem('dish', JSON.stringify(responseData.data));
              
          }
      })

  }
  const getRestaurant = async () =>{
    const restaurantId =  JSON.parse(localStorage.getItem("restaurant")).restaurantId;
    //const restaurantId =1
    await axios.post(`http://localhost:8081/restaurant/profile/${restaurantId}`,{})
    .then(responseData => {
        console.log("res",responseData);
        if (responseData.data.error) {
           // M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
        }
        else {
                //setcustomerData(responseData.data)
                setRestaurant(responseData.data)
                console.log("restaurant",responseData.data)
                //console.log("resss ",customerData);
                localStorage.setItem('restaurant', JSON.stringify(responseData.data));
            
        }
    })

} 
const deleteDish =  (id) =>{

  axios.post(`http://localhost:8081/restaurant/deletedish/${id}`,{})
 .then(responseData => {
     if (responseData.data.error) {
        // M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
     }
     else {
             setDishes(dishes.filter((dish) => dish.dishId !== id))
             //console.log(" dishes",responseData.data)
             
             //console.log("resss ",customerData);
             //localStorage.setItem('dish', JSON.stringify(responseData.data));
         
     }
 })

}

    return(dishes?

        <div className= "reshome">
        <div className="header__upper">
           <div className="header__upperheader"  style={{backgroundColor:headbg,boxShadow:shadow}}   >
             <div className="header__upperheaderleft">
                <Menu />
                <Link to='/rhome'>
                <img
                    src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg "
                     alt="uber eats" /></Link>
            </div>
            {/* <div className="header__upperheadercenter"   >
               <LocationOn />
               <input type="text" placeholder="What are you craving? " />
            </div> */}
            <Link to="./adddish">
            <div className="header__upperheaderright">
                 <p> Add Dishes </p>
            </div></Link>
            <Link to="./allorders">
            <div className="header__upperheaderright">
                 <p> Orders </p>
            </div></Link>
            <div className="header__upperheaderright" onClick={signout}>
                 <p> Sign out </p>
            </div>
            {/* <div className="header__upperheaderright">
                 <p> Add dishes </p>
            </div> */}
           </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        
        <div className = 'dish_home' style={{marginTop:100, marginLeft: 80, display:"flex"}}>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                dishes.map(dish =>(
                
                <Grid item xs={2} sm={4} md={4} key={dish.dishId}>
      <Item>
      <Dish id={dish.dishId} func={deleteDish}  dname={dish.dname} des={dish.ddesc} ing={dish.ingredients} price={dish.Price} imageKey={dish.profilepic} />
      </Item>
    </Grid>
                ))
                }
                </Grid>
                </Box>
            </div>
           
          
    </div>:<h1></h1>
    )
    
}

export default Home;