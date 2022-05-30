import React, { useEffect, useState } from "react";
import "../assets/css/app.css";


import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import PostCard from "../components/PostCard";


// const { networkId } = getConfig(process.env.NODE_ENV || 'development')



function Home() {
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

        console.log("init home");
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
        <div id="home-page">
            {
                Array.from({ length: 10 }).map((e, i) => (
                    <div className="post" key={Math.random()}>
                      <PostCard/>
                    </div>
                ))
            }

        </div>
    );
}

export default Home;

