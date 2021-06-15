const initialState = {
    counter : null,
    loggedIn:false
}

const reducer = (state= initialState, action) =>{
    //console.log(action.payload);
    if(action.type=== "CHANGE"){
        state.counter = {
            counter: action.payload,
            loggedIn: true
        }
    }
    //console.log(state);
    return state
}

export default reducer;