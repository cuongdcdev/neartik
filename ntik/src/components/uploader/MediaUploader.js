import React, { useState, useRef } from 'react'
// import { create as ipfsHttpClient } from 'ipfs-http-client'
import { create as ipfsHttpClient } from "ipfs-http-client";
import { Card, CardMedia } from '@mui/material';
import { Button } from '@mui/material';
import { FileUpload } from '@mui/icons-material';

const ipfs = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');



const MediaUploader = (props) => {
    const [image, setImage] = useState({})
    const [imagePreview, setImagePreview] = useState('')
    const [loading, setLoading] = useState(false)
    const [uploaded, setUploaded] = useState(false)

    const submitEle = useRef();

    const createPreview = (e) => {
        if (e.target.value) {
            setImage(e.target.files[0])
            const src = URL.createObjectURL(e.target.files[0])
            if(src && src.length > 0 )
                setImagePreview(src)
        } 
    }
    // { setUrl, setSave, props}

    React.useEffect(() => {
        if (!props.uploadFile) return;
        console.log("upload file changed status", props.uploadFile);
        // window.setTimeout( ()=> {
        console.log("trigger submit ");
        submitEle.current.click();

        // } , 300 );
    }, [props.uploadFile]);


    const uploadFile = async (e) => {

        setLoading(true)
        e.preventDefault()
        console.log("trigger upload file ")
        try {
            const added = await ipfs.add(image)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            props.setUrl(url)
            // setImagePreview(url)
            setUploaded(true)
            props.setSave(true);

        } catch (err) {
            console.log('Error uploading the file : ', err)
        }
        setLoading(false)
    }

    const previewAndUploadButton = () => {
        if (imagePreview !== '') {
            if (!loading) {
                return (
                    <>
                        {uploaded ? (
                            <p>
                                ✅{' '}
                                <a
                                    href={imagePreview}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                >
                                    Image
                                </a>{' '}
                                Uploaded Successfully ✅{' '}
                            </p>
                        ) : (
                            <>
                                <p>
                                    {image.name}{' '}
                                    <br />
                                    {Math.round(image.size / 1000)} KB
                                </p>
                            </>
                        )}

                        <Card sx={{ maxWidth: "100%" }} >
                            {/* <CardMedia component="img" image={imagePreview} height="200" width="auto" /> */}
                            <video src={imagePreview} controls height="200px" width="auto"></video>
                        </Card>
                    </>
                )
            } else {
                return (
                    <div>
                        <Card sx={{ maxWidth: "100%" }} >
                            <video src={imagePreview} controls height="200px" width="auto"></video>    
                        </Card>
                    </div>
                )
            }
        }
    }

    return (
        <div>

            <form onSubmit={uploadFile}>

                <label htmlFor="contained-button-file">
                    <input required
                        id="contained-button-file"
                        accept="video/*,audio/*"
                        type='file'
                        onChange={(e) => createPreview(e)}
                        className="hideBtn"
                    />
                    <Button variant="contained" component="span" startIcon={<FileUpload />} sx={{ width: "100%" }}>
                        Upload Audio or Video
                    </Button>
                </label>

                <button
                    id="uploadFile"
                    type="submit"
                    ref={submitEle}
                    style={{ display: "none" }}>s</button>

            </form>


            {previewAndUploadButton()}

        </div>
    )
}

export default MediaUploader;