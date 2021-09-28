import React from "react";
import Box from "@mui/material/Box";
import { Card, Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ReactDOM from "react-dom";

function Dishes({ dname, des, ing, imageKey, price, id , restaurantId}) {
  const [dish, setdish] = useState([]);
  let [counter, setcounter] = useState(0);

  const increment = () => {
    setcounter(counter + 1);
  };
  const decrement = () => {
    setcounter(counter - 1);
  };
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

  const addToCart = (dishId, quantity,dname,price) => {
    const subtotal= quantity*price
    if (localStorage.getItem('order')) {
      if (JSON.parse(localStorage.getItem('order')).restaurantId === restaurantId) {
        localStorage.getItem("cart") ? 
        localStorage.setItem(
          "cart",
          JSON.stringify([
            ...JSON.parse(localStorage.getItem("cart")),
            { dishId: dishId, dname:dname, quantity: quantity, Price: price, subtotal: subtotal  },
          ])
        ) : 
        localStorage.setItem(
          "cart",
          JSON.stringify([
            { dishId: dishId, dname:dname, quantity: quantity, Price: price, subtotal: subtotal },
          ])
        )
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify([
            { dishId: dishId, dname:dname, quantity: quantity, Price: price, subtotal: subtotal },
          ])
        )
      }
    }
    
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
                <Typography component="div" variant="h5">
                  {dish.dname}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {dish.des}
                  <br />
                  Ingredients: {dish.ing}
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  Price ${price}
                </Box>

                {imageKey && (
                  <CardMedia
                    className="media"
                    component="img"
                    sx={{ width: 151 }}
                    image={`http://localhost:8081/images/${imageKey}`}
                    alt="Live from space album cover"
                  />
                )}
                <ButtonGroup size="small" aria-label="small button group">
                  {counter > 1 ? (
                    <Button
                      key="one"
                      onClick={() => {
                        decrement();
                      }}
                    >
                      -
                    </Button>
                  ) : (
                    <Button
                      disabled
                      key="one"
                      onClick={() => {
                        decrement();
                      }}
                    >
                      -
                    </Button>
                  )}
                  ,
                  <Button key="two" diabled>
                    {counter}
                  </Button>
                  ,
                  <Button
                    key="three"
                    onClick={() => {
                      increment();
                    }}
                  >
                    +
                  </Button>
                  ,
                </ButtonGroup>
                <Button
                  style={{ marginLeft: 30 }}
                  onClick={() => addToCart(id, counter,dname,price)}
                  disabled={counter===0}
                >
                  {" "}
                  Add to cart
                </Button>
              </div>
            </div>
          </React.Fragment>,
          document.body
        )
      : null;
  const { isShowing, toggle } = useModal();
  return (
    <div className="dishcard">
      <Modal isShowing={isShowing} hide={toggle} />
      <Card
        class
        Name="root"
        style={{
          border: "1px solid grey",
          cursor: "pointer",
        }}
      >
        <Grid
          container
          direction={"row"}
          onClick={() => {
            toggle();
            setdish({ dname, des, ing, imageKey, price });
          }}
        >
          <Grid
            container
            item
            xs={6}
            style={{
              padding: "20px",
            }}
          >
            <Grid container item>
              <Typography component="div" variant="h5">
                {dname}
              </Typography>
            </Grid>
            <Grid container item>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {des}
                <br />
                Ingredients: {ing}
              </Typography>
            </Grid>
            <Grid container item>
              Price ${price}
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {imageKey && (
              <CardMedia
                className="media"
                component="img"
                sx={{ width: 151 }}
                image={`http://localhost:8081/images/${imageKey}`}
                alt="Live from space album cover"
              />
            )}
          </Grid>
        </Grid>
        {/* <Box sx={{ maxWidth: 345, minWidth: 345 }}>
          <CardContent
            sx={{ flex: "1 0 auto" }}
            onClick={() => {
              toggle();
              setdish({ dname, des, ing, imageKey, price });
            }}
          >
            <Typography component="div" variant="h5">
              {dname}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {des}
              <br />
              Ingredients: {ing}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            Price ${price}
          </Box>
        </Box>
        {imageKey && (
          <CardMedia
            className="media"
            component="img"
            sx={{ width: 151 }}
            image={`http://localhost:8081/images/${imageKey}`}
            alt="Live from space album cover"
          />
        )} */}
      </Card>
    </div>
  );
}

export default Dishes;
