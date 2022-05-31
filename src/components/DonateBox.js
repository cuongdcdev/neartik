import React, { useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { stepButtonClasses } from "@mui/material";
import {utils} from "near-api-js";

export default function DonateBox(props) {
    const [open, setOpen] = React.useState(false);
    const inputRef = useRef();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.setOpen(false);
    };

    const handleDonate = () => {
        console.log("donate clicked: ", inputRef.current.value);
        var amount = utils.format.parseNearAmount(inputRef.current.value) ;

        window.walletConnection.account().sendMoney(props.receiver, amount)
            .then(ob => {
                console.log("transfer done", ob)
            })
            .catch(err => {
                console.log("transfer err", err)
            })
    };

    useEffect(() => {
        setOpen(props.open);
    }, [props.open]);


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
                    <p>💰 {props.receiver}</p>
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
