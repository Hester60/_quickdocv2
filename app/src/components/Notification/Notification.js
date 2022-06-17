import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Alert} from "@mui/lab";
import {useDispatch} from "react-redux";
import {removeNotification} from "../../reducers/notificationsSlice";

export default function Notification({type, id, text}) {
    const dispatch = useDispatch();
    const TTL = 3000;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(removeNotification(id));
    };

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    return (
        <Snackbar
            open={true}
            autoHideDuration={TTL}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            action={action}>
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                {text}
            </Alert>
        </Snackbar>
    );
}
