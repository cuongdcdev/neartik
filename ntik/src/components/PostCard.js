import React, { useState, useRef } from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';

import { Avatar, Grid, Paper } from "@material-ui/core";
import { Drawer, InputBase } from "@mui/material";
import { Close } from "@mui/icons-material";
import { AddCircle } from "@mui/icons-material";

import neariconimg from "../assets/img/nearicon.png";
import DonateBox from "./DonateBox";

// import ReactWebMediaPlayer from 'react-web-media-player';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));




const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";


function getDateFromTimeStamp(unixTimeStamp) {
    let date = new Date(unixTimeStamp);
    return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
}

export default function PostCard() {
    const [expandComment, setExpandComment] = React.useState(false);
    const [donate, setDonate] = React.useState(false);

    //comment feature
    const openCommentSection = () => {
        setExpandComment(!expandComment);
        console.log("set expandcomment", expandComment);
    }

    const openDonateSection = () => {
        setDonate(true);
        console.log("open donate section ")
    }


    const inputRef = useRef(null);
    const [cmts, setCmts] = useState([]);

    function addComment() {
        var inputCmt = inputRef.current.value;
        if (inputCmt.trim(0).length == 0) return;
        console.log("cmt subbmited! ", inputCmt);
        var cmt2 = Array.from(cmts);
        setCmts([{
            "uid": "cuongdcdev.near",
            "cmt": inputRef.current.value,
            "t": Date.now()
        }, ...cmts]);
        inputRef.current.value = "";
        console.log(cmts);
    }


    return (

        <Card variant="outlined" sx={{ maxWidth: "auto" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                height="auto"
                sx={{ maxHeight: "500px" }}
                image="https://images.unsplash.com/photo-1653762381140-bc305337dc8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Paella dish"
            />

            {/* <ReactWebMediaPlayer title="test video" video="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4" /> */}
            <video controls loop src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4" ></video>
            <video controls loop src="https://dl.espressif.com/dl/audio/ff-16b-2c-44100hz.mp3" ></video>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
            </CardContent>

            <CardActions disableSpacing className="btn-wrap">

                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>

                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>

                <IconButton aria-label='comment' onClick={openCommentSection}>
                    <CommentIcon />
                </IconButton>

                <IconButton className="donate-btn" aria-label="donate" onClick={openDonateSection}>
                    <img src={neariconimg} />
                </IconButton>
            </CardActions>
            {/* donate section   */}
            <DonateBox setDonate={setDonate} donate={donate} />
            {/* end donate section  */}

            {/* comment section  */}
            <div className="comments-section" sx={{ padding: 14, height: "50%", padding: 14, height: "50%", maxWidth: "750px", paddingBottom: "50px", margin: "auto" }}>
                <Drawer anchor="bottom" open={expandComment} className="comment-wrapper"
                    sx={{ padding: 14, height: "50%", maxWidth: "750px", paddingBottom: "50px", margin: "auto" }}
                    ModalProps={{
                        keepMounted: true,
                    }} >

                    <div className="comment-header" style={{ position: "fixed" }}>
                        <IconButton onClick={() => setExpandComment(false)}>
                            <Close />
                        </IconButton>
                    </div>

                    <Paper style={{ padding: "15px", position: "fixed", bottom: "50px", zIndex: 9999, width: "100%" }} className="comment-post">
                        <Grid container wrap="nowrap" spacing={2}>
                            <InputBase inputRef={inputRef}
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Leave a comment"
                            />
                            <IconButton type="button" onClick={() => { addComment() }} sx={{ p: '10px' }}>
                                <AddCircle />
                            </IconButton>
                        </Grid>
                    </Paper>

                    <div style={{ paddingBottom: "25px", paddingTop: "25px" }}></div>

                    {
                        Array.from(cmts).map((e) => (
                            <Paper style={{ padding: "20px 20px" }} key={Math.random()} >
                                <Grid container wrap="nowrap" spacing={2}>

                                    <Grid item>
                                        <Avatar alt={e.id}> {e.uid.substring(0, 3)} </Avatar>
                                    </Grid>

                                    <Grid item xs zeroMinWidth>
                                        <h4 className="cmtUid" style={{ margin: 0, textAlign: "left" }}>{e.uid}</h4>
                                        <p className="cmtContent" style={{ textAlign: "left" }}>{e.cmt}</p>
                                        <p className="cmtPostedAt" style={{ textAlign: "left", color: "gray", fontSize: "70%" }}>
                                            posted at: {getDateFromTimeStamp(e.t)}
                                        </p>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))
                    }

                    <Paper style={{ padding: "20px 20px" }}>
                        <Grid container wrap="nowrap" spacing={2}>

                            <Grid item>
                                <Avatar alt="Remy Sharp" src={imgLink} />
                            </Grid>

                            <Grid item xs zeroMinWidth>
                                <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
                                <p style={{ textAlign: "left" }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                                    luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
                                    Suspendisse congue vulputate lobortis. Pellentesque at interdum
                                    tortor. Quisque arcu quam, malesuada vel mauris et, posuere
                                    sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
                                    metus, efficitur lobortis nisi quis, molestie porttitor metus.
                                    Pellentesque et neque risus. Aliquam vulputate, mauris vitae
                                    tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
                                    lectus vitae ex.{" "}
                                </p>
                                <p style={{ textAlign: "left", color: "gray" }}>
                                    posted 1 minute ago
                                </p>
                            </Grid>
                        </Grid>

                    </Paper>

                </Drawer>




            </div>
            {/* end comment section  */}
        </Card>

    );
}
