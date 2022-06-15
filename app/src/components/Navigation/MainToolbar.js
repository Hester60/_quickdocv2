import { Button, Skeleton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';

export const DASHBOARD_TOOLBAR = 'DASHBOARD_TOOLBAR';
export const PAGE_TOOLBAR = 'PAGE_TOOLBAR';
export const EDIT_PAGE_TOOLBAR = 'EDIT_PAGE_TOOLBAR';

export default function MainToolbar({ toolbarType, ...props }) {
    const drawerWidth = useSelector(state => state.drawerWidth.width);

    const dashboardToolbar = (
        <Toolbar>
            <Typography variant="h6" noWrap component="div">
                {!props.isLoading && props.project ? props.project.name : <Skeleton width={200} />}
            </Typography>
        </Toolbar>
    );

    const pageToolbar = (
        <Toolbar>
            <Typography variant="h6" noWrap component="div">
                {!props.isLoading && props.page ? props.page.title : <Skeleton width={200} />}
            </Typography>
        </Toolbar>
    );

    const editPageToolbar = (
        <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
                Edit page
            </Typography>
            <Button color="inherit">Cancel</Button>
            <Button color="secondary" variant="contained" sx={{ml: 2}}>Save changes</Button>
        </Toolbar>
    );

    const getToolbar = () => {
        switch (toolbarType) {
            case DASHBOARD_TOOLBAR:
                return dashboardToolbar;
            case PAGE_TOOLBAR:
                return pageToolbar;
            case EDIT_PAGE_TOOLBAR:
                return editPageToolbar;
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
