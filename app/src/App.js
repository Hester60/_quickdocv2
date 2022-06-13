import MainDrawer from "./components/Navigation/MainDrawer";
import {Box, CssBaseline} from "@mui/material";

function App() {
    return (
        <>
            <CssBaseline/>
            <Box display="flex">
                <MainDrawer/>
            </Box>
        </>
    );
}

export default App;
