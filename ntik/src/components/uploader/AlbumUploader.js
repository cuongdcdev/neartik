import React, { useState, useEffet } from 'react'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { Card, CardMedia, IconButton, PhotoCamera } from '@mui/material'
import { Button } from '@mui/material'
import { FileUpload } from '@mui/icons-material'
const ipfs = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const AlbumUploader = (props) => {
    const [image, setImage] = useState({})
    const [imagePreview, setImagePreview] = useState('')
    const [loading, setLoading] = useState(false)
    const [uploaded, setUploaded] = useState(false)

    const createPreview = (e) => {
        if (e.target.value !== '') {
            setImage(e.target.files[0])
            const src = URL.createObjectURL(e.target.files[0])
            setImagePreview(src)
        } else {
            setImagePreview('')
        }
    }
    // { setUrl, setSave, props}

    React.useEffect(() => {
        if (!props.uploadFile) return;
        console.log("upload file changed status", props.uploadFile);
        uploadFile();
    }, [props.uploadFile]);


    const uploadFile = async (e) => {
        setLoading(true)
        // e.preventDefault()

        try {
            const added = await ipfs.add(image)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            props.setUrl(url)
            setImagePreview(url)
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
                                <h5>
                                    UPloading....
                                    {image.name}{' '}
                                    <br />
                                    {Math.round(image.size / 1000)} KB
                                </h5>
                            </>
                        )}
                        <Card sx={{ maxWidth: "100%" }} >
                            <CardMedia component="img" image={imagePreview} height="300" />
                        </Card>
                    </>
                )
            } else {
                return (
                    <div>
                        <h4>Uploading Image</h4>

                        <h4>Please Wait ...</h4>
                    </div>
                )
            }
        }
    }

    return (
        <div>


            <label htmlFor="contained-button-file">
                <input required
                    id="contained-button-file"
                    type='file'
                    accept="audio/*,video/*"
                    onChange={(e) => createPreview(e)}
                    className="hideBtn"

                />
                <Button variant="contained" component="span" startIcon={<FileUpload />} sx={{ width: "100%" }}>
                    Upload photo album
                </Button>

            </label>

            {previewAndUploadButton()}

        </div>
    )
}




export default AlbumUploader;