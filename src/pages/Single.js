import React, { useEffect, useState } from "react";
import "../assets/css/app.css";

import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
import SinglePost from "../components/SinglePost";
import PostGrid from "../components/PostGrid";

// const { networkId } = getConfig(process.env.NODE_ENV || 'development')



function Single() {
    const [post, setPost] = useState({});
    const [posts, setPosts] = useState([]);
    const [cmts, setCmts] = useState([]);
    const params = useParams();


    useEffect(() => {
        console.log("init single page ");

        //get post 
        window.contract.getPost({ accountId: params.walletid, postId: params.postid })
            .then(ob => {
                setPost(JSON.parse(ob));
                console.log("get post ", JSON.parse(ob));
                window.document.title = post.title;

            })
            .catch(err => {
                console.log("get post err", err);
                // window.location.href ="/"
            })

        // //get comment of post 
        window.contract.getComments({ postId: params.postid, from: 0, to: 30 })
            .then(ob => {
                let arrCmts = [];
                if (ob.length > 0) {
                    arrCmts = ob.map(ob => JSON.parse(ob));
                }
                setCmts(arrCmts);
                console.log("arr cmts ", arrCmts);
            })
            .catch(err => {
                console.log("err get comment ", err);
            })

        //get more posts from this authors 
        window.contract.getPostsFrom({ accountId: params.walletid, from: 0, to: 30 })
            .then(rs => {
                console.log("get posts from ", rs);
                let arrRelatedPosts = [];

                if (rs.length > 0) {
                    rs.map(ob => {
                        var o = JSON.parse(ob);
                        if (o && o.id && o.id !== params.postid) {
                            arrRelatedPosts.push(o);
                        }
                    });
                }

                console.log("Related posts ", arrRelatedPosts);
                setPosts(arrRelatedPosts);
            })
            .catch(err => {
                console.log("err get related posts", err);
            })

    }, []);


    // const useStyles = makeStyles(() => ({
    //     root: {
    //         maxWidth: 343,
    //         margin: 'auto',
    //         borderRadius: 12,
    //         padding: 12,
    //     },
    //     media: {
    //         borderRadius: 6,
    //     },
    // }));



    return (
        <div id="single-page">
            {

                <div className="post" key={Math.random()}>
                    <SinglePost post={post} cmts={cmts} />
                </div>

            }
            <div className="related-posts" style={{ padding: 15 }}>
                <p className="related-post-title">More from author</p>
                <PostGrid posts={posts} />
            </div>
        </div>
    );
}

export default Single;

