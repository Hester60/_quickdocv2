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
import { useSelector } from 'react-redux';

export default function MovePageDialog({ open, setOpen, page }) {
    // TODO: Refresh on page change (same in create dialog when adding new page !!)
    // TODO: edit API to include parent in findPageById query!! 
     
    const [pages, setPages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const currentProject = useSelector(state => state.currentProject.item);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await api.get(`pages?project=${currentProject._id}&projection=_id,title,parent`);
            setPages([ROOT_SELECTION, ...res.data.pages]);
            removeChildren(page, res.data.pages);
            setIsLoading(false);
        })();
    }, []);

    const removeChildren = (p, currentPages) => {
        if (p) {
            setPages((previousState ) => {
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
            page: { _id: page._id, title: page.title }
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
        }
    });

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Configure your page</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    {errors && (
                        <Alert severity="error" sx={{ mb: 2 }}>
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
                    <Box sx={{ mt: 2 }}>
                        <PageAutocompleter pages={pages}
                        defaultSelection={{ _id: page._id, title: page.title }} formik={formik} disabled={isLoading} />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" type="submit" disabled={isLoading}>Validate</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
