import React from 'react' 


const Restaurantpic = ({key, imgKey}) =>{
    return (
        <div className = "cardres">
        
        <div>
           
            {imgKey && <img style={{
    alignSelf: 'center',
    height: '400px',
    width: '100%',
    borderWidth: 1,
    marginBottom: 50
    
  }} src={`http://localhost:8081/images/${imgKey}`} className="showProfile_img"  />}
             </div>
    
    </div>
    )
}

export default Restaurantpic
