import React, { useEffect, useState } from "react";
//import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
import Button from "@mui/material/Button";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import Restaurant from "../components/Restaurants";
import ReactDOM from "react-dom";
import {
  Menu,
  LocationOn,
  WatchLater,
  ArrowDownward,
} from "@mui/icons-material";
import "./Home.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Sidebar from "../components/Sidebar";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

const Home = () => {
  const history = useHistory();
  const dispatch= useDispatch();
  const [search, setsearch] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [value, setValue] = useState("");
  const [headbg, setheadbg] = useState("transparent");
  const [shadow, setshadow] = useState("none");
  const [inputdisplay, setinputdisplay] = useState(0);

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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

  useEffect(() => setFilteredRestaurants(restaurants), [restaurants])

  // const Item = styled(Paper)(({ theme }) => ({
  //   ...theme.typography.body2,
  //   padding: theme.spacing(2),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }));

  function signout(){
    dispatch(logout());
    localStorage.setItem("customer",null);
    history.push("/")
  }

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
                <div className="modal-header">
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
                >
                  
                  Cart Items
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  <br />
                  <div style={{display :"flex", flexDirection:"row"}}> 
                  <div>
                  Dish name  </div> <div style={{paddingLeft:"100"}}>   Quantity </div><div style={{paddingLeft:"10"}}>  Subtotal</div></div>
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
                          {dish.subtotal}
                        </Grid>
                      </Grid>
                    ))}
                  <Grid container item>
                    <Grid container xs={4}></Grid>
                    <Grid container xs={4}>
                      Total Price
                    </Grid>
                    <Grid container xs={4}>
                      {localStorage.getItem("order") && JSON.parse(localStorage.getItem("order")).total}
                    </Grid>
                  </Grid>
                </Grid>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  <Link to= '/checkout'>
                  <Button
                    onClick={() => {
                      toggle();
                    }}
                  >
                    GO TO CHECKOUT
                  </Button> </Link>
                </Box>
              </div>
            </div>
          </React.Fragment>,
          document.body
        )
      : null;
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    const customerId = JSON.parse(localStorage.getItem("customer")).customerId;
    await axios
      .get(
        `http://localhost:8081/customerprofile/getRestaurants/${customerId}`,
        {}
      )
      //     .then((response) =>
      //   {
      //     return JSON.parse(response)
      //   })
      .then((responseData) => {
        console.log("res", responseData);
        if (responseData.data.error) {
          console.log("res", responseData);
          M.toast({
            html: responseData.data.error,
            classes: "#c62828 red darken-3",
          });
        } else {
          //setcustomerData(responseData.data)
          setRestaurants(responseData.data);
          console.log(responseData.data);
          //console.log("resss ",customerData);
          // localStorage.setItem('restaurant', JSON.stringify(responseData.data));
        }
      });
  };

  function searchRestaurant(name) {
    setsearch(true);
    const Name = { name: name };
    console.log(Name);
    axios
      .post("http://localhost:8081/customerprofile/searchRestaurant", Name)

      .then((responseData) => {
        console.log("res", responseData);
        if (responseData.data.error) {
          console.log("res", responseData);
          M.toast({
            html: responseData.data.error,
            classes: "#c62828 red darken-3",
          });
        } else {
          setRestaurants(responseData.data);
          //setRestaurants(responseData.data)
          console.log(responseData.data);
          //console.log("resss ",customerData);
          //localStorage.setItem('restaurant', JSON.stringify(responseData.data));
        }
      });
  }
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    //e.preventDefault();
    searchRestaurant(value);
    // or you can send data to backend
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === "Enter") {
      console.log("enter");
      handleSubmit();
    }
  };

  const [filters, updateFilters] = useState({
    delivery: true,
    pickup: false,
    vegan: true,
    veg: true,
    nonVeg: true
  })

  const deliveryOrPickup = (delivery, pickup, rname) => {
    if (delivery === "Yes" && filters.delivery) {
      return true
    }
    else if (pickup === "Yes" && filters.pickup) {
      return true
    }
    else {
      return false
    }
  }

  useEffect(() => {
    setFilteredRestaurants(
      restaurants
      .filter((restaurent) => (deliveryOrPickup(restaurent.delivery, restaurent.pickup, restaurent.rname)))
      .filter((restaurent) => (( filters.veg && restaurent.veg === "Yes" ) || ( filters.nonVeg && restaurent.nonVeg === "Yes" ) || ( filters.vegan && restaurent.vegan === "Yes" )))
    )
  }, [filters])

  console.log("filtered", filteredRestaurants)
  console.log("all", restaurants)
  return (
    <div className="cushome">
      <div className="header__upper">
        <div
          className="header__upperheader"
          style={{ backgroundColor: headbg, boxShadow: shadow }}
        >
          <div className="header__upperheaderleft">
            <Menu
              style={{
                marginRight: "30px",
              }}
              onClick={handleDrawerOpen}
            />
            <a href="/chome">
              <img
                src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg "
                alt="uber eats"
              />
            </a>
          </div>

          <div className="header__upperheadercenter">
            <LocationOn />
            <input
              type="text"
              placeholder="What are you craving? "
              value={value}
              onChange={handleChange}
              onKeyPress={handleKeypress}
            />
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

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
            <img
                src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg "
                alt="uber eats"
              />
          </DrawerHeader>
          <Divider />
          <List>
          <ListItem >
          
                <ListItemIcon>
                <Link to ='./cprofile'>
                 <InboxIcon /> </Link>  
                </ListItemIcon> 
                <ListItemText> <Link to ='./cprofile' style={{textDecoration:'none', color:"black"}}>  View profile </Link></ListItemText>
              </ListItem>
        <ListItem >
          
                <ListItemIcon>
                <Link to ='./cprofile'>
                 <InboxIcon />   
                 </Link>  
                </ListItemIcon> 
                <ListItemText> <Link to ='./cprofile' style={{textDecoration:'none', color:"black"}}>  Update profile </Link></ListItemText>
              </ListItem>
              <ListItem >
           
                <ListItemIcon>
                <Link to ='./favourite'> 
                 <InboxIcon />  </Link>
                </ListItemIcon> 
                <ListItemText>  <Link to ='./favourite' style={{textDecoration:'none', color:"black"}}>  Favourites </Link></ListItemText>
              </ListItem>
              <ListItem >
          
                <ListItemIcon>
                <Link to ='./pastorders'> 
                 <InboxIcon />  </Link> 
                </ListItemIcon> 
                <ListItemText>  <Link to ='./pastorders' style={{textDecoration:'none', color:"black"}}>   Orders</Link></ListItemText>
              </ListItem>
          </List>
          <Divider />
        </Drawer>
      </div>
      <div></div>
      <Grid
        container
        style={{
          paddingTop: "120px",
        }}
      >
        <Grid container item xs={2} style={{
          height: "fit-content"
        }}>
          <Grid container item>
            <FormControl component="fieldset">
              <FormLabel component="legend">Options</FormLabel>
              <RadioGroup defaultValue="delivery" name="radio-buttons-group" >
                <FormControlLabel
                  value="delivery"
                  control={<Radio/>}
                  label="Delivery"
                  onChange={
                    (event) => updateFilters(
                      {...filters,
                        delivery: event.target.checked,
                        pickup: !event.target.checked,
                      }
                    )
                  }
                />
                <FormControlLabel
                  value="pickup"
                  control={<Radio />}
                  label="Pickup"
                  onChange={
                    (event) => updateFilters(
                      {...filters,
                        pickup: event.target.checked,
                        delivery: !event.target.checked,
                      }
                    )
                  }
                />
              </RadioGroup>
            </FormControl>

          </Grid>
          <Grid container item>

            <FormGroup >
              <FormLabel component="legend">Type</FormLabel>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Vegan"
                onChange={
                  (event) => updateFilters(
                    {...filters,
                      vegan: event.target.checked
                    }
                  )
                }
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Veg"
                onChange={
                  (event) => updateFilters(
                    {...filters,
                      veg: event.target.checked
                    }
                  )
                }
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Non-Veg"
                onChange={
                  (event) => updateFilters(
                    {...filters,
                      nonVeg: event.target.checked
                    }
                  )
                }
              />
            </FormGroup>
          </Grid>
        </Grid>
        
        {search ? (
          <Grid container item xs={10} spacing={5}>
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

              filteredRestaurants.map((restaurant) => (
                <Grid container item xs={4}>
                  <Restaurant
                    id={restaurant.restaurantId}
                    Name={restaurant.rname}
                    Opens_at={restaurant.fromTime}
                    imageKey={restaurant.profilepic}
                  />
                </Grid>
              ))
            }
          </Grid>
        ) : (
          <Grid container item xs={10} spacing={5}>
            {filteredRestaurants.map((restaurant) => (
              <Grid container item xs={4}>
                <Restaurant
                  id={restaurant.restaurantId}
                  Name={restaurant.rname}
                  Opens_at={restaurant.fromTime}
                  imageKey={restaurant.profilepic}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Home;

//Sidebar

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));
