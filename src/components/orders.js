import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Orders = () => {

    const change = () => {
        let some = document.querySelectorAll('.some');
        for (let i = 0; i < some.length; i++) {
            some[i].classList.toggle('active');
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", marginTop: "50px" }}>

            <div>

                <ul style={{ display: "flex", flexDirection: "column" }}>
                    <li class="some" > <Link to="/signin" style={{ color: "black" }}> Profile </Link>   </li>
                    <li class="some" > <Link to="/orders" style={{ color: "white", backgroundColor: "black", padding: "5px" }}> Orders </Link></li>
                    <li class="some" > <Link to="/settings" style={{ color: "black" }}> Settings </Link> </li>

                </ul>
            </div>
            <div style={{ width: "50%" }}>
                <button onClick={change}> teste </button>
                <p> welcome to the orders page! </p>
            </div>
        </div>
    )

}

export default Orders;