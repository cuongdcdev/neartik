import React from "react";
import VideoGrid from "../components/VideoGrid";
import { CssBaseline, Container, Box } from "@mui/material";
export default function Liked() {

    return (

        <>
            <h2 className="heading">
                Your Favorites
            </h2>

            <CssBaseline />
            <Container maxWidth="sm" id="profile-page" >
                <Box sx={{ bgcolor: '#cfe8fc' }} />
                <VideoGrid />
            </Container>
        </>
    )
}