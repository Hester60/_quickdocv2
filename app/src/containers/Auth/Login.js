import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import api from '../../api';
import { useEffect, useState } from 'react';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NOTIFICATION_SUCCESS_TYPE } from '../../reducers/notificationsSlice';

function Copyright(props) {
    return (
        <Box>
            <Typography color="text.secondary" align="center">
                I made this app for my personal use, however you can find the source code <a href="https://github.com/Hester60/_quickdocv2" target="__blank">here.</a>
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="https://thomascarbuccia.fr/">
                    thomascarbuccia.fr
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    );
}

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            return navigate('/dashboard');
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values) => {
            try {
                setIsLoading(true);

                const res = await api.post('auth', {
                    email: values.email,
                    password: values.password
                });

                localStorage.setItem('token', res.data.token);
                formik.resetForm();
                dispatch({ text: "You are now logged in", type: NOTIFICATION_SUCCESS_TYPE });
                setIsLoading(false);
                return navigate('/dashboard');
            } catch (error) {
                formik.setFieldValue('password', '');
                setIsLoading(false);
            }
        }
    });

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        disabled={isLoading}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        disabled={isLoading}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        disabled={isLoading}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}
