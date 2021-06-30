import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faCheck);

const Product = (props) => {

    const [state, changeState] = useState([]);
    const [cart, changeCart] = useState([]);
    const idParams = props.match.params.id;
    const [id, setID] = useState("");
    const [buyingState, changeBuyingState] = useState(false);



    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${idParams}`).then(data => {
            let temp = data.data;
            changeState(old => [...old, temp])
        })

        axios.post("http://localhost:3000/store-users/retorna", { token: localStorage.getItem('our_token') }).then(res => {
            setID(res.data.id);
            if (id) {
                axios.get(`http://localhost:3000/store-users/${id}`).then(res => {
                    res.data.cart.forEach(item => {
                        changeCart((old) => [...old, item])
                    })
                })
            }
        })
    }, [id]);


    var flag = 0;
    const shop = (e) => {
        e.preventDefault();
        const icon = document.getElementsByClassName('check-icon')[0];
        cart.forEach(item => {
            if (item.id == idParams) {
                flag = 1;
                console.log("produtos iguais");
                const item= document.getElementsByClassName('item-shop')[0];
                item.classList.toggle('active');
            }
        })
        if (flag === 0) {
            icon.classList.toggle('active');
            changeBuyingState(true);
            const newCart = [...cart, state[0]];
            console.log(newCart);
            axios.patch(`http://localhost:3000/store-users/${id}`, {
                cart: newCart
            }).then(res => {

            })
        }


        //console.log(cart);
    }


    if (state.length <= 0) {
        return "Loading... "
    }
    else {

        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="main-container">

                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div>
                            <img width="300px" height="400px" src={state[0].image}></img>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", paddingLeft: "50px" }}>
                            <div>
                                <p> {state[0].title}</p>
                                <p> <strong> {state[0].price} € </strong></p>
                                <button onClick={shop}> Add to cart </button>
                                <p className="item-shop"> Item já no carrinho</p>
                                <FontAwesomeIcon className="check-icon" icon="check" />
                            </div>
                            
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

export default Product;