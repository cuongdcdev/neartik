import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Button } from "@mui/material";
import VideoGrid from "../components/VideoGrid";
export default function Profile() {

    return (
        <>
            <h2 className="heading">
                Profile page
            </h2>

            <CssBaseline />
            <Container maxWidth="sm" id="profile-page" >

                <Box sx={{ bgcolor: '#cfe8fc' }} />
                <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>

                <TextField id="name" label="Name" variant="standard" InputProps={{ readOnly: true }} sx={{ width: "100%" }} defaultValue="cuongdc.near" />

                <TextField id="description" label="Description" variant="standard" multiline rows={10} sx={{ width: "100%", marginTop: "15px", marginBottom: "15px" }}
                    defaultValue="Default value " />

                <Button variant="contained" sx={{ width: "100%" }} >Save</Button>

                <h2 className="heading">
                    Your
                </h2>

                <VideoGrid />




            </Container>
        </>
    )
}