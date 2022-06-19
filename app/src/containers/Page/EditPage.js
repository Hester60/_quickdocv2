import {
    CardContent,
    TextField,
    Toolbar,
    Box,
    Alert,
    AlertTitle,
    Typography,
    InputLabel,
    Select,
    MenuItem, FormControl
} from "@mui/material";
import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import api from '../../api';
import MainToolbar from "../../components/Navigation/MainToolbar/MainToolbar";
import {EDIT_PAGE_TOOLBAR} from "../../components/Navigation/MainToolbar/MainToolbar";
import PageContentEditor from "./PageContentEditor";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {validatePageTitle} from "../../form-validations/pageValidation";
import {useDispatch, useSelector} from "react-redux";
import {editPage} from "../../reducers/pagesSlice";
import {NOTIFICATION_SUCCESS_TYPE, pushNotification} from "../../reducers/notificationsSlice";
import {selectCurrentProject} from "../../reducers/currentProjectSlice";
import {selectAllProjects} from "../../reducers/projectsSlice";
import SelectTag from "../../components/Page/Form/SelectTag";

export default function EditPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [page, setPage] = useState(null);
    const [tags, setTags] = useState([]);
    const currentProject = useSelector(state => state.currentProject.item);
    const projects = useSelector(selectAllProjects);
    let {pageId} = useParams();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await api.get(`pages/${pageId}`);
            setPage(res.data);

            if (currentProject._id !== res.data.project._id) {
                const projectIndex = projects.findIndex(e => e._id === res.data.project._id);
                if (projectIndex < 0) {
                    return navigate('/dashboard');
                }

                dispatch(selectCurrentProject(res.data.project));
            }

            const resTags = await api.get('tags');
            setTags(resTags.data);
            await formik.setFieldValue('title', res.data.title);
            await formik.setFieldValue('body', res.data.body);
            await formik.setFieldValue('tag', res.data.tag ? res.data.tag._id : '');
            setIsLoading(false);
        })();
    }, [pageId]);

    const formik = useFormik({
        initialValues: {
            title: '',
            body: '',
            tag: ''
        },
        validationSchema: Yup.object({
            title: validatePageTitle
        }),
        onSubmit: async (values) => {
            try {
                setErrors(null);
                setIsLoading(true);

                const {title, body, tag} = values;
                const res = await api.put(`pages/${page._id}`, {title, body, tag: tag === '' ? null : tag});
                setIsLoading(false);
                dispatch(editPage(res.data));
                dispatch(pushNotification({text: 'Page has been updated !', type: NOTIFICATION_SUCCESS_TYPE}))
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
                <SelectTag formik={formik} isLoading={isLoading} tags={tags} />
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
        </>
    )
}
