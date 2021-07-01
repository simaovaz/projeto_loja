import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";



const ShoppingCart = () => {

    const [state, changeState] = useState([]);
    const [orders, changeOrders] = useState([]);
    const [id, setID] = useState("");
    const [number, changeNumber] = useState(1);
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
                    res.data.orders.forEach(order => {
                        changeOrders((old) => [...old, order]);

                    })
                }
            })
        }

    }, [id])

    const deleteItem = (ID)=>{
        const oldCart= state;
        const newCart= oldCart.filter( item=> item.id != ID);
        console.log(id);
        changeState(newCart);
        axios.patch(`http://localhost:3000/store-users/${id}`,{
            cart: newCart
        }).then(res=>{
            console.log(res)
        })
    }

    const addProduct = (funcId) => {
        const oldState = state;
        const newState = oldState.concat(oldState.filter( item=> item.id== funcId ));
        console.log(newState);
        changeNumber((old)=> old+1)
        /*
        state.forEach( item =>{
            if(item.id==funcId){
                changeState( old=> [...old, item ]);
            }
        })
        */
    }

    if (state.length > 0) {

        return (
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
                <div className="cenas">

                    {state.map(item => {

                        return (
                            <div key={item.id} style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <div>
                                    <img alt="product" src={item.image} width="200px" height="300px" />
                                </div>

                                <div>
                                    <span> Amount : {number} <button onClick={() => addProduct(item.id)}> + </button> <button > - </button></span>
                                    <p> {item.title} </p>
                                    <p> Price: {item.price} € </p>
                                    <button onClick={()=>deleteItem(item.id)}> Remove from cart </button>
                                </div>

                            </div>
                        )
                    })}
                </div>
                <div style={{display:"flex", alignItems: "center"}}>
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