import '../index.css';
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "./form";
import LoginForm from "./login-form";
import { Link } from "react-router-dom";

function Signin(props) {

    const [flag, changeFlag] = useState(0);
    const [temp, changeState] = useState(
        {
            username: null,
            email: null,
            password: null
        });


    useEffect(() => {

        axios.post("http://localhost:3000/store-users/retorna", { token: localStorage.getItem('our_token') }).then(res => {
            console.log(res);
            changeState({ ...temp, username: res.data.username })
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
        const signin = document.getElementsByClassName('Signin')[0];
        signin.classList.toggle('active');
        const login = document.getElementsByClassName('login')[0];
        login.classList.toggle('active');
    }

    const tog2 = () => {
        const login = document.getElementsByClassName('login')[0];
        login.classList.toggle('active');
        const signin = document.getElementsByClassName('Signin')[0];
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

    const darken = (number) => {
        const items = document.getElementsByClassName('some');
        for (let i = 0; i < items.length; i++) {
            if (i == number) {
                items[i].classList.toggle('active');
            }
        }
    }

    let view;
    if (localStorage.getItem('our_token')) {
        view = (
            <div style={{ display: "flex", flexDirection: "row", marginTop: "50px" }}>

                <div>

                    <ul style={{ display: "flex", flexDirection: "column" }}>
                        <li class="some" > <Link to="/signin" style={{ color: "white", backgroundColor: "black", padding: "5px" }}> Profile </Link>   </li>
                        <li class="some"> <Link to="/orders" style={{ color: "black" }}> Orders </Link></li>
                        <li class="some" > <Link to="/settings" style={{ color: "black" }}> Settings </Link> </li>

                    </ul>
                </div>
                <div style={{ width: "50%" }}>
                    <p> You're logged in! Welcome {temp.username}! </p>
                </div>


                <div><button onClick={logout}> Log out</button> </div>

            </div>

        )
    }
    else {
        view = (
            <div style={{ display: "flex", flexDirection: "row", marginTop: "50px" }}>

                <div style={{position: "absolute", bottom:"20px"}}>

                    <ul style={{ display: "flex", flexDirection: "column" }}>
                        <li class="some" > <Link to="/signin" style={{ color: "white", backgroundColor: "black", padding: "5px" }}> Profile </Link>   </li>
                        <li class="some"> <Link to="/orders" style={{ color: "black" }}> Orders </Link></li>
                        <li class="some" > <Link to="/settings" style={{ color: "black" }}> Settings </Link> </li>

                    </ul>
                </div>
                <div>
                    <Form tog={tog} registar={registar} mudarUser={mudarUser} mudarEmail={mudarEmail} mudarPass={mudarPass}></Form>
                    <LoginForm mudarUser={mudarUser} mudarPass={mudarPass} login={login} tog2={tog2}></LoginForm>
                </div>
            </div>
        );
    }

    return view;
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
