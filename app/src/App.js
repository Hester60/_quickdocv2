import MainDrawer from "./components/Navigation/MainDrawer";
import { Box, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import ShowPage from "./containers/Page/ShowPage";
import Dashboard from "./containers/Dashboard/Dashboard";

function App() {
    return (
        <>
            <CssBaseline />
            <Box display="flex">
                <MainDrawer />
                <Box p={3} sx={{flexGrow: 1}}>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/page/:pageId" element={<ShowPage />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
}

export default App;
