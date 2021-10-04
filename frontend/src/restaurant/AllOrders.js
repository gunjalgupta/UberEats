import React, { useEffect , useState} from "react";
import MaterialTable from "material-table";
import { forwardRef } from 'react';
import { Link } from 'react-router-dom'

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { useDispatch } from "react-redux";
import { logoutRestaurant } from "../actions/resActions";
import { BrowserRouter as Router, useHistory } from 'react-router-dom'
import axios from "axios";



function AllOrders() {
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
      };

    const history = useHistory()
    const dispatch = useDispatch()
    const [data, setData] = useState([])
    const [status, setStatus] = useState([])

    const [headbg,setheadbg]=useState('transparent');
    const [shadow,setshadow]=useState('none');



  window.addEventListener('scroll',()=>{
    if(window.scrollY>=50){
      setheadbg('#FFFFFF');
      setshadow('rgb(226 226 226) 0px -2px 0px inset');

    }
    else{
      setheadbg('transparent');
      setshadow('none');
     


    }
  })

  function signout(){
    dispatch(logoutRestaurant());
    localStorage.setItem("restaurant",null);
    history.push("/")
  }

  useEffect(()=>{
    const restaurantId =  JSON.parse(localStorage.getItem("restaurant")).restaurantId;
    axios
    .post(`http://localhost:8081/order/getresorders/${restaurantId}`, {})
    .then((responseData) => {
      console.log("res", responseData);
      if (responseData.data.error) {
        console.log("res", responseData);
        // M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
      } else {
        //setcustomerData(responseData.data)
        setData(responseData.data);
        console.log("restaurant", responseData.data);
        //console.log("resss ",customerData);
        //localStorage.setItem("restaurant", JSON.stringify(responseData.data));
      }
    });

  },[status])
  
    const [columns, setColumns] = useState([
      { title: 'Invoice number', field: 'orderId' ,editable: 'never'},
      { title: 'Customer name', field: 'cname' ,editable: 'never'},
      { title: 'Email', field: 'email', initialEditValue: 'initial edit value' , editable: 'never'},
      { title: 'Contact Number', field: 'mobileNo', type: 'numeric' , editable: 'never'},
      {
        title: 'Order Status',
        field: 'ostatus',
        lookup: { "placed": 'Placed', "Preparing": 'Preparing' },
      },
    ]);
  
    const saveStatus = async (ostatus,orderId) =>{
        const req = { ostatus: ostatus,
        orderId: orderId}
        //const restaurantId =1
        await axios.post("http://localhost:8081/order/status",req)
        .then(responseData => {
            if (responseData.data.error) {
                console.log("res",responseData);
               // M.toast({ html: responseData.data.error, classes: "#c62828 red darken-3" })
            }
            else {
              console.log(" dishes",responseData.data)
                    //setcustomerData(responseData.data)
                    //setDishes(responseData.data)
                    
                    //console.log("resss ",customerData);
                    //localStorage.setItem('dish', JSON.stringify(responseData.data));
                
            }
        })
  
    }
  
    return (
       <div>
        <div className="header__upper">
           <div className="header__upperheader"  style={{backgroundColor:headbg,boxShadow:shadow}}   >
             <div className="header__upperheaderleft">
             <Link to='/rhome'>
                <img
                    src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg "
                     alt="uber eats" /></Link>
            </div>
            {/* <div className="header__upperheadercenter"   >
               <LocationOn />
               <input type="text" placeholder="What are you craving? " />
            </div> */}
            
            <div className="header__upperheaderright" onClick={signout}>
                 <p> Sign out </p>
            </div>
            {/* <div className="header__upperheaderright">
                 <p> Add dishes </p>
            </div> */}
           </div>
        </div> 
      <div style={{paddingTop:90, paddingLeft:20, paddingRight:20}}>
      <MaterialTable
        icons={tableIcons}
        title="All Orders"
        columns={columns}
        data={data}
        
        cellEditable={{
          onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
            return new Promise((resolve, reject) => {
              console.log('newValue: ' + newValue);
              console.log('newValue: ' + rowData.orderId);
              setStatus(newValue);
              saveStatus(newValue, rowData.orderId)
              setTimeout(resolve, 1000);
            });
          }
        }}
      />
      </div> 
      </div>
    )
  }
  
  export default AllOrders;