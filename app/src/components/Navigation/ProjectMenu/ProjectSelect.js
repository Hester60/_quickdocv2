import { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { fetchProjects, selectAllProjects } from '../../../reducers/projectsSlice';
import { useDispatch, useSelector } from 'react-redux';
import ProjectSelectSkeleton from './ProjectSelectSkeleton';
import { Divider, Typography } from '@mui/material';

export default function ProjectSelect() {
    const dispatch = useDispatch();
    const projectsLoading = useSelector(state => state.projects.loading);
    const projects = useSelector(selectAllProjects);
    const selectId = Math.random();
    const [selectedValue, setSelectedValue] = useState(projects[0] ? projects[0] : '');
    
    useEffect(() => {
        if (selectedValue !== '') {
            setSelectedValue(projects[0] ? projects[0]._id : '');
        }
    }, [projects]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
      };

    const renderMenuItems = () => {
        return projectsLoading ? <ProjectSelectSkeleton /> : projects.map(project => {
            return <MenuItem value={project._id} key={project._id}>{project.name}</MenuItem>
        });
    }

    const handleOpen = () => {
        dispatch(fetchProjects());
    }

    return (
        <>
            <FormControl fullWidth>
                <InputLabel id={`project-select-${selectId}-label`}>Selected Project</InputLabel>
                <Select
                    labelId={`project-select-${selectId}-label`}
                    id={`project-select-${selectId}`}
                    value={selectedValue}
                    label="Selected Project"
                    onChange={handleChange}
                    onOpen={handleOpen}
                >
                    <MenuItem disabled>Select a project</MenuItem>
                    {renderMenuItems()}
                    <Divider />
                    <MenuItem onClick={() => console.log('create new !')}><Typography color="primary">Create new project</Typography></MenuItem>
                </Select>
            </FormControl>
        </>
    )
}