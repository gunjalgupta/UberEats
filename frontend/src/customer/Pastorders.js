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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import './Pastorders.css'
import { Typography } from "@material-ui/core";
import ReactDOM from "react-dom";

const Pastorders = () => {
  const [headbg, setheadbg] = useState("transparent");
  const [shadow, setshadow] = useState("none");
  const [inputdisplay, setinputdisplay] = useState(0);
  const [orders, setOrders] = useState([
    {
      restaurantName: "restaurantName",
      date: "date",
      total: "total",
    },
  ]);
  const [orderdetails, setOrderdetails] = useState([])
  const [filteredOrders, setFilteredOrders] = useState(orders);

  useEffect(() => {
    axios
      .post("http://localhost:8081/order/getcusorder", {
        customerId: JSON.parse(localStorage.getItem("customer")).customerId,
      })
      .then((res) => {
        console.log(res);
        setOrders(res.data)
      });

      axios
    .post("http://localhost:8081/order/getcusdetail", {
      customerId: JSON.parse(localStorage.getItem("customer")).customerId,
    })
    .then((res) => {
      console.log(res);
      setOrderdetails(res.data)
    });
  }, []);

  
    
  

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

  const [status, setStatus] = React.useState("");
  const filters =
    JSON.parse(localStorage.getItem("order")).mode === "delivery"
      ? ["Order Received", "Preparing", "On the way", "Delivered"]
      : ["Order Received", "Preparing", " Pick up Ready", "Picked Up"];

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    setFilteredOrders(orders.filter((order) => order.ostatus === status));
  }, [status]);

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
                  <br />
                  Order details
                </Typography>
                <Grid container spacing={3}>
                  {orderdetails.map((dish) => (
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
                      {/* Total Price : {total} */}
                    </Grid>
                    <Grid container xs={4}>
                      {12}
                    </Grid>
                  </Grid>
                </Grid>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  <Link to ='/checkout'>
                  <Button
                    onClick={() => {
                      toggle();
                    }}
                  >
                    GO TO CHECKOUT
                  </Button></Link>
                </Box>
              </div>
            </div>
          </React.Fragment>,
          document.body
        )
      : null;
  const { isShowing, toggle } = useModal();



  return (
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
      <div
        style={{
          paddingTop: "100px",
          height: "100vh",
          width: "100vw",
        }}
        container
        direction={"row"}
      >
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={handleChange}
            >
              {filters.map((filter) => (
                <MenuItem value={filter}>{filter}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <table
          style={{
            width: "100%",
          }}
        >
          <tr>
            <th>Restaurant Name</th>
            <th>Order Date</th>
            <th>Amount</th>
          </tr> 

          {/* Use filterredOrders for this */}
          {orders.map((order) => (
            <tr onClick={toggle}>
              <td>{order.rname}</td>
              <td>{order.orderDate}</td>
              <td>{order.total}</td>
              <Modal
              isShowing={isShowing}
              hide={toggle}
              style={{ position: "absolute", width: "240px", height: "340px" }}
            />
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Pastorders;
