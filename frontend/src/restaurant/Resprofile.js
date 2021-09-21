import React, { useEffect } from 'react' ;
import Dishes from '../components/Dishes'
import { BrowserRouter as Router, useHistory } from 'react-router-dom'
import axios from 'axios';


function Resprofile() {

    const history = useHistory()
    const [restaurant, setRestaurant] = React.useState([])
    const [dishes, setDishes] = React.useState([])

    useEffect(()=>{

        getRestaurant()
        getDishes()
    }, []);

    const getRestaurant = async () =>{
        //const customerId =  JSON.parse(localStorage.getItem("customer")).customerId;
        const restaurantId =1
        await axios.post(`http://localhost:8081/restaurant/profile/${restaurantId}`,{})
        .then(responseData => {
            console.log("res",responseData);
            if (responseData.data.error) {
                console.log("res",responseData);
               // M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
            }
            else {
                    //setcustomerData(responseData.data)
                    setRestaurant(responseData.data)
                    console.log("restaurant",responseData.data)
                    //console.log("resss ",customerData);
                    localStorage.setItem('restaurant', JSON.stringify(responseData.data));
                
            }
        })

    }

    const getDishes = async () =>{
        //const customerId =  JSON.parse(localStorage.getItem("customer")).customerId;
        const restaurantId =1
        await axios.post(`http://localhost:8081/restaurant/getdish/${restaurantId}`,{})
        .then(responseData => {
            console.log("res",responseData);
            if (responseData.data.error) {
                console.log("res",responseData);
               // M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
            }
            else {
                    //setcustomerData(responseData.data)
                    //setRestaurant(responseData.data)
                    console.log(" dishes",responseData.data)
                    //console.log("resss ",customerData);
                    localStorage.setItem('restaurant', JSON.stringify(responseData.data));
                
            }
        })

    }
    return (
        <div>
            {/* <Dishes key={} dname={} des={} ing={} price={} imageKey={} /> */}
        </div>
    )
}

export default Resprofile;