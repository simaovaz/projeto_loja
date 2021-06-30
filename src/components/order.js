import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


const Order = (props) => {

    const [cart, changeCart] = useState([]);
    const [buyingState, changeBuyingState] = useState(false);
    const [id, setID] = useState("");
    const [total, changeTotal] = useState(0);
    const [oldOrders, changeOldOrders] = useState([]);
    const [newOrder, changeNewOrder] = useState({
        id: "",
        products: [],
        total: 0
    });
    const location = useLocation();

    useEffect(() => {
        //console.log(location.state.orders);
        changeNewOrder({ ...newOrder, total: location.state.total, products: location.state.cart })
        changeTotal((old) => old + location.state.total);
        setID(location.state.id);
        changeOldOrders(location.state.orders);
        location.state.cart.forEach(item => {
            changeCart((old) => [...old, item]);

            //console.log(old);
        });

    }, []);

    useEffect(() => {
        console.log(buyingState);
        if (buyingState === true) {
            //console.log(newOrder);

            axios.patch(`http://localhost:3000/store-users/orders/${id}`, {
                orders: [...oldOrders, newOrder],
                cart: []
            }).then(res => {
                console.log(res);
            })

        }

    }, [buyingState])

    const orderForm = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/store-users-orders', {
            user_id: id,
            username: "rei delas",
            products: newOrder.products,
            price: newOrder.total
        }).then(res => {
            console.log(typeof res.data.order._id)
            changeNewOrder({ ...newOrder, id: res.data.order._id });
            changeBuyingState(true);

        });


    }
    if (!buyingState) {
        return (
            <div className="main-container">
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
                    <p> TOTAL: {total.toFixed(2)} € </p>
                    <button onClick={orderForm}> ORDER! </button>
                </form>
            </div>

        )
    } else {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="main-container">
                    <div> Your order has been submitted! </div>
                    <div> The tracking number is {newOrder.id} </div>
                </div>
            </div>
        )
    }

}

export default Order;