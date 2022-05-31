import React from "react";
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from "../pages/Home";
import Liked from "../pages/Liked";
import Profile from "../pages/Profile";
import Upload from "../pages/Upload";


export default function MenuBar() {
    return (

        <div id="menu">
            <BrowserRouter>

                <div className="menu-btn" id="homepage">
                    <Link to="/" >Home</Link>
                </div>

                <div className="menu-btn" id="upload">
                    <Link to="/upload">Upload</Link>
                </div>

                <div className="menu-btn" id="profile">
                    <Link to="/profile">Profile</Link>
                </div>

                <div className="menu-btn" id="liked">
                    <Link to="/liked">Liked</Link>
                </div>

          
            </BrowserRouter>

        </div>
    )
}