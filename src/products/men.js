import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductTemplate from "./product-template";


const Men = () => {

    const [state, changeState] = useState([]);
    const [products, changeProducts] = useState([]);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products`).then(data => {
            const cenas = data.data;

            cenas.forEach(product => {
                if (product.id >= 2 && product.id <= 4) {
                    let temp = product;
                    changeState((old) => [...old, temp]);
                }

            });
        })
        console.log(state);
    }, [])


    if (state) {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="Products">
                    {state.map(item => {
                        return (
                            <ProductTemplate price={item.price} id={item.id} title={item.title} image={item.image}></ProductTemplate>
                        )
                    })}
                    </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <p> no products here </p>
            </div>
        )
    }
}

export default Men;