import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios';
import M from 'materialize-css'
import { Formik } from 'formik';
import { Button } from 'react-bootstrap'
import {  useHistory } from 'react-router-dom'
import { CountryDropdown, RegionDropdown } from "react-country-region-selector-material-ui-new";
import './UpdateProfile.css'
import Showprofile from './Showprofile';
import Profilepic from './Profilepic';
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import "materialize-css/dist/css/materialize.min.css";

const UpdateProfile = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [customerData, setcustomerData] = useState([])
    const [image, setImage] = useState([])
    const [url, setUrl] = useState([])
    const [dob, setDob] = useState([])
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


  function signout(){
    dispatch(logout());
    localStorage.setItem("customer",null);
    history.push("/")
  }

    useEffect( () => {
        const customerId =  JSON.parse(localStorage.getItem("customer")).customerId;

        axios.get(`/api/customerprofile/${customerId}`,{})
        .then(response => {
            console.log("res",response);
            if (response.data.error) {
                console.log("res",response);
                M.toast({ html: response.data.error, classes: "#c62828 red darken-3" })
            }
            else {

                    setcustomerData(response.data[0])
                    console.log(response.data[0])
                    //console.log("resss ",customerData);
                    localStorage.setItem('customer', JSON.stringify(response.data[0]));

                    setDob((customerData.DOB == null )? customerData.DOB : customerData.DOB.substr(0,10));
                
            }
        })
       
            // console.log("res",response);
            // if (response.data.error) {
            //     console.log("res",response.data[0]);
            //    // M.toast({ html: response.data[0].error, classes: "#c62828 red darken-3" })
            // }
        
            
    }, []
        );


return (customerData.email?
   
    
                    <section className="section" id="about">
                <div className="update" >
                   
                    <div className="header__upper">
                <div className="header__upperheader"  style={{backgroundColor:headbg,boxShadow:shadow}}   >
                 
                  <div className="header__upperheaderleft">
                  <Link to = "/chome">
                     <img
                         src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg "
                          alt="uber eats" />  </Link>
                 </div>
                
                 {/* <div className="header__upperheadercenter"   >
                 
                    <input type="text" placeholder="What are you craving? " />
                 </div> */}

                 <div className="header__upperheaderright"  onClick={signout}>
                      <p> Sign out </p>
                 </div>
                </div>
             </div>
                   
                    <br />
                    <br />
                    <div className= "details_img">
                    <Showprofile />
                    <Profilepic />
                    </div>
                    <div className="row" >
                    
                   
                    {
                        
                    
                        <Formik
                            style={{ width: '40%' }}
                            initialValues={{
                                cname: customerData.cname,
                                email: customerData.email,
                                mobileNo : customerData.mobileNo,
                                city: customerData.city,
                                stateId: customerData.stateId,
                                countryId: customerData.countryId,
                                
                                DOB: customerData.DOB?customerData.DOB.substr(0,20):null,
                                nickname: customerData.nickname,
                                about: customerData.about,
                                
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
                                const customerId = JSON.parse(localStorage.getItem("customer")).customerId
                                console.log(customerId)
                                axios.post(`/api/customerprofile/updatedetails/`, { customerId ,values: values})
                                    .then(response => {
                                        console.log("update",response)
                                        if (response.data.error) {
                                            M.toast({ html: response.data.error, classes: "#c62828 red darken-3" })
                                        }
                                        else {
                                            toast.success('Updated details successful', {
                                                position: "top-right",
                                                autoClose: 5000,
                                                hideProgressBar: true,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                                });
                                            
                                        }
                                    }).catch(err => {
                                        console.log(err)
                                    })
                                //history.push('/chome')
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
                                    <h4 className="font-weight-normal" style={{ fontFamily: 'UberMoveText-Medium,Helvetica,sans-serif' }}> Update details</h4>
                                    <br />
                                    
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label style={{ width: "100%" }}>Customer Name<input required type="text" style={{ width: "100%", borderRadius: 0 }} className="form-control" id="cname"  onBlur={handleBlur} onChange={handleChange} value={values.cname} /></label>
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
                                                <label style={{ width: "100%" }}>Description <input type="text" style={{ width: "100%", borderRadius: 0 }} className="form-control" id="about" onBlur={handleBlur} onChange={handleChange} value={values.about} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Date of birth <input type="date" style={{ width: "100%", borderRadius: 0 }} className="form-control" id="DOB" onBlur={handleBlur} onChange={handleChange} value={values.DOB} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <div className="form-group" >
                                                <label style={{ width: "100%" }}>Nickname <input type="text" style={{ width: "100%", borderRadius: 0 }} className="form-control" id="nickname" onBlur={handleBlur} onChange={handleChange} value={values.nickname} /></label>
                                                <p className="help-block text-danger"></p>
                                            </div>
                                            <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
                                    
                                        </div>
                                    </div>
                                    <Button type="submit" className= "update_button"style={{ width: "100%", borderRadius: 5 }} >
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
            </section>:<h1></h1> 
        


    // <form onSubmit={submit}>
    //   <input
    //     type="text"
    //     name="user name "
    //     value={customerData.cname}
    //     onChange={e => setUser({ ...user, name: e.target.value })}
    //   />
    //   {user.errors.name && <p>{user.errors.name}</p>}

    //   <input
    //     type="email"
    //     name="user[email]"
    //     value={user.email}
    //     onChange={e => setUser({ ...user, email: e.target.value })}
    //   />
    //   {user.errors.name && <p>{user.errors.name}</p>}

    //   <input type="submit" name="Sign Up" />
    // </form>
          
  )
}
  export default UpdateProfile;