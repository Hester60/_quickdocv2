import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import MovePageMenuItem from '../../../EditPage/MovePageMenuItem';
import RemovePageMenuItem from './RemovePageMenuItem';

export default function PageMenu({...props}) {
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
            <Button
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                color="inherit"
            >
                Actions
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={props.goToEdit}>Edit page</MenuItem>
                <MovePageMenuItem page={props.page} setPage={props.setPage} />
                <RemovePageMenuItem page={props.page} />
            </Menu>
        </>
    )
}