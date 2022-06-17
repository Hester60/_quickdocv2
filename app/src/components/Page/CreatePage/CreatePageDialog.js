import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import api from '../../../api';
import PageAutocompleter from "../PageAutocompleter/PageAutocompleter";
import {Alert, AlertTitle, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {validatePageParent, validatePageTitle} from "../../../form-validations/pageValidation";
import {useDispatch, useSelector} from "react-redux";
import {addPage} from "../../../reducers/pagesSlice";
import {matchPath, useLocation, useNavigate} from "react-router-dom";
import {ROOT_SELECTION} from '../../../constants/PageConstants';
import {NOTIFICATION_SUCCESS_TYPE, pushNotification} from "../../../reducers/notificationsSlice";

export default function CreatePageDialog({open, setOpen}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const currentProject = useSelector(state => state.currentProject.item);
    const [isLoading, setIsLoading] = useState(true);
    const [pages, setPages] = useState([]);
    const {pathname} = useLocation();
    const [selectedPage, setSelectedPage] = useState(null);
    const matches = [matchPath(
        {path: "/page/:pageId"},
        pathname,
    ), matchPath(
        {path: "/page/edit/:pageId"},
        pathname,
    )];

    useEffect(() => {
        if (open) {
            setSelectedPage(null);
            let match = matches.find(e => e !== null);

            (async () => {
                setIsLoading(true);
                const res = await api.get(`pages?project=${currentProject._id}&projection=_id,title`);
                if (match) {
                    match = res.data.pages.find(e => e._id === match.params.pageId);
                    setSelectedPage(match);
                } else {
                    setSelectedPage(ROOT_SELECTION)
                }
                setSelectedPage(match);
                setPages([ROOT_SELECTION, ...res.data.pages]);
                if (match) {
                    formik.setFieldValue('page', !match ? null : match)
                }
                setIsLoading(false);
            })();
        }
    }, [open]);

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
    };

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
        onSubmit: async (values) => {
            await validateSelectParent(values);
        }
    });

    const validateSelectParent = async (values) => {
        const parent = values.page._id !== '*' ? values.page._id : null;

        try {
            setErrors(null);
            setIsLoading(true);

            const res = await api.post(`pages`, {title: values.title, parent, project: currentProject._id});
            const page = res.data;

            dispatch(addPage(page));

            dispatch(pushNotification({text: 'Page has been created !', type: NOTIFICATION_SUCCESS_TYPE}));
            navigate(`page/edit/${page._id}`);
            handleClose();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.status === 422) {
                console.log(error.response.data.errors);
                setErrors(error.response.data.errors);
            }
        }
    }

    return (
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
                        Set a title and search for a parent, or select project root. You'll be able to move or edit the
                        page
                        later.
                    </DialogContentText>
                    <TextField
                        fullWidth
                        name="title"
                        disabled={isLoading}
                        label="Set a title"
                        type="text"
                        sx={{mt: 2, mb: 3}}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        error={(!!(formik.touched.title && formik.errors.title))}
                        helperText={formik.touched.title && formik.errors.title ? (
                            formik.errors.title
                        ) : null}
                    />
                    <PageAutocompleter pages={pages}
                                       defaultSelection={selectedPage} formik={formik} disabled={isLoading}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" type="submit" disabled={isLoading}>Validate</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}