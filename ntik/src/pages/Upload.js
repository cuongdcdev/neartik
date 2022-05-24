import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Button, Input, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

export default function Upload() {

    return (

        <>
            <h2 className="heading">
                Upload
            </h2>


            <CssBaseline />
            <Container maxWidth="sm" id="profile-page" >

                <Box sx={{ bgcolor: '#cfe8fc' }} />

                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>

                <TextField id="name" label="Name" variant="standard" sx={{ width: "100%" }} defaultValue="" />

                <TextField id="description" label="Description" variant="standard" multiline rows={5} sx={{ width: "100%", marginTop: "15px", marginBottom: "15px" }}
                    defaultValue="Default value " />


                <Button variant="contained" sx={{ width: "100%" }} >Upload</Button>

            </Container>


        </>
    )
}