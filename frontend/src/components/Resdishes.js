import React from 'react' 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import { BrowserRouter as Router, useHistory } from 'react-router-dom'
import Modal from "react-modal";
 

function Resdishes({id, dname, des, ing, imageKey , price}) {

  const [dishes, setDishes] = React.useState([])
  const history= useHistory();
  const deleteDish =  () =>{

     axios.post(`http://localhost:8081/restaurant/deletedish/${id}`,{})
    .then(responseData => {
        if (responseData.data.error) {
           // M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
        }
        else {
                //setDishes(responseData.data)
                //console.log(" dishes",responseData.data)
                
                //console.log("resss ",customerData);
                //localStorage.setItem('dish', JSON.stringify(responseData.data));
            
        }
    })

}

    return (
        <div className = 'dishcard' sx={{ display: 'flex' }}>
            <Card class Name=  "root" sx={{ display: 'flex' }} >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                     {dname}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {des}
            <br/>
            Ingredients: {ing} {id}
          </Typography>
        </CardContent>
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
      <CardActions>
     
        <Button size="small"onClick={() => {
          localStorage.setItem('dishId',JSON.stringify(id))
          history.push(`/editdish/${id}`);}
          } >Edit</Button>
        <Button size="small" onClick= {deleteDish}>Delete</Button>
      </CardActions>
    </Card>
        </div>
    )
}

export default Resdishes;