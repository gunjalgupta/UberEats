import React, { useState, useEffect, useContext } from 'react'


import { Link } from 'react-router-dom'
import axios from 'axios';
import M from 'materialize-css'
import { Formik } from 'formik';
import { Button } from 'react-bootstrap'
import { BrowserRouter as Router, useHistory } from 'react-router-dom';
import { CountryDropdown, RegionDropdown } from "react-country-region-selector-material-ui-new";
import './UpdateProfile.css'
import Showprofile from './Showprofile';
import Profilepic from './Profilepic';

const UpdateProfile = () => {
    const history = useHistory()
    const [restaurantData, setRestaurantData] = useState([])
    const [image, setImage] = useState([])
    const [url, setUrl] = useState([])
    const [headbg,setheadbg]=useState('transparent');
    const [shadow,setshadow]=useState('none');
    const [inputdisplay,setinputdisplay]=useState(0);


  window.addEventListener('scroll',()=>{
    if(window.scrollY>=50){
      setheadbg('#FFFFFF');
      setshadow('rgb(226 226 226) 0px -2px 0px inset');
      setinputdisplay(1);

    }
    else{
      setheadbg('transparent');
      setshadow('none');
      setinputdisplay(0);


    }
  })


    //const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        const restaurantId =JSON.parse(localStorage.getItem("restaurant")).restaurantId;
        console.log(restaurantId);
        console.log(JSON.parse(localStorage.getItem("restaurant")).restaurantId)

        axios.post(`http://localhost:8081/restaurant/profile/${restaurantId}`, {
        }).then(response => {
            console.log("res",response);
            if (response.data.error) {
                console.log("res",response);
                M.toast({ html: response.data.error, classes: "#c62828 red darken-3" })
            }
            else {

                    setRestaurantData(response.data[0])
                    console.log(response.data[0])
                    console.log("resss ",restaurantData);
                    localStorage.setItem('restaurant', JSON.stringify(response.data[0]));
                
            }
        })
    },[]
        );
        
    // const favouriteRestaurant = (id) => {
    //     fetch('/like', {
    //         method: "put",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + localStorage.getItem("jwt")
    //         },
    //         body: JSON.stringify({
    //             postId: id
    //         })
    //     }).then(res => res.json())
    //         .then(result => {
    //             //   console.log(result)
    //             const newData = data.map(item => {
    //                 if (item._id == result._id) {
    //                     return result
    //                 } else {
    //                     return item
    //                 }
    //             })
    //             setData(newData)
    //         }).catch(err => {
    //             console.log(err)
    //         })
    // }
    // const unfavouriteRestaurant = (id) => {
    //     fetch('/unlike', {
    //         method: "put",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + localStorage.getItem("jwt")
    //         },
    //         body: JSON.stringify({
    //             postId: id
    //         })
    //     }).then(res => res.json())
    //         .then(result => {
    //             //   console.log(result)
    //             const newData = data.map(item => {
    //                 if (item._id == result._id) {
    //                     return result
    //                 } else {
    //                     return item
    //                 }
    //             })
    //             setData(newData)
    //         }).catch(err => {
    //             console.log(err)
    //         })
    // }

    // const updateRestaurant = (text, postId) => {
    //     fetch('/comment', {
    //         method: "put",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + localStorage.getItem("jwt")
    //         },
    //         body: JSON.stringify({
    //             postId,
    //             text
    //         })
    //     }).then(res => res.json())
    //         .then(result => {
    //             console.log(result)
    //             const newData = data.map(item => {
    //                 if (item._id == result._id) {
    //                     return result
    //                 } else {
    //                     return item
    //                 }
    //             })
    //             setData(newData)
    //         }).catch(err => {
    //             console.log(err)
    //         })
    // }

    // const deleteRestaurant = (postid) => {
    //     fetch(`/deletepost/${postid}`, {
    //         method: "delete",
    //         headers: {
    //             Authorization: "Bearer " + localStorage.getItem("jwt")
    //         }
    //     }).then(res => res.json())
    //         .then(result => {
    //             console.log(result)
    //             const newData = data.filter(item => {
    //                 return item._id !== result._id
    //             })
    //             setData(newData)
    //         })
    // }
    return (restaurantData.email?
        <div className="update">
            <section className="section" id="about">
                <div className="update" >
                    
                    <div className="header__upper">
                <div className="header__upperheader"  style={{backgroundColor:headbg,boxShadow:shadow}}   >
                  <div className="header__upperheaderleft">
                    
                     <img
                         src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg "
                          alt="uber eats" />
                 </div>
                 {/* <div className="header__upperheadercenter"   >
                 
                    <input type="text" placeholder="What are you craving? " />
                 </div> */}

                 <div className="header__upperheaderright">
                      <p> Sign out </p>
                 </div>
                </div>
             </div>
             <div className= "details_img">
                    <Showprofile />
                    <Profilepic />
                    </div>
                    <br />
                    <br />
                
                    <br />
                    <br />
                    <div className="row" style = {{ justifyContent : 'center'}}>
                    
                   
                    {
                        <Formik
                            style={{ width: '40%' }}
                            initialValues={{
                                rname: restaurantData.rname,
                                email: restaurantData.email,
                                mobileNo : restaurantData.mobileNo,
                                city: restaurantData.city,
                                stateId: restaurantData.stateId,
                                countryId: restaurantData.countryId,
                                fromTime: restaurantData.fromTime,
                                toTime: restaurantData.toTime,
                                rdesc: restaurantData.rdesc,
                                pickup :restaurantData.pickup,
                                delivery : restaurantData.delivery,
                                veg : restaurantData.veg,
                                nonVeg : restaurantData.nonVeg,
                                vegan : restaurantData.vegan
                            }}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                console.log(values)
                                // if (image) {
                                //     const data = new FormData()
                                //     data.append("api_key", '757831828593633');
                                //     data.append("file", image)
                                //     data.append("upload_preset", "l3ihyhha")
                                //     data.append("cloud_name", "du8oeufnp")
                                //     fetch("https://api.cloudinary.com/v1_1/du8oeufnp/image/upload", {
                                //         method: "post",
                                //         body: data
                                //     }).then(res => res.json())
                                //         .then(res => {
                                //             console.log(res + "Hiii")
                                //             setUrl(res.url)
                                //         })
                                //         .catch(err => {
                                //             console.log(err)
                                //         })
                                // }
                                const restaurantId = JSON.parse(localStorage.getItem("restaurant")).restaurantId
                                console.log(restaurantId)
                                axios.post(`http://localhost:8081/restaurant/updatedetails/`, { restaurantId ,values: values})
                                    .then(response => {
                                        console.log("update",response)
                                        if (response.data.error) {
                                            M.toast({ html: response.data.error, classes: "#c62828 red darken-3" })
                                        }
                                        else {
                                            console.log("update1",response)
                                            M.toast({ html: "Updated restaurant details successfully", classes: "#43a047 green darken-1" })
                                        }
                                    }).catch(err => {
                                        console.log(err)
                                    })
                                history.push('/restaurantDashboard')
                            }}>
                            {({
                                errors,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                                touched,
                                values
                            }) => (
                                <form id="contactForm" style={{ width: '40%' }} name="sentMessage" onSubmit={handleSubmit}>
                                    <h4 className="font-weight-normal" style={{ fontFamily: 'UberMoveText-Medium,Helvetica,sans-serif' }}> Update Restaurant Information</h4>
                                    <br />
                                     
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label style={{ width: "100%",border:"none" }}>Restaurant Name<input required style={{ width: "100%", borderRadius: 0 }} className="form-control" id="rname" type="text" onBlur={handleBlur} onChange={handleChange} value={values.rname} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}> Email <input required type="text" style={{ width: "100%", borderRadius: 0 }} className="form-control" id="email" onBlur={handleBlur} onChange={handleChange} value={values.email} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Contact Number <input required type="number" style={{ width: "100%", borderRadius: 0 }} className="form-control" id="mobileNo" onBlur={handleBlur} onChange={handleChange} value={values.mobileNo} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>City <input type="text" style={{ width: "100%", borderRadius: 0 }} className="form-control" id="city" onBlur={handleBlur} onChange={handleChange} value={values.city} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Country<CountryDropdown style={{ width: "100%" }}value={values.countryId} className="form-control" id="countryId" onBlur={handleBlur} onChange= {handleChange("countryId")} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                            <label>State  <RegionDropdown style={{ width: "100%" }} country={values.countryId} value={values.stateId} className="form-control" id="stateId" onBlur={handleBlur} onChange={handleChange("stateId") }/></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Description <input type="text" style={{ width: "100%", borderRadius: 0 }} className="form-control" id="rdesc" onBlur={handleBlur} onChange={handleChange} value={values.rdesc} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}> Opens at <input type="time" style={{ width: "100%", borderRadius: 0 }} className="form-control" id="toTime" onBlur={handleBlur} onChange={handleChange} value={values.toTime} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Closes at <input type="time" style={{ width: "100%", borderRadius: 0 }} className="form-control" id="fromTime" onBlur={handleBlur} onChange={handleChange} value={values.fromTime} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                            
                                                <label>Pickup <input type="checkbox" className="form-control" id="pickup" onBlur={handleBlur} onChange={handleChange} value={values.pickup} /></label>
                                                {/* <select value={values.pickup}>
                                                <option value="true" label="Yes" />
                                                <option value="false" label="No" />
                                                </select> */}
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                            
                                                <label style={{ width: "100%" }}> Delivery <input type="checkbox" className="form-control" id="delivery" onBlur={handleBlur} onChange={handleChange} value={values.delivery}  /></label>
                                                {/* <select value={values.delivery} >
                                                <option value="true" label="Yes" />
                                                <option value="false" label="No" />
                                                </select> */}
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Vegitarian options < input type="checkbox" className="form-control" id="veg" onBlur={handleBlur} onChange={handleChange} value={values.veg} /></label>
                                                {/* <select value={values.veg} >
                                                <option value="true" label="Yes" />
                                                <option value="false" label="No" />
                                                </select> */}
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Non-Vegetarian options <input type="checkbox" className="form-control" id="nonVeg" onBlur={handleBlur} onChange={handleChange} value={values.nonVeg} /></label>
                                                {/* <select value={values.nonVeg} >
                                                <option value="true" label="Yes" />
                                                <option value="false" label="No" />
                                                </select> */}
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Vegan options <input type="checkbox" className="form-control" id="vegan" onBlur={handleBlur} onChange={handleChange} value={values.vegan}/></label>
                                                {/* <select value={values.vegan} >
                                                <option value="true" label="Yes" />
                                                <option value="false" label="No" />
                                                </select> */}
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <Button type="submit" className= "update-button" style={{ width: "100%", borderRadius: 5 }}>
                                        Save changes
                                    </Button>
                                    <br />
                                    <br />
                                </form>
                            )}
                        </Formik>
}
                    </div>
                </div>
            </section>
        </div>:<h1></h1> 
    )
}

export default UpdateProfile;