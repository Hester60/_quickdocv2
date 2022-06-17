import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import api from '../../api';
import PageAutocompleter from "../PageAutocompleter/PageAutocompleter";
import { Alert, AlertTitle, Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { validatePageParent } from "../../formValidations/pageValidation";
import { ROOT_SELECTION } from '../../constants/PageConstants';
import { useDispatch, useSelector } from 'react-redux';
import Notification from "../Notification/Notification";
import { deletePages } from '../../reducers/pagesSlice';
import { useNavigate } from 'react-router-dom';

export default function RemovePageDialog({ open, setOpen, page }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [openNotification, setOpenNotification] = useState(false);

    useEffect(() => {
    }, [open]);

    const handleClose = () => {
        setOpen(false);
    };

    async function onSubmitDelete() {
        console.log(page);
        try {
            setIsLoading(true);

            const res = await api.delete(`pages/${page._id}/remove`);

            const { deletedIds } = res.data;
            dispatch(deletePages(deletedIds));
            setOpenNotification(true);
            navigate('/dashboard');
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
                    <Button disabled={isLoading} onClick={onSubmitDelete} variant="contained" color="warning">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
            <Notification open={openNotification} setOpen={setOpenNotification} message="Page has been removed !" />
        </>
    )
}
