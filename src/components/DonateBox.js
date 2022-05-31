import React, { useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { stepButtonClasses } from "@mui/material";

export default function DonateBox(props) {
    const [open, setOpen] = React.useState(false);
    const inputRef = useRef();

    const handleClickOpen = () => { 
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.setDonate(false);
    };

    const handleDonate = () => {
        console.log("donate clicked: " , inputRef.current.value );
        
    };

    useEffect(() => {
        setOpen(props.donate);
    }, [props.donate]);


    return (
        <Dialog className="donate-dialog"
            open={open}
            sx={{
                width: "40%",
                margin: "auto",
                minWidth: "300px !important",
                padding: "5px"
            }}
            onClose={handleClose}
        >
            <DialogTitle>Donate</DialogTitle>
            <DialogContent>

                <DialogContentText>
                    <TextField defaultValue="1" fullWidth label="NEAR" variant="standard" autoFocus margin="dense"
                     inputRef={inputRef}
                     type="number"
                      />
                </DialogContentText>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={handleDonate}>Donate</Button>
            </DialogActions>
        </Dialog>
    );
}
