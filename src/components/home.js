import React, { useState, useEffect } from 'react';
import axios from "axios";


function Home(props) {
    const user = localStorage.getItem('our_token');
    const [state, changeState] = useState("")

    useEffect(() => {

        axios.post("http://localhost:3000/store-users/retorna", { token: localStorage.getItem('our_token') }).then(res => {
            console.log(res);
            changeState(res.data.username)
        })
    }, [])

    if (state) {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="main-container">
                    <p> Hello {state}!</p>
                </div>
            </div>
        )
    }
    else {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="main-container">
                    <p> Nothing to see here </p>
                </div>
            </div>
        )
    }

}

export default Home;