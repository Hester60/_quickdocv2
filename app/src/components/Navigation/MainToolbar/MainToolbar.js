import {Button, Skeleton} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import PageMenu from '../Menu/PageMenu/PageMenu';
import RemoveProjectButton from "../Menu/ProjectMenu/RemoveProjectButton";
import ProjectMenu from "../Menu/ProjectMenu/ProjectMenu";

export const DASHBOARD_TOOLBAR = 'DASHBOARD_TOOLBAR';
export const PAGE_TOOLBAR = 'PAGE_TOOLBAR';
export const EDIT_PAGE_TOOLBAR = 'EDIT_PAGE_TOOLBAR';
export const CREATE_PROJECT_TOOLBAR = 'CREATE_PROJECT_TOOLBAR';
export const EDIT_PROJECT_TOOLBAR = 'EDIT_PROJECT_TOOLBAR';

export default function MainToolbar({toolbarType, ...props}) {
  const navigate = useNavigate();
  const drawerWidth = useSelector(state => state.drawerWidth.width);
  const project = useSelector(state => state.currentProject.item);

  const dashboardToolbar = (
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
        {!props.isLoading && props.project ? props.project.name : <Skeleton width={200}/>}
      </Typography>
      <ProjectMenu />
    </Toolbar>
  );

  const pageToolbar = (
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
        Show page
      </Typography>
      {props.page && <PageMenu {...props} />}
    </Toolbar>
  );

  const editPageToolbar = (
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
        Edit page
      </Typography>
      <Button color="inherit" onClick={props.backToPage} sx={{ml: 2}}>Back to page</Button>
      <Button color="secondary" type="button" variant="contained" disableElevation sx={{ml: 2}} onClick={props.onSave}>Save
        changes</Button>
    </Toolbar>
  );

  const createProjectToolbar = (
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
        Create project
      </Typography>
      {project && <Button color="inherit" onClick={() => navigate('/dashboard')}>Back to dashboard</Button>}
    </Toolbar>
  )

  const editProjectToolbar = (
    <Toolbar>
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
      elevation={0}
      sx={{
        width: {sm: `calc(100% - ${drawerWidth}px)`},
        ml: {sm: `${drawerWidth}px`},
      }}>
      {getToolbar()}
    </AppBar>
  )
}
