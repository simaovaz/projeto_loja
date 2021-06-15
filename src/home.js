import React, { useState, useEffect} from 'react';
import axios from "axios";


function Home(props) {
    const user= localStorage.getItem('our_token');
    const [state, changeState] = useState("")

    useEffect(() => {

        axios.post("http://localhost:3000/store-users/retorna", { token: localStorage.getItem('our_token')}).then( res =>{
            console.log(res);
            changeState(res.data.username)
        })
    }, [])

    if(state){
        return <p> olá {state}</p>
    }
    else{
        return <p> nada para ver </p>
    }
    
}

export default Home;