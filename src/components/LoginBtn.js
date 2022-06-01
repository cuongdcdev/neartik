import React, { useState, useEffect } from "react"
import Button from '@mui/material/Button';
import {login,logout} from "../utils";
import nearimg from "./../assets/img/nearicon.png";

export default function LoginBtn(props) {
    return (
        <div id="loginBtn">
            <Button variant="outlined" size="large" onClick={ ()=>{  login()  } }>
                 { props.text ? props.text : " Login with NEAR " }<img src={nearimg} className="login-btn-img"/>
            </Button>
        </div>
    )
}