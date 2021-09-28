const initialState = {
    user:{},
}

const reducer = (state= initialState, action)=>{

    switch(action.type){
        case "LOGIN":
            console.log("login succesful");
            return {...state, user: action.payload}
        case "LOGOUT":
            console.log("logout successful")
            return{...state, user:null}
        default:
            return state;

    }
}
export default reducer;