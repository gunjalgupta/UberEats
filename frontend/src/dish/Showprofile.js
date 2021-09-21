import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Avatar } from "@material-ui/core"
import './Showprofile.css'

const Showprofile = () => {
    const [key, setKey] = useState();
    const [images, setImages] = useState();
    useEffect(() => {
        const getkey = async () => {
            try{
                const resId = {
                    restaurantId : JSON.parse(localStorage.getItem("dish")).dishId
                }
                const res = await axios.post("http://localhost:8081/dish/key", resId)
                console.log("------",res)
                setKey(res.data.key)
                }catch(err){
                    console.log(err)
                }
            } 
            getkey()
        }, [])
    return (
        <div>
            <div className="showProfile">
                {key && <img src={`http://localhost:8081/images/${key}`} className="showProfile_img"/>}
            </div>
        </div>
    )
}

export default Showprofile;