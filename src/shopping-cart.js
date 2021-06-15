import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const ShoppingCart = () => {

    const [state, changeState] = useState([]);
    const [orders, changeOrders] = useState([]);
    const [id, setID] = useState("");
    const [total, changeTotal] = useState(0);



    useEffect(() => {
        axios.post("http://localhost:3000/store-users/retorna", { token: localStorage.getItem('our_token') }).then(res => {
            setID(res.data.id);

        })
        if (id) {
            axios.get(`http://localhost:3000/store-users/${id}`).then(res => {
                if (res.data.cart.length > 0) {
                    res.data.cart.forEach(item => {
                        changeState((old) => [...old, item]);
                        changeTotal((old) => old + item.price);
                    })
                }
                if (res.data.orders.length > 0) {
                    res.data.orders.forEach( order => {
                        changeOrders((old) => [...old, order]);
                        
                    })
                }
            })
        }

    }, [id])

    if (state.length > 0) {

        return (
            <div>
                <button> <Link to={{
                    pathname: "/order",
                    state: {
                        cart: state,
                        id: id,
                        total: total,
                        orders: orders

                    },
                }}> Finalize order  </Link> </button>
                {state.map(item => {
                    return (
                        <div key={item.id} style={{ width: "50%", display: "flex", flexDirection: "row", marginLeft: "100px", marginBottom: "20px"}}>
                            <div>
                                <img alt="product" src={item.image} width="200px" height="300px" />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", marginLeft: "100px" }}>
                                <div>
                                    <span> quantidade : 1 <button> + </button> <button> - </button></span>
                                    <p> {item.title} </p>
                                    <p> {item.price} </p>
                                </div>
                            </div>
                        </div>
                    )
                })}

            </div>


        )
    } else {
        return (
            <div>
                <p> O teu carrinho está vazio </p>
            </div>

        )
    }

}

export default ShoppingCart;