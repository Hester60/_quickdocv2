import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import Button from '@mui/material/Button';
import api from '../../../api';
import { useDispatch } from 'react-redux';
import { deletePages } from '../../../reducers/pagesSlice';
import { useNavigate } from 'react-router-dom';
import {NOTIFICATION_SUCCESS_TYPE, pushNotification} from "../../../reducers/notificationsSlice";

export default function RemovePageDialog({ open, setOpen, page }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    async function onSubmitDelete() {
        try {
            setIsLoading(true);

            const res = await api.delete(`pages/${page._id}`);

            const { deletedIds } = res.data;
            dispatch(deletePages(deletedIds));
            dispatch(pushNotification({text: 'Page has been removed !', type: NOTIFICATION_SUCCESS_TYPE}));
            handleClose();
            setIsLoading(false);
            if (page.parent) {
                return navigate(`/page/${page.parent._id}`);
            } else {
                return navigate('/dashboard');
            }
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
                    {"Are you sure to delete this page ?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This action is irreversible and all children will be deleted too.
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
