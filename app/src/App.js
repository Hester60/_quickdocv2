import MainDrawer from "./components/Navigation/MainDrawer";
import { Box, CssBaseline } from "@mui/material";
import {Routes, Route, Navigate} from "react-router-dom";
import ShowPage from "./containers/Page/ShowPage";
import Dashboard from "./containers/Dashboard/Dashboard";
import EditPage from "./containers/Page/EditPage";
import CreateProject from "./containers/Project/CreateProject";
import EditProject from "./containers/Project/EditProject";
import {useSelector} from "react-redux";
import Notification from "./components/Notification/Notification";
import {useEffect} from "react";

function App() {
    const notifications = useSelector(state => state.notifications.items);

    useEffect(() => {

    }, [])

    return (
        <>
            <CssBaseline />
            <Box display="flex">
                <MainDrawer />
                <Box p={3} sx={{flexGrow: 1}}>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/project/create" element={<CreateProject />} />
                        <Route path="/project/edit" element={<EditProject />} />
                        <Route path="/page/:pageId" element={<ShowPage />} />
                        <Route path="/page/edit/:pageId" element={<EditPage />} />
                        <Route path="/" element={<Navigate replace to="/dashboard" />} />
                    </Routes>
                </Box>
            </Box>
            {notifications.map(notification => <Notification type={notification.type} id={notification.id} text={notification.text} key={notification.id} />)}
        </>
    );
}

export default App;
