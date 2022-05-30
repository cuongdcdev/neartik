import React, { useEffect, useState } from "react";
import "../assets/css/app.css";


import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import PostCard from "../components/PostCard";
import VideoGrid from "../components/VideoGrid";


// const { networkId } = getConfig(process.env.NODE_ENV || 'development')



function Single() {
    const [showNotification, setShowNotification] = useState(false)
    const [loading, setload] = useState(null);
    const [data, setData] = useState([
        {
            video: [],
            author: [],
            title: [],
        },
    ]);

    useEffect(() => {

        console.log("init single page ");
    }, []);


    const useStyles = makeStyles(() => ({
        root: {
            maxWidth: 343,
            margin: 'auto',
            borderRadius: 12,
            padding: 12,
        },
        media: {
            borderRadius: 6,
        },
    }));



    return (
        <div id="single-page">
            {

                <div className="post" key={Math.random()}>
                    <PostCard />
                </div>

            }
            <div className="related-posts">
                <h3>More from author</h3>
                <VideoGrid/>
            </div>
        </div>
    );
}

export default Single;

