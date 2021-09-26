import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { BrowserRouter as Router, useHistory } from 'react-router-dom'
import '../customer/Restaurant.css'
import axios from 'axios';
import { FavoriteBorder } from "@mui/icons-material";

const Restaurants = ({Name, Opens_at,imageKey, id}) =>{
  const history = useHistory()
 const [icon, seticon]= useState([false]);
 const [favrestaurants, setRestaurants] = useState([])

  function addfav (){
    seticon(true)
    const Req={customerId: JSON.parse(localStorage.getItem("customer")).customerId,
                restaurantId: id}
    console.log(Req);
    axios.post ("http://localhost:8081/customer/addfav",Req)
    
        .then(responseData => {
            console.log("add",responseData);
            if (responseData.data.error) {
                console.log("res",responseData);
                //M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
            }
        })

}

function deletefav (){
  seticon(false)
  const Req={customerId: JSON.parse(localStorage.getItem("customer")).customerId,
              restaurantId: id}
  console.log(Req);
  axios.post ("http://localhost:8081/customer/deletefav",Req)
  
      .then(responseData => {
          console.log("del",responseData);
          if (responseData.data.error) {
              console.log("res",responseData);
              //M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
          }
      })

}

useEffect(()=>{
  const req={ customerId : JSON.parse(localStorage.getItem("customer")).customerId, restaurantId: id}

        axios.post("http://localhost:8081/customer/checkfav",req)
        .then(response => {
            console.log("res",response);
            if (response.data === 'success') {
                console.log("res",response);
               // M.toast({ html: response.data.error, classes: "#c62828 red darken-3" })
               seticon(true)
            }
            else {
                    console.log(response.data)
                    //setRestaurants(response.data)
                    //console.log("resss ",customerData);
                    //localStorage.setItem('customer', JSON.stringify(response.data[0]));
                    //M.toast({ html: response.data.error, classes: "#c62828 red darken-3" })
                    seticon(false)
            }
        })
 },[])
  




  // if(favrestaurants.restaurantId===id){
  //   seticon(true)
  // }
  // else {seticon(false)}

    return (
        <div className = "card_res">
        
        <Card sx={{ maxWidth: 345 }} className="cardd_res" >
      <CardHeader 
        title= {Name}
        subheader= {Opens_at}      
        />
        {imageKey && 
        <CardMedia onClick={() => history.push(`/resprofile/${id}`)}
        component="img"
        height="194"
        image={`http://localhost:8081/images/${imageKey}`}
        alt="Paella dish"
      />}
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          resturant description
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <div>
            
            {icon?  <span onClick={()=>{deletefav()}}> <FavoriteIcon /> </span>:
            <span onClick={()=>{addfav()}} > <FavoriteBorderIcon/> </span>
            
            
            }
           </div>
        </IconButton>
      </CardActions>
      
    </Card>
        
        
    </div>
    )
}

export default Restaurants
