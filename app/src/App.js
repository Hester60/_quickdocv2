import MainDrawer from "./components/Navigation/MainDrawer";
import {Box, CssBaseline} from "@mui/material";
import {Routes, Route} from "react-router-dom";
import ShowPage from "./containers/Page/ShowPage";


function App() {
    return (
        <>
            <CssBaseline/>
            <Box display="flex">
                <MainDrawer />
                <Routes>
                    <Route path="/page/:pageId" element={<ShowPage />} />
                </Routes>
            </Box>
        </>
    );
}

export default App;
