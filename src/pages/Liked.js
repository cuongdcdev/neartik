import React from "react";
import PostGrid from "../components/PostGrid";
import { CssBaseline, Container, Box } from "@mui/material";
import { getFavorites } from "../utils";

export default function Liked() {

    const favorites = getFavorites();
    const posts = favorites.map(e => { return e.post });
    console.log("posts ", posts);

    function showPost() {
        if (posts && posts.length > 0) {
            return <PostGrid posts={posts} />
        }
        return (
            <>
                <p style={{ textAlign: center }}> Empty 😉  </p>
                <a href="/" style={{ textAlign: center }}> 🔥 Explorer now  </a>
            </>

        )
    }
    return (

        <>
            <h2 className="heading">
                Favorites
            </h2>

            <CssBaseline />
            <Container maxWidth="sm" id="profile-page" >
                <Box sx={{ bgcolor: '#cfe8fc' }} />
                {showPost()}
            </Container>
        </>
    )
}