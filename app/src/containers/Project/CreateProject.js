import {Box, Toolbar, CardContent, Alert, AlertTitle, Typography, TextField, Button} from '@mui/material';
import {CREATE_PROJECT_TOOLBAR} from '../../components/Navigation/MainToolbar/MainToolbar';
import MainToolbar from '../../components/Navigation/MainToolbar/MainToolbar';
import {useState} from 'react';
import {validateProjectName} from '../../form-validations/projetValidation';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import api from '../../api';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {selectCurrentProject} from '../../reducers/currentProjectSlice';
import ProjectForm from '../../components/Project/ProjectForm/ProjectForm';
import {NOTIFICATION_SUCCESS_TYPE} from "../../reducers/notificationsSlice";
import {resetPages} from "../../reducers/pagesSlice";
import {selectAllProjects} from "../../reducers/projectsSlice";

export default function CreateProject() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const projects = useSelector(selectAllProjects);
    const projectsLoading = useSelector(state => state.projects.loading);
    const project = useSelector(state => state.currentProject.item);

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: validateProjectName
        }),
        onSubmit: async (values) => {
            try {
                setErrors(null);
                setIsLoading(true);

                const {name} = values;
                const res = await api.post(`projects`, {
                    name
                });

                const project = res.data;

                setIsLoading(false);

                // No need to dispatch into projects because project list is refreshed when user click it

                formik.resetForm();
                dispatch({text: 'Project has been created !', type: NOTIFICATION_SUCCESS_TYPE});
                dispatch(resetPages());
                dispatch(selectCurrentProject(project));
                return navigate('/dashboard');
            } catch (error) {
                setIsLoading(false);
                if (error.response && error.response.status) {
                    setErrors(error.response.data.errors);
                }
            }
        }
    });

    return (
        <>
            <Box sx={{display: 'flex', flexFlow: 'column'}}>
                <MainToolbar title="Create Project">
                    {project &&
                        <Button color="inherit" onClick={() => navigate('/dashboard')}>Back to dashboard</Button>}
                </MainToolbar>
                <Toolbar/>
            </Box>
            <Box sx={{width: '100%', flexFlow: 'column'}} display='flex' alignItems="center">
                <Box sx={{width: '100%', maxWidth: 1250, mt: 2}}>
                    <CardContent>
                        {!projectsLoading && projects.length <= 0 &&
                            <Alert sx={{mb: 2}} severity="error">You need to create a first project !</Alert>}
                        <ProjectForm formik={formik} isLoading={isLoading} errors={errors} buttonLabel="Create"/>
                    </CardContent>
                </Box>
            </Box>
        </>
    )
}
