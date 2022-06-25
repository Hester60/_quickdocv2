import {useState} from "react";
import {Box} from "@mui/system";
import { MoreHoriz} from "@mui/icons-material";
import {IconButton, Menu} from "@mui/material";

export default function ActionsMenu({children}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box>
                <IconButton
                    onClick={handleClick}
                    color="inherit"
                    component="span">
                    <MoreHoriz/>
                </IconButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {children}
            </Menu>
        </>
    )
}
