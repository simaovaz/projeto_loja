import React, { useEffect, useState } from "react";
import axios from "axios";


const Product = (props) => {

    const [state, changeState] = useState([]);
    const [cart, changeCart] = useState([]);
    const idParams = props.match.params.id;
    const [id, setID] = useState("");



    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${idParams}`).then(data => {
            let temp = data.data;
            changeState(old => [...old, temp])
        })

        axios.post("http://localhost:3000/store-users/retorna", { token: localStorage.getItem('our_token') }).then(res => {
            setID(res.data.id);
            if (id) {
                axios.get(`http://localhost:3000/store-users/${id}`).then(res => {
                    //console.log(res);
                    res.data.cart.forEach(item => {
                        changeCart((old) => [...old, item])
                    })
                })
            }
        })


        //console.log(cart);
    }, [id]);

  

    const shop = (e) => {
        e.preventDefault();
        const newCart = [...cart, state[0]];
        console.log(newCart);

        axios.patch(`http://localhost:3000/store-users/${id}`, {
            cart: newCart
        }).then(res => {
            
        })

        //console.log(cart);
    }

    if (state.length <= 0) {
        return "Loading... "
    }
    else {
        
        return (
            <div>
                <img width="300px" height="400px" src={state[0].image}></img>
                <p> {state[0].title}</p>
                <p> <strong> {state[0].price} </strong></p>
                <button onClick={shop}> Adicionar ao carrinho </button>
            </div>
        )
    }
}

export default Product;