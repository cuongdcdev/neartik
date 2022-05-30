import React, { useState, useEffect } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Button, Input, IconButton, Tabs, Tab } from "@mui/material";
import PhotoUploader from "../components/uploader/PhotoUploader";
import { Collections } from "@mui/icons-material";
import { Phone } from "@mui/icons-material";
import { OndemandVideo } from "@mui/icons-material";
import AlbumUploader from "../components/uploader/AlbumUploader";
import MediaUploader from "../components/uploader/MediaUploader";
import { LocalFlorist } from "@mui/icons-material";



export default function Upload() {

    const [imgUrl, setImgUrl] = useState("");
    const [save, setSave] = useState(false);
    const [uploadFile, setUploadFile] = useState(false);
    const [menuUpload, setMenuUpload] = useState(0);
    const [postType, setPostType] = useState("basic"); //upload type supported: basic (photo or text ) / album (multiple photos) / media (video or audio)

    const createPost = () => {
        console.log("createpost!");
        setUploadFile(true);
    }

    const handleMenuChange = (event, newValue)=>{
        setMenuUpload(newValue);
    }
    useEffect(() => {
        console.log("save state changed ", save);
        if (save) {
            //upload to near blockchain 
            console.log("uploading to near blockchain img ....", imgUrl);
        }
    }, [save]);

    const ShowUploadType = () => {

        if (postType == "basic") {
            return <PhotoUploader setUrl={setImgUrl} setSave={setSave} uploadFile={uploadFile} />
            { imgUrl ? imgUrl : "not upload yet! " }
        }

        if (postType == "media") {
            return <MediaUploader setUrl={setImgUrl} setSave={setSave} uploadFile={uploadFile} />
            { imgUrl ? imgUrl : "not upload yet! " }
        }

        if (postType == "album") {
            return <AlbumUploader setUrl={setImgUrl} setSave={setSave} uploadFile={uploadFile} />
            { imgUrl ? imgUrl : "not upload yet! " }
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

                    <Tabs value={menuUpload} onChange={ handleMenuChange } sx={{marginBottom:"15px"}}>
                        <Tab icon={<LocalFlorist />} label="Basic" onClick={() => setPostType("basic")} />
                        <Tab icon={<Collections />} label="Album" onClick={() => setPostType("album")} />
                        <Tab icon={<OndemandVideo />} label="Media" onClick={() => setPostType("media")} />
                    </Tabs>

                    <ShowUploadType />

                </div>

                <TextField id="post_title" label="Title" variant="filled" multiline rows={1} fullWidth placeholder="post title" />

                <TextField id="post_description" label="Description" variant="filled" multiline rows={5} fullWidth sx={{ marginTop: "15px", marginBottom: "15px" }}
                    defaultValue="" placeholder="post content" />

                <Button variant="contained" sx={{ width: "100%" }} onClick={createPost} >Upload</Button>

            </Container>

        </>
    )
}