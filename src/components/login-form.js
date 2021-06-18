const LoginForm = (props) => {

    return (
        <div className="login">
            <form onSubmit={props.login}>
                <div>
                    <label> Username </label>
                    <input type="text" onChange={props.mudarUser}></input>
                </div>
                <div>
                    <label> Password </label>
                    <input type="password" onChange={props.mudarPass}></input>
                </div>
                <button type="submit"> Login </button>
            </form>
            <p> Not signed up? Register <button onClick={props.tog2}> here !</button></p>
        </div>
    )
}


export default LoginForm;