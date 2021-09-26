import React from 'react' 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import ReactDOM from 'react-dom';



function Dishes({dname, des, ing, imageKey , price}) {
 
  const [dish, setdish] = useState([])
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
                     {dish.dname}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {dish.des} 
            <br/>
            Ingredients: {dish.ing} 
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              Price ${price}
        </Box>
          {imageKey && 
      <CardMedia className= "media"
        component="img"
        sx={{ width: 151 }}
        image={`http://localhost:8081/images/${imageKey}`}
        alt="Live from space album cover"
      />}
      </div>
    </div>
  </React.Fragment>, document.body
) : null;
const {isShowing, toggle} = useModal();
    return (
        <div className = 'dishcard'>
            <Card class Name=  "root" sx={{ maxWidth: 345 , minWidth : 345}}>
                <Box sx={{ maxWidth: 345 , minWidth : 345}}>
                <CardContent sx={{ flex: '1 0 auto' }} onClick={()=>{
                  toggle();
                  setdish({dname, des, ing, imageKey, price})
                }} >
                
      <Modal
        isShowing={isShowing}
        hide={toggle}
      />
 

                <Typography component="div" variant="h5">
                     {dname}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {des} 
            <br/>
            Ingredients: {ing} 
          </Typography>
        </CardContent >
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              Price ${price}
        </Box>
      </Box>
      {imageKey && 
      <CardMedia className= "media"
        component="img"
        sx={{ width: 151 }}
        image={`http://localhost:8081/images/${imageKey}`}
        alt="Live from space album cover"
      />}
    </Card>
        </div>
    )
}

export default Dishes;