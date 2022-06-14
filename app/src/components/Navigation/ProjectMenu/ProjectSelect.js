import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import { fetchProjects, selectAllProjects } from '../../../reducers/projectsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProjectSelectSkeleton from './ProjectSelectSkeleton';
import {Button, Menu, Typography} from '@mui/material';
import {KeyboardArrowDown} from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import {selectCurrentProject} from "../../../reducers/currentProjectSlice";
import {fetchPages} from "../../../reducers/pagesSlice";
import {useNavigate} from "react-router-dom";

export default function ProjectSelect() {
    const dispatch = useDispatch();
    const projectsLoading = useSelector(state => state.projects.loading);
    const projects = useSelector(selectAllProjects);
    const menuId = Math.random();
    const currentProject = useSelector(state => state.currentProject.item);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    useEffect(() => {
        if (!projectsLoading) {
            (async () => {
                const projects = await dispatch(fetchProjects()).unwrap();
                const selectedProject = currentProject ?? projects[0];
                if (projects.length > 0 ) {
                    projectSelected(selectedProject);
                } else {
                    // Redirect to create new project page
                }
            })();
        }
    }, [dispatch]);

    function projectSelected(selectedProject) {
        dispatch(selectCurrentProject(selectedProject));
        const query = `?project=${selectedProject._id}&projection=_id,title,parent`;
        dispatch(fetchPages(query));
    }

    const handleClick = (event) => {
        dispatch(fetchProjects());
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (_id) => {
        setAnchorEl(null);
        const selectedProject = projects.find(project => project._id === _id);
        projectSelected(selectedProject);
        navigate('/dashboard');
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    }

    const renderMenuItems = () => {
        return projectsLoading ? <ProjectSelectSkeleton /> : projects.map(project => {
            return <MenuItem value={project._id} key={project._id} onClick={() => handleClose(project._id)} selected={currentProject && currentProject._id === project._id}>{project.name}</MenuItem>
        });
    }

    const getButtonLabel = () => {
        return currentProject ? currentProject.name : 'Select a project'
    }

    return (
        <>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="outlined"
                disableElevation
                fullWidth={true}
                endIcon={<KeyboardArrowDown />}
                sx={{
                    '&.MuiButton-outlined > div': {
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textAlign: "left",
                        display: "block"
                    }
                }}
                aria-label={getButtonLabel()}
                title={getButtonLabel()}
            >
                <div>{getButtonLabel()}</div>
            </Button>
            <Menu
                id={`project-menu-${menuId}-label`}
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'button'
                }}
            >
                <MenuItem disabled={true}>Select a project</MenuItem>
                {renderMenuItems()}
                <Divider />
                <MenuItem><Typography color="primary">Create new project</Typography></MenuItem>
            </Menu>
        </>
    )
}
