import React, { useState, useEffect } from "react"
import Button from '@mui/material/Button';
import {login,logout} from "../utils";
import nearimg from "./../assets/img/nearicon.png";

export default function LoginBtn() {
    return (
        <div id="loginBtn">
            <Button variant="outlined" size="large" onClick={ ()=>{  login()  } }>
                Login with NEAR  <img src={nearimg} className="login-btn-img"/>
            </Button>
        </div>
    )
}