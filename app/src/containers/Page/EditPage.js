import {CardContent, TextField, Toolbar, Box, Button, Alert, AlertTitle, Typography} from "@mui/material";
import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import api from '../../api';
import MainToolbar from "../../components/Navigation/MainToolbar";
import {EDIT_PAGE_TOOLBAR} from "../../components/Navigation/MainToolbar";
import PageContentEditor from "./PageContentEditor";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {validatePageTitle} from "../../formValidations/pageValidation";
import {useDispatch} from "react-redux";
import {editPage} from "../../reducers/pagesSlice";
import Notification from "../../components/Notification/Notification";

export default function EditPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [page, setPage] = useState(null);
    const [openNotification, setOpenNotification] = useState(false);
    let {pageId} = useParams();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await api.get(`pages/${pageId}`);
            setPage(res.data);
            await formik.setFieldValue('title', res.data.title);
            await formik.setFieldValue('body', res.data.body);
            setIsLoading(false);
        })();
    }, [pageId]);

    const formik = useFormik({
        initialValues: {
            title: '',
            body: ''
        },
        validationSchema: Yup.object({
            title: validatePageTitle
        }),
        onSubmit: async (values) => {
            try {
                setErrors(null);
                setIsLoading(true);

                const {title, body} = values;
                const res = await api.put(`pages/${page._id}`, {title, body});
                setIsLoading(false);
                dispatch(editPage(res.data));
                setOpenNotification(true);
            } catch (error) {
                setIsLoading(false);
                if (error.response && error.response.status) {
                    setErrors(error.response.data.errors);
                }
            }
        }
    });

    const form = () => (
        <>
            <form onSubmit={formik.handleSubmit}>
                {errors && (
                    <Alert severity="error" sx={{mb: 2}}>
                        <AlertTitle>There are errors in your form !</AlertTitle>
                        {Object.keys(errors).map(error => {
                            return <Typography key={error}>{errors[error].message}</Typography>
                        })}
                    </Alert>

                )}

                <TextField
                    name="title" fullWidth label="Page title" variant="outlined" onChange={formik.handleChange}
                    value={formik.values.title} sx={{mb: 3}}
                    error={(!!(formik.touched.title && formik.errors.title))}
                    helperText={formik.touched.title && formik.errors.title ? (
                        formik.errors.title
                    ) : null}
                />
                <PageContentEditor formik={formik}/>
            </form>
        </>
    )

    return (
        <>
            <Box sx={{display: 'flex', flexFlow: 'column'}}>
                <MainToolbar toolbarType={EDIT_PAGE_TOOLBAR} onSave={() => formik.handleSubmit()} backToPage={() => navigate(`/page/${page._id}`)}/>
                <Toolbar/>
            </Box>
            <Box sx={{width: '100%', flexFlow: 'column'}} display='flex' alignItems="center">
                <Box sx={{width: '100%', maxWidth: 1250, mt: 2}}>
                    <CardContent>
                        {!isLoading && page && form()}
                    </CardContent>
                </Box>
            </Box>
            <Notification open={openNotification} setOpen={setOpenNotification} message="Changes has been saved !"/>
        </>
    )
}
