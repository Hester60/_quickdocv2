import MainDrawer from "./components/Navigation/MainDrawer";
import { Box, CircularProgress, createTheme, CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import ShowPage from "./containers/Page/ShowPage";
import Dashboard from "./containers/Dashboard/Dashboard";
import EditPage from "./containers/Page/EditPage";
import CreateProject from "./containers/Project/CreateProject";
import EditProject from "./containers/Project/EditProject";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./components/Notification/Notification";
import { useEffect, useState } from "react";
import { fetchProjects } from "./reducers/projectsSlice";
import { selectCurrentProject } from "./reducers/currentProjectSlice";
import api from './api';
import { addHttpError, clearHttpError } from "./reducers/httpErrorSlice";
import HttpErrorDialog from './components/HttpError/HttpErrorDialog';
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import Login from "./containers/Auth/Login";
import { logout } from "./reducers/authSlice";

const AppLoader = () => (
    <Box sx={{
        display: 'flex',
        flexFlow: 'column',
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        <CircularProgress size={75} />
        <Box component="div" mt={3}>
            <Typography>Loading. Please wait ...</Typography>
        </Box>
    </Box>
)

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notifications.items);
    const [isLoading, setIsLoading] = useState(true);
    const currentProject = useSelector(state => state.currentProject.item);
    const navigate = useNavigate();

    useEffect(() => {
        api.interceptors.request.use(
            (req) => {
               req.headers.authorization = `Bearer ${localStorage.getItem('token')}`
               return req;
            },
            (err) => {
               return Promise.reject(err);
            }
         );

        // Response interceptor
        api.interceptors.response.use(
            response => response,
            async (error) => {
                dispatch(clearHttpError())
                console.log(error);
                if (error.response && error.response.status !== 422) {
                    dispatch(addHttpError(error.response.data.error ?? error.response.data.message));
                }
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
                setIsLoading(false);
                return Promise.reject(error);
            });

        if (location.pathname !== '/login') {
            (async () => {
                setIsLoading(true);
                const projects = await dispatch(fetchProjects()).unwrap();
                const selectedProject = currentProject ?? projects[0];
                if (projects.length > 0) {
                    await dispatch(selectCurrentProject(selectedProject));
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    return navigate('/project/create');
                }
            })();
        }
    }, [])

    return (
        <>
            {!isLoading ? (
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />
                    <Box display="flex">
                        {location.pathname !== '/login' && (<MainDrawer />)}
                        <Box p={3} sx={{ flexGrow: 1 }}>
                            <Routes>
                                <Route path="/dashboard" element={<ProtectedRoute ><Dashboard /></ProtectedRoute>} />
                                <Route path="/project/create" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
                                <Route path="/project/edit" element={<ProtectedRoute><EditProject /></ProtectedRoute>} />
                                <Route path="/page/:pageId" element={<ProtectedRoute><ShowPage /></ProtectedRoute>} />
                                <Route path="/page/edit/:pageId" element={<ProtectedRoute><EditPage /></ProtectedRoute>} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/" element={<Navigate replace to="/dashboard" />} />
                            </Routes>
                        </Box>
                    </Box>
                    {notifications.map(notification => <Notification type={notification.type} id={notification.id}
                        text={notification.text} key={notification.id} />)}
                    <HttpErrorDialog />
                    <CssBaseline />
                </ThemeProvider>
            ) :
                <AppLoader />}
        </>
    );
}

export default App;
