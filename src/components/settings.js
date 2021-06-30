import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Settings = () => {
    return (
        <div style={{ display: "flex", flexDirection: "row", marginTop: "50px" }}>

            <div>

                <ul style={{ display: "flex", flexDirection: "column" }}>
                    <li class="some" > <Link to="/signin" style={{ color: "black" }}> Profile </Link>   </li>
                    <li class="some" > <Link to="/orders" style={{ color: "black" }}> Orders </Link></li>
                    <li class="some" > <Link to="/settings" style={{ color: "white", backgroundColor: "black", padding: "5px" }}> Setting </Link> </li>

                </ul>
            </div>
            <div style={{ width: "50%" }}>
                <p> welcome to the settings page! </p>
            </div>
        </div>
    )

}

export default Settings;