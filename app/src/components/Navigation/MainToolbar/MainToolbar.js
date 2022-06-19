import {Button, Skeleton} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import PageMenu from '../Menu/PageMenu/PageMenu';
import ProjectMenu from "../Menu/ProjectMenu/ProjectMenu";
import IconButton from "@mui/material/IconButton";
import {MenuOpen, Menu} from "@mui/icons-material";
import {modifyWidth} from "../../../reducers/drawerWidthSlice";
import {minDrawerWidth} from "../../../reducers/drawerWidthSlice";
import {makeStyles} from "@mui/styles";

export const DASHBOARD_TOOLBAR = 'DASHBOARD_TOOLBAR';
export const PAGE_TOOLBAR = 'PAGE_TOOLBAR';
export const EDIT_PAGE_TOOLBAR = 'EDIT_PAGE_TOOLBAR';
export const CREATE_PROJECT_TOOLBAR = 'CREATE_PROJECT_TOOLBAR';
export const EDIT_PROJECT_TOOLBAR = 'EDIT_PROJECT_TOOLBAR';

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function MainToolbar({toolbarType, ...props}) {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const drawerWidth = useSelector(state => state.drawerWidth.width);
    const project = useSelector(state => state.currentProject.item);

    const closeDrawer = (e) => {
        e.stopPropagation()
        dispatch(modifyWidth(0));
    }

    const openDrawer = (e) => {
        e.stopPropagation();
        dispatch(modifyWidth(minDrawerWidth));
    }

    const drawerButtons = () => {
        return (
            <>
                {drawerWidth > 0 && (
                    <IconButton aria-label="close" color="inherit" onClick={closeDrawer}>
                        <MenuOpen/>
                    </IconButton>
                )}
                {
                    drawerWidth <= 0 && (
                        <IconButton aria-label="open" color="inherit" onClick={openDrawer}>
                            <Menu/>
                        </IconButton>
                    )
                }
            </>
        )
    }

    const dashboardToolbar = (
        <Toolbar>
            {drawerButtons()}
            <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1, ml: 1}}>
                {!props.isLoading && props.project ? props.project.name : <Skeleton width={200}/>}
            </Typography>
            <ProjectMenu/>
        </Toolbar>
    );

    const pageToolbar = (
        <Toolbar>
            {drawerButtons()}
            <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
                Show page
            </Typography>
            {props.page && <PageMenu {...props} />}
        </Toolbar>
    );

    const editPageToolbar = (
        <Toolbar>
            {drawerButtons()}
            <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
                Edit page
            </Typography>
            <Button color="inherit" onClick={props.backToPage} sx={{ml: 2}}>Back to page</Button>
            <Button color="secondary" type="button" variant="contained" disableElevation sx={{ml: 2}}
                    onClick={props.onSave}>Save
                changes</Button>
        </Toolbar>
    );

    const createProjectToolbar = (
        <Toolbar>
            {drawerButtons()}
            <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
                Create project
            </Typography>
            {project && <Button color="inherit" onClick={() => navigate('/dashboard')}>Back to dashboard</Button>}
        </Toolbar>
    )

    const editProjectToolbar = (
        <Toolbar>
            {drawerButtons()}
            <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
                Edit project
            </Typography>
            <Button color="inherit" onClick={() => navigate('/dashboard')}>Back to dashboard</Button>
        </Toolbar>
    )

    const getToolbar = () => {
        switch (toolbarType) {
            case DASHBOARD_TOOLBAR:
                return dashboardToolbar;
            case PAGE_TOOLBAR:
                return pageToolbar;
            case EDIT_PAGE_TOOLBAR:
                return editPageToolbar;
            case CREATE_PROJECT_TOOLBAR:
                return createProjectToolbar;
            case EDIT_PROJECT_TOOLBAR:
                return editProjectToolbar;
            default:
                throw new Error('Invalid toolbar type !')
        }
    }

    return (
        <AppBar
            position="fixed"
            color="default"
            sx={{
                width: {sm: `calc(100% - ${drawerWidth}px)`},
                ml: {sm: `${drawerWidth}px`},
            }}>
            {getToolbar()}
        </AppBar>
    )
}
