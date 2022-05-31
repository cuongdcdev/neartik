import React, { useEffect, useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import PostGrid from "../components/PostGrid";
import { logout } from "../utils";
import { useParams } from "react-router-dom";


export default function Profile() {
    const params = useParams();
    const [posts, setPosts] = useState([]);
    const accountId = params.walletid ? params.walletid : window.accountId;

    function showLogout() {
        if (!params.walletid) {
            return (<Button color="error" size="small" variant="outlined"
                onClick={() => { return confirm("Confirm Logout?") ? logout() : "" }}>logout</Button>)
        }
    }

    function showUpdateProfile() {
        if (params.walletid == window.accountId) {
            <Button variant="contained" sx={{ width: "100%" }} >Update Profile</Button>
        }
    }

    useEffect( ()=>{
        window.contract.getPostsFrom( { accountId: accountId, from: 0 , to: 100}  )
        .then( ob =>{
            console.log("get list posts from author" , ob );
            const postsArr = ob.map( ob =>  JSON.parse(ob));
            console.log("postArr" , postsArr);
            setPosts( postsArr);

        } )
        .catch( err => {
            console.log(err);
        } )
    } , [] );
    return (
        <>

            <h2 className="heading">
                {params.walletid} <br />
                {showLogout()}
            </h2>

            <CssBaseline />
            <Container maxWidth="sm" id="profile-page" >

                <TextField id="name" label="Name" variant="standard" InputProps={{ readOnly: true  }}
                    sx={{ width: "100%" }}
                    defaultValue={window.accountId} />

                <TextField id="description" label="Description"
                    InputProps={{ readOnly: params.walletid == window.accountId }}
                    variant="standard" multiline rows={10} sx={{ width: "100%", marginTop: "15px", marginBottom: "15px" }}
                    defaultValue="" />


                <h2 className="heading">
                    Posts
                </h2>
                <PostGrid posts={ posts } />


            </Container>
        </>
    )
}