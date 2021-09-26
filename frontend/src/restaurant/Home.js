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

const Home =()=>{

    const history = useHistory()
    const [customerData, setcustomerData] = useState([])
    const [restaurant, setRestaurant] = React.useState([])
    const [dishes, setDishes] = React.useState([])
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
      //const customerId =  JSON.parse(localStorage.getItem("customer")).customerId;
      const restaurantId =1
      await axios.post(`http://localhost:8081/restaurant/getdish/${restaurantId}`,{})
      .then(responseData => {
          if (responseData.data.error) {
              console.log("res",responseData);
             // M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
          }
          else {
                  //setcustomerData(responseData.data)
                  setDishes(responseData.data)
                  console.log(" dishes",responseData.data)
                  
                  //console.log("resss ",customerData);
                  //localStorage.setItem('dish', JSON.stringify(responseData.data));
              
          }
      })

  }
  const getRestaurant = async () =>{
    //const customerId =  JSON.parse(localStorage.getItem("customer")).customerId;
    const restaurantId =1
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

    return(

        <div className= "reshome">
        <div className="header__upper">
           <div className="header__upperheader"  style={{backgroundColor:headbg,boxShadow:shadow}}   >
             <div className="header__upperheaderleft">
                <Menu />
                <img
                    src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg "
                     alt="uber eats" />
            </div>
            {/* <div className="header__upperheadercenter"   >
               <LocationOn />
               <input type="text" placeholder="What are you craving? " />
            </div> */}

            <div className="header__upperheaderright">
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
      <Dish id={dish.dishId} dname={dish.dname} des={dish.ddesc} ing={dish.ingredients} price={dish.Price} imageKey={dish.profilepic} />
      </Item>
    </Grid>
                ))
                }
                </Grid>
                </Box>
            </div>
           
          
    </div>
    )
    
}

export default Home;