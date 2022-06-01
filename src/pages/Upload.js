import React, { useState, useEffect, useRef } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Button, Tabs, Tab } from "@mui/material";
import PhotoUploader from "../components/uploader/PhotoUploader";
import { Collections } from "@mui/icons-material";
import { OndemandVideo } from "@mui/icons-material";
import AlbumUploader from "../components/uploader/AlbumUploader";
import MediaUploader from "../components/uploader/MediaUploader";
import { LocalFlorist } from "@mui/icons-material";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { v4 as uuid } from "uuid";

export default function Upload() {


    const postObject = {
        id: "", //postid 
        author: "", //wallet id 
        title: "",
        desc: "",
        date: "",
        type: "", //basic /album / media 
        media: "", // media url 
    }
    const [mediaUrl, setMediaUrl] = useState("");
    const [save, setSave] = useState(false);
    const [uploadFile, setUploadFile] = useState(false);
    const [menuUpload, setMenuUpload] = useState(0);
    const [loading, setLoading] = useState(false);

    const [postType, setPostType] = useState("basic"); //upload type supported: basic (photo or text ) / album (multiple photos) / media (video or audio)
    const postTitle = useRef();
    const postDesc = useRef();

    useEffect(() => {
        console.log("save state changed to", save);
        if (save) {
            //upload to near blockchain 
            console.log("uploading to near blockchain ....", mediaUrl);
            postObject.author = window.accountId;
            postObject.title = postTitle.current.value;
            postObject.desc = postDesc.current.value;
            postObject.media = mediaUrl;
            postObject.date = Date.now();
            postObject.type = postType;
            postObject.id = uuid();
            console.log("post Object", postObject);

            //set post id first 
            window.contract.setPostId({ postId: postObject.id }).then(() => {
                //upload post 
                window.contract.addPost({ postId: postObject.id, postObject: JSON.stringify(postObject) })
                .then((rs) => {
                    console.log("saved to NEAR! ");
                    console.log(rs);
                    setLoading(false);
                    window.location.href = "/" + "@" + postObject.author + "/p" + postObject.id
                    
                }).catch(err => {
                    console.log(err);
                    setLoading(false);
                    alert("Error, please check the console or reload the page ");
                })
            })
                .catch(err => {
                    console.log("set post id failed ", err);
                });


        }
    }, [save]);


    useEffect(() => {
        document.querySelector("#createPost").addEventListener("click", () => {
            document.querySelector("#uploadFile").click();
            if( !document.querySelector( "#contained-button-file").value ){
                console.log("no media upload")
                setSave(true);
            }
        });
    });

    const createPost = () => {
        console.log("createpost!");
        setUploadFile(true);
        setLoading(true);


    }

    const handleMenuChange = (event, newValue) => {
        setMenuUpload(newValue);
    }

    const ShowUploadType = () => {

        if (postType == "basic") {
            return (
                <>
                    <PhotoUploader setUrl={setMediaUrl} setSave={setSave} uploadFile={uploadFile} />
                    {/* {imgUrl ? imgUrl : "not upload yet! "} */}
                </>
            )
        }

        if (postType == "media") {
            return (
                <>
                    <MediaUploader setUrl={setMediaUrl} setSave={setSave} uploadFile={uploadFile} />
                    {/* {imgUrl ? imgUrl : "not upload yet! "} */}
                </>
            )

        }

        if (postType == "album") {
            return (<>
                <AlbumUploader setUrl={setMediaUrl} setSave={setSave} uploadFile={uploadFile} />
                {/* {imgUrl ? imgUrl : "not upload yet! "} */}
            </>)
        }
    }

    return (

        <>
            <h2 className="heading">
                Upload
            </h2>

            <CssBaseline />
            <Container maxWidth="sm" id="profile-page" >

                <div className="upload-section">

                    <Tabs value={menuUpload} onChange={handleMenuChange} sx={{ marginBottom: "15px" }}>
                        <Tab icon={<LocalFlorist />} label="Basic" onClick={() => setPostType("basic")} />
                        <Tab icon={<OndemandVideo />} label="Media" onClick={() => setPostType("media")} />
                    </Tabs>

                    <ShowUploadType />

                </div>

                <TextField id="post_title" label="Title" variant="filled" multiline rows={1} fullWidth placeholder="post title"
                    inputRef={postTitle} />

                <TextField id="post_description" label="Description" variant="filled"
                    inputRef={postDesc}
                    multiline rows={5}
                    fullWidth sx={{ marginTop: "15px", marginBottom: "15px" }}
                    defaultValue="" placeholder="post content" />

                <Button variant="contained" sx={{ width: "100%" }} onClick={createPost} id="createPost" >Upload</Button>

            </Container>

            {/* backdrop loading  */}
            <Backdrop
                sx={{ color: '#fff', zIndex: 9999 }}
                open={loading}>
                <CircularProgress color="inherit" />
                <h3 style={{ paddingLeft: "15px" }}>Please wait.... 😉 </h3>
            </Backdrop>
        </>
    )
}