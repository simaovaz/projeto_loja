import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect} from "react";
import Order from "./order";


const Checkout = () => {

    const [state, changeState] = useState([]);
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
                        changeTotal((old) => old + item.price);
                        changeState((old) => [...old, item])
                    })
                }
            })
        }

    }, [id])

    return (
        <div>
            <p> tas na checkout </p>
            <p> o teu pedido : </p>

            <div>
                {state.map(item => {
                    return (
                        <div key={item.id}>
                            <p> item: {item.title} </p>
                            <p> preço: {item.price} </p>
                            <span> quantidade : 1 <button> + </button> <button> - </button></span>
                        </div>
                    )
                })}
                <p> Total {total.toFixed(2)}</p>
            </div>
            <button> <Link to={{
                pathname: "/order",
                state: {
                    cart: state,
                    id: id,
                    total:total
                },
            }}> Finalize order  </Link> </button>
            <button> <Link to="/signin"> Ir para sign in </Link> </button>
        </div>
    )
}

export default Checkout;