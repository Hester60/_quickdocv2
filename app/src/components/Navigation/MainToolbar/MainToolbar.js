import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useDispatch, useSelector} from 'react-redux';
import IconButton from "@mui/material/IconButton";
import {MenuOpen, Menu} from "@mui/icons-material";
import {modifyWidth} from "../../../reducers/drawerWidthSlice";
import {minDrawerWidth} from "../../../reducers/drawerWidthSlice";
import {makeStyles} from "@mui/styles";

export const CREATE_PROJECT_TOOLBAR = 'CREATE_PROJECT_TOOLBAR';
export const EDIT_PROJECT_TOOLBAR = 'EDIT_PROJECT_TOOLBAR';

const useStyle = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        borderBottom: '1px solid ' + theme.palette.action.disabledBackground
    },
}));

export default function MainToolbar({title, children}) {
    const classes = useStyle();
    const drawerWidth = useSelector(state => state.drawerWidth.width);
    const dispatch = useDispatch();

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

    return (
        <AppBar
            position="fixed"
            color="default"
            elevation={0}
            className={classes.appBar}
        >
            <Toolbar>
                {drawerButtons()}
                <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1, ml: 1}}>
                    {title}
                </Typography>
                {children}
            </Toolbar>
        </AppBar>
    )
}
