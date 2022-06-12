import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import {Toolbar} from "@mui/material";
import { makeStyles } from "@mui/material/styles";
import PagesTree from "./PagesTree/PagesTree";
import {useCallback} from "react";

export const defaultDrawerWidth = 240;
const minDrawerWidth = 50;
const maxDrawerWidth = 1000;

const useStyles = makeStyles(theme => ({
    dragger: {
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
    }
}));

export default function Navigation() {
    const classes = useStyles();
    const [drawerWidth, setDrawerWidth] = React.useState(defaultDrawerWidth);

    const handleMouseDown = e => {
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
            <Toolbar/>
            <div onMouseDown={e => handleMouseDown(e)} className={classes.dragger} />
            <PagesTree width={drawerWidth}/>
        </Drawer>
    );
}
