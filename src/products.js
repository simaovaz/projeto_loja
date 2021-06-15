import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import "./products.css";



const Products = (props) => {
    const [state, changeState] = useState([]);
    const [products, changeProducts] =useState([]);

    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products`).then(data => {
            //console.log(data.data);
            const cenas= data.data;
        cenas.slice(0,20).forEach(product => {
            //console.log(product);
                let temp = product;
                changeState((old) => [...old, temp]);
            });
        })
    }, [])
    if (state.length<=0) {
        return "Loading... "
    }
    else{
    return (
        
        <div className="Products">

            {state.map(cena => {
                const link= `/${cena.id}`
                const src=`${cena.image}`;
                return (
                    <div key={cena.id}>
                        <div className="Product">
                            
                            <p> {cena.id} </p>
                            <img width="200px" height="250px" src={src}></img>
                            <Link to={link}> <button> Ver produto </button></Link>
                        </div>
                    </div>
                )
            })}  <br />
        </div>
    );
    }
}

export default Products;