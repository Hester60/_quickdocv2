import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import {Box} from '@mui/material';
import ProjectSelect from './ProjectMenu/ProjectSelect';
import PageTree from "./PagesTree/PageTree";
import {useCallback, useState} from "react";

export const defaultDrawerWidth = 240;
const minDrawerWidth = 240;
const maxDrawerWidth = 750;

export default function MainDrawer() {
    const [drawerWidth, setDrawerWidth] = useState(defaultDrawerWidth);

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
            setDrawerWidth(newWidth);
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
                    overflowX: 'hidden'
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Box px={1} py={2}>
                <ProjectSelect/>
            </Box>
            <Divider/>
            <Box py={2}>
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
