import React, { useState, useRef } from 'react'
// import { create as ipfsHttpClient } from 'ipfs-http-client'
import { create as ipfsHttpClient } from "ipfs-http-client";
import { Card, CardMedia } from '@mui/material';
import { Button } from '@mui/material';
import { FileUpload } from '@mui/icons-material';

const ipfs = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');



const PhotoUploader = (props) => {
    const [image, setImage] = useState({})
    const [imagePreview, setImagePreview] = useState('')
    const [loading, setLoading] = useState(false)
    const [uploaded, setUploaded] = useState(false)

    const submitEle = useRef();

    const createPreview = (e) => {
        if (e.target.value) {
            setImage(e.target.files[0])
            const src = URL.createObjectURL(e.target.files[0])
            if (src && src.length > 0)
                setImagePreview(src)
        } else {
            setImagePreview(false);
        }
    }
    // { setUrl, setSave, props}

    React.useEffect(() => {
        if (!props.uploadFile) return;
        console.log("upload file changed status", props.uploadFile);
    }, [props.uploadFile]);


    const uploadFile = async (e) => {

        setLoading(true);
        e.preventDefault();
        console.log("trigger upload file ");

        //post with media 
            try {
                console.log("post with image ")
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
                            <CardMedia component="img" image={imagePreview} height="200" width="auto" />
                        </Card>
                    </>
                )
            } else {
                return (
                    <div>
                        <Card sx={{ maxWidth: "100%" }} >
                            <CardMedia component="img" image={imagePreview} height="200" width="auto" />
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
                        accept="image/*"
                        type='file'
                        onChange={(e) => createPreview(e)}
                        className="hideBtn"
                    />
                    <Button variant="contained" component="span" startIcon={<FileUpload />} sx={{ width: "100%" }}>
                        Upload Photo
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

export default PhotoUploader;