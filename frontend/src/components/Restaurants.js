import React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import '../customer/Restaurant.css'
import { Link } from 'react-router-dom'

const Restaurants = ({Name, Opens_at,imageKey, key}) =>{
    return (
        <div className = "card_res">
        <Link to='/resprofile'>
        <Card sx={{ maxWidth: 345 }} className="cardd_res">
      <CardHeader
        title={Name}
        subheader= {Opens_at}      
        />
        {imageKey && 
        <CardMedia
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
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
        </Link>
    </div>
    )
}

export default Restaurants
