import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


const Order = (props) => {

    const [cart, changeCart] = useState([]);
    const [id, setID] = useState("");
    const [total, changeTotal] = useState(0);
    const [oldOrders, changeOldOrders] = useState([]);
    const [newOrder, changeNewOrder] = useState({
        id: (Math.random() * 9999999).toFixed(0),
        products: [],
        total: total
    });
    const location = useLocation();

    useEffect(() => {
        //console.log(location.state.orders);
        changeNewOrder({ ...newOrder, total: location.state.total })
        changeTotal((old) => old + location.state.total);
        setID(location.state.id);

        location.state.orders.forEach(order => {
            changeOldOrders([ ...oldOrders, order ]);

        })
        location.state.cart.forEach(item => {
            changeCart((old) => [...old, item]);
        })


    }, [])

    const orderForm = (e) => {
        e.preventDefault();
        console.log(cart, total, id);
        //const newOrders= [...orders,  ]

        /*
        axios.patch(`http://localhost:3000/store-users/orders/${id}`, {
            orders: orders
        }).then()

        */
    }

    const teste = () => {
        
        cart.forEach(item => {
            let old = newOrder.products;
            //const changed= old.products.concat(item);
            changeNewOrder( {...newOrder, products: [...old, item]})
            //console.log(changed);
            console.log(newOrder.products);

        })
        
    }

    const teste2= () =>{
        console.log(newOrder);
    }

    return (
        <div>
            <form>
                <div>
                    <label> Name </label>
                    <input type="text" />
                </div>
                <div>
                    <label> Email </label>
                    <input type="text" />
                </div>
                <div style={{ border: "1px solid black", width: "50%" }}>
                    <label> order </label>
                    {cart.map(item => {
                        return (
                            <div key={item.id}>
                                <p> item: {item.title} </p>
                                <p> preço: {item.price} € </p>

                            </div>
                        )
                    })}
                </div>
                <p> {total.toFixed(2)} € </p>
                <button onClick={orderForm}> ORDER! </button>
            </form>
            <button onClick={teste}> teste </button>
            <button onClick={teste2}> teste2222222 </button>
        </div>

    )
}

export default Order;