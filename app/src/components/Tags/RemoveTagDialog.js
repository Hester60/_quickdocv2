import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import Button from '@mui/material/Button';
import api from '../../api';
import {useDispatch} from "react-redux";
import {NOTIFICATION_SUCCESS_TYPE, pushNotification} from "../../reducers/notificationsSlice";

export default function RemoveTagDialog({ open, setOpen, tag, tags = [] }) {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    async function onSubmitDelete() {
        try {
            setIsLoading(true);

            await api.delete(`tags/${tag._id}`);

            const index = tags.findIndex(e => e._id === tag._id);
            if (index >= 0) {
                tags.splice(index, 1);
            }

            dispatch(pushNotification({text: 'Tag has been removed !', type: NOTIFICATION_SUCCESS_TYPE}));
            handleClose();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            alert(error);
        }
    }


    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    {"Are you sure to delete this tag ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This action is irreversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button disabled={isLoading} onClick={handleClose}>Cancel</Button>
                    <Button disabled={isLoading} onClick={onSubmitDelete} variant="contained" disableElevation color="warning">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
