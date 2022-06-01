import React, { useState, useRef, useEffect } from "react";
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Facebook, LinkedIn, Twitter, Share} from "@material-ui/icons";

function ShareBtn(props) {
    const l = window.location.origin  + props.link;
    const actions = [
        { icon: <Facebook />, name: 'Facebook', link: `https://www.facebook.com/sharer/sharer.php?u=${l}` },
        { icon: <Twitter />, name: 'Twitter' , link: `https://twitter.com/intent/tweet?text=${l}`},
        { icon: <LinkedIn />, name: 'LinkedIn' , link: `https://www.linkedin.com/shareArticle?mini=true&url=${l}`},
        
        // { icon: <ShareIcon />, name: 'Share' },
    ];
    return (
        <Box className="share-btn">
            <SpeedDial
                ariaLabel="Share"
                className="share-btn-inner"
                icon={<Share />}
            >
                {actions.map((action) => (
                    <SpeedDialAction onClick={() => {window.open( action.link , "_blank" )}}
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}
export default ShareBtn;