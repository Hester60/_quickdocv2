import MainDrawer from "./components/Navigation/MainDrawer";
import { Box, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import ShowPage from "./containers/Page/ShowPage";
import Dashboard from "./containers/Dashboard/Dashboard";
import { ThemeProvider, createTheme } from '@mui/material/styles';


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Box display="flex">
                    <MainDrawer />
                    <Box p={3}>
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/page/:pageId" element={<ShowPage />} />
                        </Routes>
                    </Box>

                </Box>
            </ThemeProvider>
        </>
    );
}

export default App;
