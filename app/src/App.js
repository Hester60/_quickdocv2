import Navigation from './components/Navigation/Navigation';
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function App() {
  return (
      <>
          <CssBaseline />
          <AppBar
              position="fixed"
              sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
              <Toolbar>
                  <Typography variant="h6" noWrap component="div">
                      Quickdoc V2
                  </Typography>
              </Toolbar>
          </AppBar>
          <Box display="flex">
              <Navigation />
              <Box
                  component="main"
                  sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
              >
                  <Toolbar />
                  <p>Page content</p>
              </Box>
          </Box>
      </>
  );
}

export default App;
