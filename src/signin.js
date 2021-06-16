import './App.css';
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import cenas from './cena';
import Login from "./login";


function Signin(props) {

    const [flag, changeFlag] = useState(0);
    const [temp, changeState] = useState(
        {
            username: null,
            email: null,
            password: null
        });


    useEffect(() => {

        axios.post("http://localhost:3000/store-users/retorna", { token: localStorage.getItem('our_token')}).then( res =>{
            console.log(res);
            changeState( {...temp, username: res.data.username})
        })
        /*
        axios.post('http://localhost:3000/store-users/cenas', { token: localStorage.getItem('our_token') }).then(res => {
            changeState({ ...temp, email: res.data.email });
        })
        */
    }, [flag]);
    

    const mudarUser = (e) => {
        e.preventDefault();
        changeState({ ...temp, username: e.target.value });
    }


    const mudarEmail = (e) => {
        e.preventDefault();
        changeState({ ...temp, email: e.target.value });
    }
    const mudarPass = (e) => {
        e.preventDefault();
        changeState({ ...temp, password: e.target.value });
    }


    const registar = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/store-users', {
            username: temp.username,
            email: temp.email,
            password: temp.password,
            cart: [],
            orders: []
        }).then(res => {
            if (res.data.status === "success") {
                localStorage.setItem("our_token", res.data.token);
                changeFlag(flag + 1);
            }
            else {
                console.log("what an error");
            }
        }).catch(err => {
            console.log(err);
        })


    }
    

    const logout = () => {
        localStorage.clear();
        changeFlag(flag + 1)
    }

    const tog = () => {
        const signin = document.getElementsByClassName('signin')[0];
        signin.classList.toggle('active');
        const login = document.getElementsByClassName('login')[0];
        login.classList.toggle('active');
    }

    const tog2 = () =>{
        const login = document.getElementsByClassName('login')[0];
        login.classList.toggle('active');
        const signin = document.getElementsByClassName('signin')[0];
        signin.classList.toggle('active');
    }

    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/store-users/login", {
            username: temp.username,
            password: temp.password,
        }).then(res => {
            if (res.data.status === "success") {
                localStorage.setItem("our_token", res.data.token);
                changeFlag(flag + 1);
            }
            else {
                console.log("what an error");
            }
        }).catch(err => {
            console.log(err);
        })


    }

    let cenas;
    if (localStorage.getItem('our_token')) {
        cenas = (

            <div style={{ width: "100%", height: "40vw", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <p>já estás logado! Bem-vindo {temp.username} ! </p>
                <button onClick={logout}> Log out</button>
            </div>
        )
    }
    else {

        cenas = (

            <div>
                <div className="signin" style={{ width: "100%", height: "40vw", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <form onSubmit={registar}>
                        <div>
                            <label> Username</label>
                            <input type="text" onChange={mudarUser} />
                        </div>
                        <div>
                            <label> Email</label>
                            <input type="email" onChange={mudarEmail} />
                        </div>
                        <div>
                            <label> Password</label>
                            <input type="password" onChange={mudarPass} />
                        </div>
                        <button type="submit" > Registar </button>
                        <p> Já registado? É só fazer <button onClick={tog} > login </button></p>
                    </form>
                </div>
                <div className="login">
                    <form onSubmit={login}>
                        <div>
                            <label> Username </label>
                            <input type="text" onChange={mudarUser}></input>
                        </div>
                        <div>
                            <label> Password </label>
                            <input type="password" onChange={mudarPass}></input>
                        </div>
                        <button type="submit"> Login </button>
                    </form>
                    <p> Não tens conta ainda? regista-te <button onClick={tog2}> aqui !</button></p>
                </div>
                
            </div>


        );
    }

    return cenas;
}

const mapsStateToProps = state => {
    return {
        counter: state.counter,
        loggedIn: state.loggedIn
    }
}

const mapsDispatchToProps = dispatch => {
    return {
        onName: (email) => dispatch({ type: "CHANGE", payload: email })
    }
}

export default connect(mapsStateToProps, mapsDispatchToProps)(Signin);
