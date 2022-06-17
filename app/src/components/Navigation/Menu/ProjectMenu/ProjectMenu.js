import { KeyboardArrowDown } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import RemoveProjectMenuItem from './RemoveProjectMenuItem';
import {useNavigate} from "react-router-dom";
import {MenuItem, Typography} from "@mui/material";

export default function ProjectMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

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
        endIcon={<KeyboardArrowDown />}
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
        <MenuItem onClick={() => navigate('/project/edit')}><Typography>Edit Projects</Typography></MenuItem>
        <RemoveProjectMenuItem />
      </Menu>
    </>
  )
}
