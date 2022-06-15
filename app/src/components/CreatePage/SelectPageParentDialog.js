import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import api from '../../api';
import {useSelector} from "react-redux";
import PageAutocompleter from "../PageAutocompleter/PageAutocompleter";
import {TextField} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {validatePageParent, validatePageTitle} from "../../formValidations/pageValidation";

export default function SelectPageParentDialog({open, handleClose, submitForm}) {
    const [isLoading, setIsLoading] = useState(true);
    const [pages, setPages] = useState([]);
    const currentProject = useSelector(state => state.currentProject.item);
    const ROOT_SELECTION = {_id: '*', title: 'Project Root (No Parent)'};

    // TODO : Don't fetch children !! (API EVOLUTION)
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await api.get(`pages?project=${currentProject._id}&projection=_id,title`);
            setPages([ROOT_SELECTION, ...res.data.pages]);
            setIsLoading(false);
        })();
    }, []);

    const validationSchema = Yup.object({
        title: validatePageTitle,
        page: validatePageParent
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            page: ROOT_SELECTION
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Configure your page</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <DialogContentText>
                        Set a title and search for a parent, or select project root. You'll be able to move the page
                        later.
                    </DialogContentText>
                    <TextField
                        fullWidth
                        name="title"
                        label="Set a title"
                        type="text"
                        sx={{mt: 2, mb: 3}}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div>{formik.errors.title}</div>
                    ) : null}
                    {!isLoading && (
                        <PageAutocompleter pages={pages}
                                           rootSelection={ROOT_SELECTION} formik={formik}/>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" type="submit">Validate</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
