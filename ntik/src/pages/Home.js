import React, { useEffect, useState } from "react";
import "../assets/css/app.css";


import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import PostCard from "../components/PostCard";


// const { networkId } = getConfig(process.env.NODE_ENV || 'development')



function Home() {
    const [showNotification, setShowNotification] = useState(false)
    const [loading, setload] = useState(null);
    const [postIds , setPostIds] = useState([]);
    const [posts , setPosts] = useState([]);

    useEffect(() => {
        console.log("init home");

        window.contract.getPostsId( {from: 0 , to: 30} )
        .then( (arr )=>{
            console.log("get arr ids " , arr );
            arr.forEach( (pid ,accid) => {
                window.contract.getPost( accid , pid ).then( ob =>{
                    console.log("got 1 post " , ob );
                    setPosts( [ JSON.parse(ob) , ...posts ] );
                    console.log("posts now " , posts );
                } )
            });
        } )
        .catch( err => {
            console.log(err);
        })
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
                      {/* <PostCard post=""/> */}
                    </div>
                ))
            }

        </div>
    );
}

export default Home;

