import React, { useEffect , useState} from "react";
//import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import M from 'materialize-css';
//import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, useHistory } from 'react-router-dom'
import Restaurant from '../components/Restaurants'
import ReactDOM from 'react-dom';
import { Menu, LocationOn,WatchLater,ArrowDownward } from "@mui/icons-material";
import './Home.css'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Sidebar from "../components/Sidebar";

const Home =()=>{

    const history = useHistory()
    const [search, setsearch] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const [value, setValue] = useState("");
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

  // const Item = styled(Paper)(({ theme }) => ({
  //   ...theme.typography.body2,
  //   padding: theme.spacing(2),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }));

  const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);
  
    function toggle() {
      setIsShowing(!isShowing);
    }
  
    return {
      isShowing,
      toggle,
    }
  };

  const Modal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
      <div className="modal-overlay"/>
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <div className="modal-header">
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <Typography component="div" variant="h5">
                     
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
            
              <br/>
              Ingredients:  
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <Button
      onClick={() => {

        toggle();
      }}
    >
      GO TO CHECKOUT
    </Button>
          </Box>
            
        </div>
      </div>
    </React.Fragment>, document.body
  ) : null;
  const {isShowing, toggle} = useModal();

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
                    // localStorage.setItem('restaurant', JSON.stringify(responseData.data));
                
            }
        })

    }
    
     function searchRestaurant (name){
        setsearch(true);
        const Name={name: name}
        console.log(Name);
        axios.post ("http://localhost:8081/customerprofile/searchRestaurant",Name)
        
            .then(responseData => {
                console.log("res",responseData);
                if (responseData.data.error) {
                    console.log("res",responseData);
                    M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
                }
                else {
                        setRestaurants(responseData.data)
                        //setRestaurants(responseData.data)
                        console.log(responseData.data)
                        //console.log("resss ",customerData);
                        //localStorage.setItem('restaurant', JSON.stringify(responseData.data));
                    
                }
            })

    }
    const handleChange = e => {
        setValue(e.target.value);
      };
    
      const handleSubmit = e => {
        //e.preventDefault();
        searchRestaurant( value);
        // or you can send data to backend
      };
    
      const handleKeypress = e => {
          //it triggers by pressing the enter key
        if (e.key === 'Enter') {
            console.log("enter")
          handleSubmit();
        }
      };

    return(
        <div className= "cushome">
          <Sidebar/>
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
                        value={value}
                        onChange={handleChange}
                        onKeyPress={handleKeypress}/>
                  
                 </div>
                 <div className="header__upperheaderright" onClick={toggle}><p> <ShoppingCartOutlinedIcon style={{color: "black"}} /> 
                   <span className="empty-message"> Your cart is empty</span> </p>
                 <Modal isShowing={isShowing} hide={toggle}  style={{position: 'absolute', width: '240px', height: '340px'}}/>
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
             <div>
            
             </div>
                { search ?
            
            <div className="res_home">
            {
                // <Grid container disableGutters spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                // {
                // restaurants.map(restaurant =>(
                
                // <Grid disableGutters item xs={2} sm={4} md={4} key={restaurant.restaurantId}>
                //  <Item>
                //   <Restaurant id ={restaurant.restaurantId} Name ={restaurant.rname} Opens_at={restaurant.fromTime} imageKey={restaurant.profilepic}/>
                //  </Item>
                // </Grid>
                // ))
                // }
                // </Grid>

                restaurants.map(restaurant =>(
                  <Restaurant id ={restaurant.restaurantId} Name ={restaurant.rname} Opens_at={restaurant.fromTime} imageKey={restaurant.profilepic}/>
              ))
            }
            </div>
            :
            <div className="res_home">
            {
                restaurants.map(restaurant =>(
                    <Restaurant id ={restaurant.restaurantId} Name ={restaurant.rname} Opens_at={restaurant.fromTime} imageKey={restaurant.profilepic}/>
                ))
            } 

              
            </div>
}
        </div>
    )
}

export default Home;