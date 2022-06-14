import MainDrawer from "./components/Navigation/MainDrawer";
import {Box, CssBaseline} from "@mui/material";
import {Routes, Route} from "react-router-dom";
import ShowPage from "./containers/Page/ShowPage";
import Dashboard from "./containers/Dashboard/Dashboard";


function App() {
    return (
        <>
            <CssBaseline/>
            <Box display="flex">
                <MainDrawer />
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/page/:pageId" element={<ShowPage />} />
                </Routes>
            </Box>
        </>
    );
}

export default App;
