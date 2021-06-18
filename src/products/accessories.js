import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Accessories = () =>{
    const [state, changeState] = useState([]);
    const [products, changeProducts] = useState([]);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products`).then(data => {
            const cenas = data.data;

            cenas.forEach(product => {
                if (product.id >= 5 && product.id <= 8) {
                    let temp = product;
                    changeState((old) => [...old, temp]);
                }

            });
        })
        console.log(state);
    }, [])


    if (state) {
        return <div className="Products">
            {state.map(item => {
                const link = `/${item.id}`
                const src = `${item.image}`;
                return (
                    <div key={item.id}>

                        <p> {item.id} </p>
                        
                        <img width="200px" height="250px" src={src}></img>
                        <Link to={link}> <button> See product </button></Link>
                    </div>
                )
            })}</div>
    }
    else {
        return (
            <div>
                <p> no products here </p>
            </div>
        )
    }
}

export default Accessories;