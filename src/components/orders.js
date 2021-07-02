import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Orders = () => {

    const [state, changeState] = useState([]);
    const [id, setID] = useState("");

    useEffect(() => {
        axios.post("http://localhost:3000/store-users/retorna", { token: localStorage.getItem('our_token') }).then(res => {
            setID(res.data.id);
        })
        if (id) {
            axios.get(`http://localhost:3000/store-users/${id}`).then(res => {
                res.data.orders.forEach(item => {
                    changeState((old) => [...old, item])
                })
            })
        }

    }, [id])

    return (
        <div style={{ display: "flex", flexDirection: "row", marginTop: "50px" }}>

            <div >

                <ul style={{ display: "flex", flexDirection: "column" , maxHeight:"156px"}}>
                    <li class="some" > <Link to="/signin" style={{ color: "black" }}> Profile </Link>   </li>
                    <li class="some" > <Link to="/orders" style={{ color: "white", backgroundColor: "black", padding: "5px" }}> Orders </Link></li>
                    <li class="some" > <Link to="/settings" style={{ color: "black" }}> Settings </Link> </li>

                </ul>
            </div>
            <div style={{ width: "50%" }}>
                
                {state.map(item => {
                    let len=0;
                    return (
                        <div style={{border: "1px solid black", margin: "10px", width:"120%", position: "relative"}}>
                            <p> Order {item.id}</p>
                            <p> Total: {item.total} € </p> <br></br>
                            
                            {item.products.map(innerItem=>{
                                len+= innerItem.amount
                                return (
                                    <div> 
                                        <p> {innerItem.title} X  {innerItem.amount} | {innerItem.price} €</p>
                                        <p> </p>
                                    </div>
                                )
                            })}
                            <p style={{position:"absolute", top:"68px"}}> Items({len}): </p>
                        </div>

                    )
                })}
                
            </div>
        </div>
    )

}


export default Orders;