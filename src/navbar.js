import React, { useEffect, useState } from "react";
import './navbar.css';
import { Route, Switch, Link } from "react-router-dom";
import Home from "./components/home";
import Products from "./products";
import SignIn from "./components/signin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import ShoppingCart from "./shopping-cart";
import Checkout from "./components/checkout";
import Order from "./components/order";
import Men from "./products/men";
import Women from "./products/women";
import Accessories from "./products/accessories";

import Product from "./product";

library.add(faUser);
library.add(faShoppingCart);

const Navbar = () => {

    const toggle = () => {
        const btn = document.getElementsByClassName('cenas');
        for (let i = 0; i < btn.length; i++) {
            btn[i].classList.toggle('active');
        }
    }


    const hidden = document.getElementsByClassName('hidden');
    const tok = () => {
        for (let i = 0; i < hidden.length; i++) {
            hidden[i].classList.toggle('active');
        }
    }

    const leave = () => {
        for (let i = 0; i < hidden.length; i++) {
            hidden[i].classList.toggle('active');
        }
    }

    return (

        <div className="Navbar">
            <button class="btn" onClick={toggle}> toggle</button>
            <ul>
                <li class="cenas"> <Link to="/"> Home </Link>

                </li>
                <li class="cenas"> <a onClick={tok}> Products </a>
                    <ul onMouseLeave={leave}>
                        <li className="hidden" style={{ color: "white" }}> <Link to="/men"> Men </Link></li>
                        <li className="hidden" style={{ color: "white" }}> <Link to="/women"> Women </Link></li>
                        <li className="hidden" style={{ color: "white" }}> <Link to="/accessories"> Accessories </Link></li>
                    </ul></li>
                <li class="cenas" > <Link id="icon" to="/signin"> <FontAwesomeIcon style={{ fontSize: "20px" }} icon="user" /></Link></li>
                <li class="cenas"> <Link id="icon" to="/shopping-cart"> <FontAwesomeIcon style={{ fontSize: "20px" }} icon="shopping-cart" /> </Link></li>

            </ul>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/products" component={Products} />
                <Route path="/signin" component={SignIn} />
                <Route path="/shopping-cart" component={ShoppingCart} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/men" component={Men} />
                <Route path="/women" component={Women} />
                <Route path="/accessories" component={Accessories} />
                <Route path="/order" component={Order} />
                <Route path="/:id" component={Product} />
            </Switch>
        </div>


    )

}

export default Navbar;