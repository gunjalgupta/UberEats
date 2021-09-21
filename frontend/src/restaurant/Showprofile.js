import React, {useState, useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
import { Avatar } from "@material-ui/core"
import './Showprofile.css'

const Showprofile = () => {
    const user = useSelector((state) => state.user);
    const [key, setKey] = useState();
    const [images, setImages] = useState();
    useEffect(() => {
        const getkey = async () => {
            try{
                const resId = {
                    restaurantId : JSON.parse(localStorage.getItem("restaurant")).restaurantId
                }
                const res = await axios.post("http://localhost:8081/restaurant/key", resId)
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