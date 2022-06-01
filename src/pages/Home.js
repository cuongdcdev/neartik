import React, { useEffect, useState } from "react";
import "../assets/css/app.css";


import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import PostCardHome from "../components/PostCardHome";


// const { networkId } = getConfig(process.env.NODE_ENV || 'development')



function Home() {
    const [showNotification, setShowNotification] = useState(false)
    const [loading, setload] = useState(null);
    const [postIds, setPostIds] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        console.log("init home");

        window.contract.getPostsId({ from: 0, to: 30 })
            .then((arr) => {
                console.log("get arr ids ", arr);
                setPostIds(arr);
            })
            .catch(err => {
                console.log(err);
            })

            window.document.title = "NSocial"
    }, []);

    useEffect(() => {
        postIds.forEach((pidaccid) => {
            const accid = pidaccid.split("|")[0];
            const pid = pidaccid.split("|")[1];
            if (accid && pid)
                window.contract.getPost({ accountId: accid, postId: pid }).then(ob => {
                    console.log("got 1 post ", ob);
                    setPosts(posts => [JSON.parse(ob), ...posts]);
                    console.log("posts now ", posts);
                })
        });
    }, [postIds])

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
                posts.map(e => (
                    <div className="post" key={Math.random()}>
                        <PostCardHome post={e} cmts={[]} />
                    </div>
                ))
            }

        </div>
    );
}

export default Home;

