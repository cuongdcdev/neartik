import React, { useState, useRef } from "react";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import { Drawer, InputBase } from "@mui/material";
import { Close } from "@mui/icons-material";
import { IconButton } from "@material-ui/core";
import { AddCircle } from "@mui/icons-material";
import { AddCommentTwoTone } from "@mui/icons-material";

const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";


function getDateFromTimeStamp(unixTimeStamp) {
    let date = new Date(unixTimeStamp);
    return ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
}

function Comment(props) {
    const [toggleState, setToggleState] = useState(false);
    const inputRef = useRef(null);
    const [cmts, setCmts] = useState(props.comments && props.comments.length > 0 ? props.comments : []);

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
        <div style={{ padding: 14, height: "30%", overflow: "scroll" }}>

            <Drawer anchor="bottom" open={toggleState}
                ModalProps={{
                    keepMounted: true,
                }} >

                <div className="comment-header" style={{ position: "fixed" }}>
                    <IconButton onClick={() => setToggleState(false)}>
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
        // comment section 
    );
}
export default Comment;