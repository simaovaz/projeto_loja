import React, { useEffect, useState } from "react";
import './navbar.css';
import { Route, Switch, Link } from "react-router-dom";
import Home from "./home";
import Products from "./products";
import Login from "./login";
//import Contacts from "./contacts";
//import ShoppingCart from "./shoppingCart";
import SignIn from "./signin";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import ShoppingCart from "./shopping-cart";
import Checkout from "./checkout";
import Order from "./order";

import Product from "./product";

library.add(faUser);

const Navbar = () => {

    const toggle = () => {
        const btn = document.getElementsByClassName('cenas');
        for(let i=0; i<btn.length; i++){
            btn[i].classList.toggle('active');
        }
        
    }

    return (

        <div className="Navbar">
            <button class="btn" onClick={toggle}> toggle</button>
            <ul>
                
                <li class="cenas"> <Link to="/"> Home </Link></li>
                <li class="cenas"> <Link to="/products"> Products </Link></li>
                <li class="cenas"> <Link to="/signin"> <FontAwesomeIcon icon="user" /></Link></li>
                <li class="cenas"> <Link to="/shopping-cart"> Cart </Link></li>

            </ul>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/products" component={Products} />
                <Route path="/signin" component={SignIn} />
                <Route path="/shopping-cart" component={ShoppingCart} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/order" component={Order} />
                <Route path="/:id" component={Product} />
            </Switch>
        </div>


    )

}

export default Navbar;