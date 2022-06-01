import React, { useEffect, useRef, useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import PostGrid from "../components/PostGrid";
import { logout } from "../utils";
import { useParams } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function Profile() {
    const params = useParams();
    const [posts, setPosts] = useState([]);
    const accountId = params.walletid ? params.walletid : window.accountId;
    const [desc, setDesc] = useState();
    const [loading, setLoading] = useState(false);

    let userProfile = {
        media: "",
        author: window.accountId,
        desc: "",
        liked: [], //ids of post 
    };

    const descField = useRef();


    function showLogout() {
        if (!params.walletid) {
            return (<Button color="error" size="small" variant="outlined"
                onClick={() => { return confirm("Confirm Logout?") ? logout() : "" }}>logout</Button>)
        }
    }

    function showUpdateProfile() {
        console.log("wallet id ", params.walletid);
        if (!params.walletid) {
            return (
                <Button variant="contained" sx={{ width: "100%" }} onClick={() => updateProfile()}>Update Profile</Button>
            )
        }
    }

    function updateProfile() {
        console.log("user profile ", userProfile);
        userProfile.desc = descField.current.value;
        setLoading(true);
        window.contract.setProfile({ profileObject: JSON.stringify(userProfile) })
            .then((ob) => {
                setLoading(false);
            })
    }

    useEffect(() => {
        //get posts from author 
        window.contract.getPostsFrom({ accountId: accountId, from: 0, to: 100 })
            .then(ob => {
                console.log("get list posts from author", ob);
                const postsArr = ob.map(ob => JSON.parse(ob));
                console.log("postArr", postsArr);
                setPosts(postsArr);

            })
            .catch(err => {
                console.log(err);
            })

        //get user profile 
        window.contract.getProfile({ userId: accountId })
            .then(ob => {
                var obj = JSON.parse(ob);
                if (obj) {
                    userProfile = obj;
                    userProfile.author = window.accountId;
                    console.log("user profile ", obj);
                    setDesc(obj.desc);

                }
            })

        window.document.title = accountId;
    }, []);



    return (
        <>

            <h2 className="heading">
                {params.walletid} <br />
                {showLogout()}
            </h2>

            <CssBaseline />
            <Container maxWidth="sm" id="profile-page" >

                <TextField id="name" label="Name" variant="standard" InputProps={{ readOnly: true }}
                    sx={{ width: "100%" }}
                    defaultValue={window.accountId} />

                <TextField id="description" hiddenLabel
                    InputProps={{ readOnly: params.walletid == window.accountId }}
                    variant="standard" multiline rows={3} sx={{ width: "100%", marginTop: "15px", marginBottom: "15px" }}
                    defaultValue={desc}
                    inputRef={descField} />

                {showUpdateProfile()}

                <h2 className="heading" style={{ marginTop: "15px", marginBottom: "15px" }}>
                    Posts
                </h2>
                <PostGrid posts={posts} />

                {/* backdrop loading  */}
                <Backdrop
                    sx={{ color: '#fff', zIndex: 9999 }}
                    open={loading}>
                    <CircularProgress color="inherit" />
                    <h3 style={{ paddingLeft: "15px" }}>Saving.... 🤩 </h3>

                </Backdrop>
            </Container>
        </>
    )
}