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
                        changeTotal((old) => old + (item.amount * item.price));
                    })
                }
                if (res.data.orders.length > 0) {
                    res.data.orders.forEach(order => {
                        changeOrders((old) => [...old, order]);

                    })
                }
            })
        }

    }, [id])

    const deleteItem = (ID) => {
        const oldState = state;
        const newCart = oldState.filter(item => item.id != ID);
        changeState(newCart);
        axios.patch(`http://localhost:3000/store-users/${id}`, {
            cart: newCart
        }).then(res => {
            console.log(res)
        })
    }

    const changeProduct = (string, funcId) => {
        let oldState = state;
        const oldTotal = total;
        let newTotal;
        console.log(typeof total)
        oldState.forEach(item => {
            if (item.id == funcId) {
                if (string == "+") {
                    item.amount += 1;
                    newTotal = oldTotal + item.price;
                    console.log("somei")
                } else if (string == "-" && item.amount == 1) {
                    item.amount = 1;
                    console.log("era 1 portanto fiquei igual")
                }
                else {
                    item.amount -= 1;
                    newTotal = oldTotal - item.price;
                    console.log("subtraí")
                }

            }
            if (string == "remove") {
                oldState = oldState.filter(item => item.id != funcId);
                newTotal = newTotal - (item.price*item.amount);
                console.log('removeu')
            }
        })
        changeTotal(newTotal);
        changeState(oldState);
        axios.patch(`http://localhost:3000/store-users/${id}`, {
            cart: oldState
        }).then(res => {
            console.log(res)
        })
    }

    const seeTotal = () => {
        console.log(total);
        console.log(state)
    }
    if (state.length > 0) {

        return (
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
                <div className="cenas">
                    <p> Cart total: {total.toFixed(2)} </p>
                    {state.map(item => {

                        return (
                            <div key={item.id + Math.random() * 1000} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <div>
                                    <img alt="product" src={item.image} width="200px" height="300px" />
                                </div>

                                <div>
                                    <span> Amount : {item.amount} <button onClick={() => changeProduct("+", item.id)}> + </button> <button onClick={() => changeProduct("-", item.id)} > - </button></span>
                                    <p> {item.title} </p>
                                    <p> Price: {item.price} € </p>
                                    <button onClick={() => changeProduct("remove", item.id)}> Remove from cart </button>
                                    <button onClick={seeTotal}> teste</button>
                                </div>

                            </div>
                        )
                    })}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <button> <Link to={{
                        pathname: "/order",
                        state: {
                            cart: state,
                            id: id,
                            total: total,
                            orders: orders

                        },
                    }}> Finalize order  </Link> </button>
                </div>

            </div>


        )
    } else {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="main-container">
                    <p> Your shopping cart is empty! </p>
                </div>
            </div>

        )
    }

}

export default ShoppingCart;