import React, { useState, useEffect } from "react"

export default function NotFound() {
    return (
        <div id="404page">
            <h1 style={{ textAlign: "center" }}>
                404 not found :(
            </h1>
            <div style={{ width: "50%", textAlign: "center", height: "0", paddingBottom: "84%", position: "relative" }}>
                <iframe src="https://giphy.com/embed/4TmsyEHp9Ksw8rEyR8" width="100%" height="100%" style={{ position: "absolute" }} frameBorder="0"
                    className="giphy-embed"
                    allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/cat-laugh-capoo-4TmsyEHp9Ksw8rEyR8">via GIPHY</a></p>

        </div>


    )
}