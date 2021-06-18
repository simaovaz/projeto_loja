import React from "react";



const Login = () => {

    const logar = () => {
        console.log("oi benji")
    }

    const tog = () =>{
        const login = document.getElementsByClassName('login')[0];
        login.classList.toggle('active');
    }

    return (
        <div className="login">
            <form onSubmit={logar}>
                <div>
                    <label> Username </label>
                    <input type="text"></input>
                </div>
                <div>
                    <label> Password </label>
                    <input type="password"></input>
                </div>
                <button type="submit"> Login </button>
            </form>
            <p> Não tens conta ainda? regista-te <button onClick={tog}> aqui !</button></p>
        </div>
    )
}

export default Login;