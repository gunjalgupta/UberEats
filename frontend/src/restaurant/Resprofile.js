import React, { useEffect, useState } from "react";
import Restaurantpic from "../components/Restaurantpic";
import {
  BrowserRouter as Router,
  useParams,
  useHistory,
} from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ReactDOM from "react-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import M from "materialize-css";
import Typography from "@mui/material/Typography";
import Dish from "../components/Dishes";
import {
  Menu,
  LocationOn,
  WatchLater,
  ArrowDownward,
} from "@mui/icons-material";
import Showprofile from "./Showprofile";
import "./Resprofile.css";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import bcrypt from 'bcryptjs';
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
var _ = require('lodash');

function Resprofile() {

  const history = useHistory();
  const dispatch= useDispatch();
  const [restaurant, setRestaurant] = useState([]);
  const [dishes, setDishes] = useState([]);
  const [cart, setCart] = useState([JSON.parse(localStorage.getItem("cart"))]);
  const [headbg, setheadbg] = useState("transparent");
  const [shadow, setshadow] = useState("none");
  const [inputdisplay, setinputdisplay] = useState(0);
  const customerId =  JSON.parse(localStorage.getItem("customer")).customerId;
  const { restaurantId } = useParams();
  const custId = String(JSON.parse(localStorage.getItem("customer")).customerId)
  let invoiceId = bcrypt.hashSync(custId,10);

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 50) {
      setheadbg("#FFFFFF");
      setshadow("rgb(226 226 226) 0px -2px 0px inset");
      setinputdisplay(1);
    } else {
      setheadbg("transparent");
      setshadow("none");
      setinputdisplay(0);
    }
  });


  const cartorder={
    customerId,
    restaurantId: Number(restaurantId),
    total : _.sumBy(JSON.parse(localStorage.getItem("cart")), (dish) => dish.subtotal),
    invoiceId,
    dishes: JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")) : []
  }

  localStorage.setItem('order',JSON.stringify(cartorder))

  const useModal = () => {
    const [isShowing, setIsShowing] = useState(false);

    function toggle() {
      setIsShowing(!isShowing);
    }

    return {
      isShowing,
      toggle,
    };
  };

  const Modal = ({ isShowing, hide }) =>
    isShowing
      ? ReactDOM.createPortal(
          <React.Fragment>
            <div className="modal-overlay" />
            <div
              className="modal-wrapper"
              aria-modal
              aria-hidden
              tabIndex={-1}
              role="dialog"
            >
              <div className="modal">
                <div style={{ display: "flex", alignItems: "center",fontSize:30}}> {JSON.parse(localStorage.getItem("cart"))[0].rname}</div>
                <div className="modal-header" style={{justifyContent: 'flex-end'}}>
                  <button
                    type="button"
                    className="modal-close-button"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={hide}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <Typography component="div" variant="h5"></Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                  style={{paddingBottom: '25px'}}
                >
                  <br />
                  Cart Items
                  <div style={{display :"flex", flexDirection:"row"}}> 
                  <div>Dish name  </div> <div style={{paddingLeft:"85px"}}>   Quantity </div><div style={{paddingLeft:"110px"}}>  Subtotal</div></div>
               
                </Typography>

                 <Grid container spacing={3}>
                  {localStorage.getItem("cart") &&
                    JSON.parse(localStorage.getItem("cart")).map((dish) => (
                      <Grid container item>
                        <Grid container xs={4}>
                          {dish.dname}
                        </Grid>
                        <Grid container xs={4}>
                          {dish.quantity}
                        </Grid>
                        <Grid container xs={4}>
                          ${dish.subtotal}
                        </Grid>
                      </Grid>
                    ))}
                 <br></br>
                </Grid>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  <br></br>
                  <Link to ='/checkout'style={{paddingTop: '40px'}}>
                  
                  <Button
                    onClick={() => {
                      toggle();
                    }}
                    style={{color:'white', backgroundColor:'black', display:'flex',}}
                  >
                    GO TO CHECKOUT . ${cartorder.total}
                  </Button></Link>
                </Box>
              </div>
            </div>
          </React.Fragment>,
          document.body
        )
      : null;
  const { isShowing, toggle } = useModal();

  // const Item = styled(Paper)(({ theme }) => ({
  //   ...theme.typography.body2,
  //   padding: theme.spacing(2),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary,
  // }));



  useEffect(() => {
    console.log(restaurantId);
    getRestaurant();
    getDishes();
  }, []);

  const getRestaurant = async () => {
    //const customerId =  JSON.parse(localStorage.getItem("customer")).customerId;

    await axios
      .post(`http://localhost:8081/restaurant/profile/${restaurantId}`, {})
      .then((responseData) => {
        console.log("res", responseData);
        if (responseData.data.error) {
          console.log("res", responseData);
          // M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
        } else {
          //setcustomerData(responseData.data)
          setRestaurant(responseData.data);
          console.log("restaurant", responseData.data);
          //console.log("resss ",customerData);
          //localStorage.setItem("restaurant", JSON.stringify(responseData.data));
        }
      });
  };

  const getDishes = async () => {
    

    await axios
      .post(`http://localhost:8081/restaurant/getdish/${restaurantId}`, {})
      .then((responseData) => {
        console.log("res", responseData);
        if (responseData.data.error) {
          console.log("res", responseData);
          // M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
        } else {
          //setcustomerData(responseData.data)
          setDishes(responseData.data);
          console.log(" dishes", responseData.data);

          //console.log("resss ",customerData);
          //localStorage.setItem('dish', JSON.stringify(responseData.data));
        }
      });
  };

    
  function signout(){
    dispatch(logout());
    localStorage.setItem("customer",null);
    history.push("/")
  }

  return restaurant ? (
    <div style={{padding:20}}>
      <div className="header__upper">
        <div
          className="header__upperheader"
          style={{ backgroundColor: headbg, boxShadow: shadow }}
        >
          <div className="header__upperheaderleft">
            
            <Link to="/chome">
              <img
                src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg "
                alt="uber eats"
              />{" "}
            </Link>
          </div>
          <div className="header__upperheadercenter"   >
               <LocationOn />
               <input type="text" placeholder="What are you craving? " />
            </div>
          <div className="header__upperheaderright" onClick={toggle}>
            <p>
              {" "}
              <ShoppingCartOutlinedIcon style={{ color: "black" }} />
              <span className="empty-message">
                {" "}
                {localStorage.getItem("cart")
                  ? JSON.parse(localStorage.getItem("cart")).length
                  : "Your cart is empty"}
              </span>{" "}
            </p>
            <Modal
              isShowing={isShowing}
              hide={toggle}
              style={{ position: "absolute", width: "240px", height: "340px" }}
            />
          </div>

          <div className="header__upperheaderright" onClick={signout}>
            <p> Sign out </p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />

      <div>
        <Restaurantpic imgKey={restaurant.profilepic} name={restaurant.rname} desc={restaurant.rdesc} from={restaurant.fromTime} to={restaurant.toTime}/>
      </div>

      <div className="dish_home">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={5}>
            {dishes.map((dish) => (
              <Grid item xs={6} key={dish.dishId}>
                <Dish
                  id={dish.dishId}
                  dname={dish.dname}
                  des={dish.ddesc}
                  ing={dish.ingredients}
                  price={dish.Price}
                  imageKey={dish.profilepic}
                  restaurantId= {restaurantId}
                  rname={restaurant.rname}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  ) : (
    <h1></h1>
  );
}

export default Resprofile;
