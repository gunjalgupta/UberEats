import React, { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";
import { Grid, TextField } from "@material-ui/core";
import axios from "axios";
import M from "materialize-css";
import { Formik } from "formik";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import {
  CountryDropdown,
  RegionDropdown,
} from "react-country-region-selector-material-ui-new";
import "./UpdateProfile.css";
import Showprofile from "./Showprofile";
import Profilepic from "./Profilepic";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

const Checkout = () => {
  const history= useHistory();
  const dispatch= useDispatch();
  const [headbg, setheadbg] = useState("transparent");
  const [shadow, setshadow] = useState("none");
  const [currentAddress, setCurrentAddress] = useState("")
  const [mode, setMode] = useState("pickup")
  const [savedAddress, setSavedAddress]= useState([]);
  const [value, setValue] = useState("pickup");
  const [address, setAddress] = useState({
    customerId: JSON.parse(localStorage.getItem("customer")).customerId,
    addline1: "",
    addline2: "",
    city: "",
    state: "",
    zipcode: "",
  });

  // const savedAddress = [
  //   {
  //     line1: "1",
  //     line2: "2",
  //     city: "SJ",
  //     state: "CA",
  //     zip: "231",
  //   },
  //   {
  //     line1: "3",
  //     line2: "4",
  //     city: "as",
  //     state: "Aus",
  //     zip: "q2",
  //   },
  //   {
  //     line1: "6",
  //     line2: "7",
  //     city: "sf",
  //     state: "sdf",
  //     zip: "234",
  //   },
  // ];

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 50) {
      setheadbg("#FFFFFF");
      setshadow("rgb(226 226 226) 0px -2px 0px inset");
    } else {
      setheadbg("transparent");
      setshadow("none");
    }
  });

  const submitOrder = () => {
    console.log("here",mode,currentAddress)
    if(mode==='delivery' && (currentAddress===null || currentAddress==="")){
    console.log("here",mode,currentAddress)
        M.toast({html:"Address required"})
      
  } 
    
    else{
    const order = JSON.parse(localStorage.getItem("order"));
    const restId = JSON.parse(localStorage.getItem("rescartid"))[0];
    axios
      .post("http://localhost:8081/order/addorder", {
        customerId: order.customerId,
        restaurantId: restId.restaurantId,
        invoiceId: order.invoiceId,
        total: order.total,
        mode: mode
      })
      .then((response) => {
        //console.log("res", response);
        if (response.data.error) {
          console.log("res", response);
          M.toast({
            html: response.data.error,
            classes: "#c62828 red darken-3",
          });
        } else {
          //setcustomerData(response.data[0])
          console.log(response.data);
         
        }
        const dishesToPass = [];
        order.dishes.map((dish) => {
          console.log(order.invoiceId);
          dishesToPass.push({
            invoiceId: order.invoiceId,
            dishId: dish.dishId,
            quantity: dish.quantity,
            price: dish.Price,
            subtotal: dish.subtotal
          });
        });
        console.log("-----------",dishesToPass);
        axios.post("http://localhost:8081/order/adddetails", dishesToPass).then((res)=>{
          console.log(res)
        })
      }).then(()=>{
        
        M.toast({ html:"Order placed successfully",  classes: "rounded", inDuration: 300,
        outDuration: 375,})
        localStorage.removeItem("cart",null);
        localStorage.removeItem("rescartid",null);
        localStorage.removeItem("order",null);
        //history.push("/chome")
      })
  }};

  const addAddress = () => {
    console.log(address);

    axios.post("http://localhost:8081/customer/addaddress/",address)
    .then(response => {
        
        if (response.data.error) {
            //console.log("res",response);
            M.toast({ html: response.data.error, classes: "#c62828 red darken-3" })
        }
        else {
                //setSavedAddress(response.data)
                console.log(response.data)
        }
    })

    setAddress({
      addline1: "",
      addline2: "",
      city: "",
      state: "",
      zipcode: "",
    });
    setCurrentAddress(`${address.addline1}, ${address.addline2}, ${address.city}, ${address.state} - ${address.zipcode}`)
  };

  useEffect(() => {
    const customerId =  JSON.parse(localStorage.getItem("customer")).customerId;
    axios.post(`http://localhost:8081/customer/fetchaddress/${customerId}`,{})
    .then(response => {
        
        if (response.data.error) {
            console.log("res",response);
            M.toast({ html: response.data.error, classes: "#c62828 red darken-3" })
        }
        else {
                setSavedAddress(response.data)
                console.log(response.data[0])
        }
    })
  },[]);

  function signout(){
    dispatch(logout());
    localStorage.setItem("customer",null);
    history.push("/")
  }

  return (
    <section className="section" id="about">
      <div className="update">
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

            {/* <div className="header__upperheadercenter"   >
 
    <input type="text" placeholder="What are you craving? " />
 </div> */}

            <div className="header__upperheaderright" onClick={signout}>
              <p> Sign out </p>
            </div>
          </div>
        </div>
      </div>
      <Grid
        style={{
          paddingTop: "100px",
          height: "100vh",
        }}
        container
        direction={"row"}
      >
        <Grid
          container
          spacing={3}
          xs={6}
          style={{
            // border: "1px solid grey",
            height: "100%",
           
          }}
        >
          <Grid container xs={6} style={{display:'flex', justifyContent:'center',  paddingTop: "0px",fontSize:32}}>
          {JSON.parse(localStorage.getItem("cart"))[0].rname}
                </Grid>
                <table
            style={{
            width: "100%",
          }}
        >
          <tr>
            <th>Dish Name</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr> 
          {localStorage.getItem("cart") &&
            JSON.parse(localStorage.getItem("cart")).map((dish) => (
              <tr>
              <Grid container item>
                <Grid container xs={4}>
                <td>{dish.dname}</td>
                </Grid>
                <Grid container xs={4}>
                <td>{dish.quantity}</td>
                </Grid>
                <Grid container xs={4}>
                <td>{dish.subtotal}</td>
                </Grid>
              </Grid>
              </tr>
            ))}
            </table>
          <Grid container item>
            <Grid container xs={4}></Grid>
            <Grid container xs={4}>
              Total Price
            </Grid>
            <Grid container xs={4}>
              {JSON.parse(localStorage.getItem("order")).total}
            </Grid>
          </Grid>
        
            Mode of delivery:
            <FormControl component="fieldset">
              <FormLabel component="legend">Choose an option</FormLabel>
              <RadioGroup
                aria-label="gender"
                value= {value}
                name="radio-buttons-group"
                onChange={(e) => {setMode(e.target.value)
                setValue(e.target.value)}}
              >    
                <FormControlLabel value="pickup" defaultChecked="true" control={<Radio />} label="Pick-up" />
                <FormControlLabel value="delivery" control={<Radio />} label="Delivery" />
              </RadioGroup>
            </FormControl>
          </Grid>
        <Grid
          container
          spacing={3}
          xs={6}
          style={{
            border: "1px solid grey",
            height: "100%",
          }}
        >
          <Grid
            container
            item
            direction="column"
            style={{
              padding: "20px",
            }}
          >
            Address:
            <TextField
              label="Address Line 1"
              value={address.addline1}
              onChange={(e) =>
                setAddress({ ...address, addline1: e.target.value })
              }
            />
            <TextField
              label="Address Line 2"
              value={address.addline2}
              onChange={(e) =>
                setAddress({ ...address, addline2: e.target.value })
              }
            />
            <TextField
              label="City"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <TextField
              label="State"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
            />
            <TextField
              label="Zip Code"
              value={address.zipcode}
              onChange={(e) => setAddress({ ...address, zipcode: e.target.value })}
            />
            <br />
            <button
              onClick={addAddress}
              style={{
                width: "fill-content",
              }}
            >
              Add address
            </button>
          </Grid>

          <Grid
            container
            item
            direction="column"
            style={{
              padding: "40px 20px",
            }}
          >
            Saved Address:
            <FormControl component="fieldset">
              <FormLabel component="legend">Choose from existing address</FormLabel>
              <RadioGroup
                aria-label="gender"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={(e) => setCurrentAddress(e.target.value)}
              >
                  {savedAddress.map((address) => 
                  <FormControlLabel
                  value={`${address.addline1}, ${address.addline2}, ${address.city}, ${address.state} - ${address.zipcode}`}
                  control={<Radio />}
                  label={`${address.addline1}, ${address.addline2}, ${address.city}, ${address.state} - ${address.zipcode}`}
                />)}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid
            container
            item
            direction="column"
            style={{
              padding: "40px 20px",
            }}
          >
              Selected Address : {currentAddress}
          </Grid>

          <Grid
            container
            item
            style={{
              height: "fit-content",
            }}
          >
            <button style={{color:'white', backgroundColor:'black',paddingLeft:50,paddingRight:50, fontSize:20}}onClick={submitOrder}>Place Order</button>
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
};
export default Checkout;
