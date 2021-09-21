import React from 'react' 
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


function Dishes({dname, des, ing, imageKey, price}) {
    return (
        <div>
            <Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                     {dname}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {des} {ing} 
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          {price}
        </Box>
      </Box>
      {imageKey && 
      <CardMedia
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