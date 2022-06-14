import { Skeleton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

export const DASHBOARD_TOOLBAR = 'DASHBOARD_TOOLBAR';

export default function MainToolbar({ toolbarType, ...props }) {
    const drawerWidth = useSelector(state => state.drawerWidth.width);

    const dashboardToolbar = (
        <Toolbar>
            <Typography variant="h6" noWrap component="div">
                {!props.isLoading && props.project ? props.project.name : <Skeleton width={150} />}
            </Typography>
        </Toolbar>
    )

    const getToolbar = () => {
        switch (toolbarType) {
            case DASHBOARD_TOOLBAR:
                return dashboardToolbar;
            default:
                throw new Error('Invalid toolbar type !')
        }
    }

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` },
            }}>
            {getToolbar()}
        </AppBar>
    )
}