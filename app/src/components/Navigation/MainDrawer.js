import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import {Box, Button} from '@mui/material';
import ProjectSelect from './Menu/ProjectMenu/ProjectSelect';
import PageTree from "./PagesTree/PageTree";
import {useCallback} from "react";
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {modifyWidth} from '../../reducers/drawerWidthSlice';
import {useNavigate} from 'react-router-dom';
import NewPageButton from "../Page/NewPageButton/NewPageButton";
import {minDrawerWidth} from "../../reducers/drawerWidthSlice";

const maxDrawerWidth = 750;

export default function MainDrawer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const project = useSelector(state => state.currentProject.item);
  const drawerWidth = useSelector(state => state.drawerWidth.width);

  const handleMouseDown = e => {
    e.preventDefault();
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
  };

  const handleMouseMove = useCallback(e => {
    const newWidth = e.clientX - document.body.offsetLeft;
    if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
      dispatch(modifyWidth(newWidth));
    }
  }, []);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          overflow: 'hidden',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box px={1} py={2}>
        <ProjectSelect/>
        {<NewPageButton/>}
      </Box>
      {project && (
        <>
          <Divider/>
          <Box px={1} py={2}>
            <Button fullWidth variant="text" disableElevation onClick={() => navigate('/dashboard')}>Go to
              dashboard</Button>
          </Box>
        </>
      )}
      <Divider/>
      <Box py={2} sx={{
        overflowY: 'auto', overflowX: 'hidden', '&::-webkit-scrollbar': {
          width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
          outline: '1px solid slategrey'
        }
      }}>
        <div onMouseDown={e => handleMouseDown(e)} style={{
          width: "5px",
          cursor: "ew-resize",
          padding: "4px 0 0",
          borderTop: "1px solid #ddd",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          backgroundColor: "#f4f7f9"
        }}/>
        <PageTree drawerWidth={drawerWidth}/>
      </Box>
    </Drawer>
  )
}
