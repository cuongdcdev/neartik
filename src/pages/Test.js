import React, { useState } from 'react'
import { FileUpload } from 'react-ipfs-uploader'

const Test = () => {
    const [fileUrl, setFileUrl] = useState('')

    return (
        <div>
            <FileUpload setUrl={setFileUrl} />
            FileUrl : <a
                href={fileUrl}
                target='_blank'
                rel='noopener noreferrer'
            >
                {fileUrl}
            </a>
        </div>
    )
}

export default Test;