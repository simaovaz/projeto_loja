const Form = (props)=>{

    return (
    <div className="Signin" >
                    <form onSubmit={props.registar}>
                        <div>
                            <label> Username</label>
                            <input type="text" onChange={props.mudarUser} />
                        </div>
                        <div>
                            <label> Email</label>
                            <input type="email" onChange={props.mudarEmail} />
                        </div>
                        <div>
                            <label> Password</label>
                            <input type="password" onChange={props.mudarPass} />
                        </div>
                        <button type="submit" > Registar </button>
                        <p> Already registered? Just <button onClick={props.tog} > login! </button></p>
                    </form>
                </div>
    )
}

export default Form;