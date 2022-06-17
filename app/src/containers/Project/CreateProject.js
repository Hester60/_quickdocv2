import { Box, Toolbar, CardContent, Alert, AlertTitle, Typography, TextField, Button } from '@mui/material';
import { CREATE_PROJECT_TOOLBAR } from '../../components/Navigation/MainToolbar/MainToolbar';
import MainToolbar from '../../components/Navigation/MainToolbar/MainToolbar';
import { useState } from 'react';
import { validateProjectName } from '../../form-validations/projetValidation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Notification from '../../components/Notification/Notification';
import api from '../../api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCurrentProject } from '../../reducers/currentProjectSlice';
import ProjectForm from '../../components/Project/ProjectForm/ProjectForm';

export default function CreateProject() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [openNotification, setOpenNotification] = useState(false);

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
                console.log(project);

                setIsLoading(false);

                // No need to dispatch into projects because project list is refreshed when user click it

                formik.resetForm();
                setOpenNotification(true);
                dispatch(selectCurrentProject(project));
                navigate('/dashboard');
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
            <Box sx={{ display: 'flex', flexFlow: 'column' }}>
                <MainToolbar toolbarType={CREATE_PROJECT_TOOLBAR} />
                <Toolbar />
            </Box>
            <Box sx={{ width: '100%', flexFlow: 'column' }} display='flex' alignItems="center">
                <Box sx={{ width: '100%', maxWidth: 1250, mt: 2 }}>
                    <CardContent>
                        <ProjectForm formik={formik} isLoading={isLoading} errors={errors} />
                    </CardContent>
                </Box>
            </Box>
            <Notification open={openNotification} setOpen={setOpenNotification} message="Project has been created !"/>
        </>
    )
}
