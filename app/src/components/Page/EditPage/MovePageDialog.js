import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import api from '../../../api';
import PageAutocompleter from "../PageAutocompleter/PageAutocompleter";
import {Alert, AlertTitle, Box, Typography} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {validatePageParent} from "../../../form-validations/pageValidation";
import {ROOT_SELECTION} from '../../../constants/PageConstants';
import {useDispatch, useSelector} from 'react-redux';
import {editPage} from "../../../reducers/pagesSlice";
import {NOTIFICATION_INFO_TYPE, pushNotification} from "../../../reducers/notificationsSlice";

export default function MovePageDialog({open, setOpen, page, setPage}) {
    const dispatch = useDispatch();
    const [pages, setPages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const currentProject = useSelector(state => state.currentProject.item);
    const [errors, setErrors] = useState(null);
    const [defaultSelection, setDefaultSelection] = useState(null);

    useEffect(() => {
        if (open === true) {
            (async () => {
                setIsLoading(true);
                const res = await api.get(`pages?project=${currentProject._id}&projection=_id,title,parent`);
                setPages([ROOT_SELECTION, ...res.data.pages]);
                removeChildren(page, res.data.pages);
                const defPage = page.parent ? {_id: page.parent._id, title: page.parent.title} : ROOT_SELECTION;
                setDefaultSelection(defPage);
                await formik.setFieldValue('page', defPage);
                setIsLoading(false);
            })();
        }
    }, [open]);

    const removeChildren = (p, currentPages) => {
        if (p) {
            setPages((previousState) => {
                const pIndex = previousState.findIndex(e => e._id === p._id);
                previousState.splice(pIndex, 1);

                return previousState;
            });

            const children = currentPages.filter(e => e.parent === p._id);
            children.forEach(child => {
                removeChildren(child, currentPages);
            });
        }
    }

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
    };

    const validationSchema = Yup.object({
        page: validatePageParent
    });

    const formik = useFormik({
        initialValues: {
            page: ROOT_SELECTION
        },
        validationSchema,
        onSubmit: async (values) => {
            await onSubmitMove(values);
        }
    });

    async function onSubmitMove(values) {
        try {
            setErrors(null);
            setIsLoading(true);

            const res = await api.put(`pages/${page._id}/move`, {parent: values.page._id === '*' ? null : values.page._id});

            const updatedPage = res.data;
            dispatch(editPage({...updatedPage, parent: updatedPage.parent ? updatedPage.parent._id : null}));
            setPage(updatedPage)
            dispatch(pushNotification({text: 'Page has been moved !', type: NOTIFICATION_INFO_TYPE}))
            handleClose();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.status === 422) {
                console.log(error.response.data.errors);
                setErrors(error.response.data.errors);
            } else {
                alert(error);
            }
        }
    }


    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Configure your page</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        {errors && (
                            <Alert severity="error" sx={{mb: 2}}>
                                <AlertTitle>There are errors in your form !</AlertTitle>
                                {Object.keys(errors).map(error => {
                                    return <Typography key={error}>{errors[error].message}</Typography>
                                })}
                            </Alert>

                        )}
                        <DialogContentText>
                            Search for a parent, or select project root. You'll be able to move the page
                            later.
                        </DialogContentText>
                        <Box sx={{mt: 2}}>
                            <PageAutocompleter pages={pages}
                                               defaultSelection={defaultSelection}
                                               formik={formik} disabled={isLoading}/>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="error" disableElevation onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" type="submit" disableElevation disabled={isLoading}>Validate</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}
