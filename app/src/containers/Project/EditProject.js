import {Box, Toolbar, CardContent, Alert, AlertTitle, Typography, TextField, Button} from '@mui/material';
import {EDIT_PROJECT_TOOLBAR} from '../../components/Navigation/MainToolbar/MainToolbar';
import MainToolbar from '../../components/Navigation/MainToolbar/MainToolbar';
import {useEffect, useState} from 'react';
import {validateProjectName} from '../../form-validations/projetValidation';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import api from '../../api';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {selectCurrentProject} from '../../reducers/currentProjectSlice';
import ProjectForm from '../../components/Project/ProjectForm/ProjectForm';
import {NOTIFICATION_SUCCESS_TYPE} from "../../reducers/notificationsSlice";

export default function EditProject() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectedProject = useSelector(state => state.currentProject.item);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        if (!selectedProject) {
            navigate('/dashboard');
        } else {
            formik.setFieldValue('name', selectedProject.name);
        }
    }, [selectedProject])

    const formik = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: Yup.object({
            name: validateProjectName
        }),
        onSubmit: async (values) => {
            try {
                setErrors(null);
                setIsLoading(true);

                const {name} = values;
                const res = await api.put(`projects/${selectedProject._id}`, {
                    name
                });

                const project = res.data;

                setIsLoading(false);

                // No need to dispatch into projects because project list is refreshed when user click it

                formik.resetForm();
                dispatch(selectCurrentProject(project));
                dispatch({text: 'Project has been updated !', type: NOTIFICATION_SUCCESS_TYPE});
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
                <MainToolbar toolbarType={EDIT_PROJECT_TOOLBAR}/>
                <Toolbar/>
            </Box>
            <Box sx={{width: '100%', flexFlow: 'column'}} display='flex' alignItems="center">
                <Box sx={{width: '100%', maxWidth: 1250, mt: 2}}>
                    <CardContent>
                        <ProjectForm formik={formik} isLoading={isLoading} errors={errors} buttonLabel="Update"/>
                    </CardContent>
                </Box>
            </Box>
        </>
    )
}
