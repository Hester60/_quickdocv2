import { KeyboardArrowDown, MoreHoriz } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import RemoveProjectMenuItem from './RemoveProjectMenuItem';
import { useNavigate } from "react-router-dom";
import { IconButton, MenuItem, Typography } from "@mui/material";
import { Box } from '@mui/system';

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
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Button
          endIcon={<KeyboardArrowDown />}
          onClick={handleClick}
          color="inherit"
        >
          Actions
        </Button>
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <IconButton
          onClick={handleClick}
          color="inherit"
          component="span">
          <MoreHoriz />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => navigate('/project/edit')}><Typography>Edit Projects</Typography></MenuItem>
        <RemoveProjectMenuItem />
      </Menu>
    </>
  )
}
