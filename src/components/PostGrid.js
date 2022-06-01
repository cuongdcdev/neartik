import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import defaultImg from "../assets/img/nearicon.png";
import { v4 as uuid } from 'uuid';
export default function PostGrid(props) {
    const itemData = props.posts;

    function showPostThumbnail(item) {

        if ( item && item.type == "media") {
            return (
                <video src={item.media} controls loop >{item.title}</video>
            )
        } 
        
        if(item && item.type == "basic"){
            return (
                <img
                    src={`${item.media ? item.media : defaultImg}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.media ? item.media : defaultImg}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                />
            )
        }

    }
    return (
        <ImageList sx={{ width: "100%", minHeight: 200 }} className="postList">
            {itemData && itemData.map((item) => (
                <ImageListItem key={uuid()}>

                    {showPostThumbnail(item)}

                    <a href={`/@${item.author}/p${item.id}`} >
                        <ImageListItemBar
                            title={item.title}
                            subtitle={<span>by: {item.author}</span>}
                            position="below"
                        />
                    </a>
                </ImageListItem>
            ))}
        </ImageList>
    );
}