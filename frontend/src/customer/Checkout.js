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

const Checkout = () => {
  const [headbg, setheadbg] = useState("transparent");
  const [shadow, setshadow] = useState("none");
  const [inputdisplay, setinputdisplay] = useState(0);
  const [currentAddress, setCurrentAddress] = useState("")
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
  });

  const savedAddress = [
    {
      line1: "1",
      line2: "2",
      city: "SJ",
      state: "CA",
      zip: "231",
    },
    {
      line1: "3",
      line2: "4",
      city: "as",
      state: "Aus",
      zip: "q2",
    },
    {
      line1: "6",
      line2: "7",
      city: "sf",
      state: "sdf",
      zip: "234",
    },
  ];

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

  const submitOrder = () => {
    const order = JSON.parse(localStorage.getItem("order"));
    axios
      .post("http://localhost:8081/order/addorder", {
        customerId: order.customerId,
        restaurantId: order.restaurantId,
        invoiceId: order.invoiceId,
        total: order.total,
      })
      .then((response) => {
        console.log("res", response);
        if (response.data.error) {
          console.log("res", response);
          M.toast({
            html: response.data.error,
            classes: "#c62828 red darken-3",
          });
        } else {
          //setcustomerData(response.data[0])
          console.log(response.data[0]);
        }
        const dishesToPass = [];
        order.dishes.map((dish) => {
          dishesToPass.push({
            invoiceId: order.invoiceId,
            ...dish,
          });
        });
        axios.post("http://localhost:8081/order/adddetails", dishesToPass).then((res)=>{
          console.log(res)
        })
      });
  };

  const addAddress = () => {
    console.log(address);
    setAddress({
      line1: "",
      line2: "",
      city: "",
      state: "",
      zip: "",
    });
    setCurrentAddress(`${address.line1}, ${address.line2}, ${address.city}, ${address.state} - ${address.zip}`)
  };

  useEffect(() => {
    // const customerId =  JSON.parse(localStorage.getItem("customer")).customerId;
    // axios.get(`http://localhost:8081/customerprofile/${customerId}`,{})
    // .then(response => {
    //     console.log("res",response);
    //     if (response.data.error) {
    //         console.log("res",response);
    //         M.toast({ html: response.data.error, classes: "#c62828 red darken-3" })
    //     }
    //     else {
    //             //setcustomerData(response.data[0])
    //             console.log(response.data[0])
    //     }
    // })
  });

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

            <div className="header__upperheaderright">
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
            border: "1px solid grey",
            height: "100%",
          }}
        >
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
              {JSON.parse(localStorage.getItem("order")).total}
            </Grid>
          </Grid>
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
              value={address.line1}
              onChange={(e) =>
                setAddress({ ...address, line1: e.target.value })
              }
            />
            <TextField
              label="Address Line 2"
              value={address.line2}
              onChange={(e) =>
                setAddress({ ...address, line2: e.target.value })
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
              value={address.zip}
              onChange={(e) => setAddress({ ...address, zip: e.target.value })}
            />
            <br />
            <button
              onClick={addAddress}
              style={{
                width: "fill-content",
              }}
            >
              Add
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
                  value={`${address.line1}, ${address.line2}, ${address.city}, ${address.state} - ${address.zip}`}
                  control={<Radio />}
                  label={`${address.line1}, ${address.line2}, ${address.city}, ${address.state} - ${address.zip}`}
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
            <button onClick={submitOrder}>Submit</button>
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
};
export default Checkout;
