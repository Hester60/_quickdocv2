import {Box, Card, ListSubheader, MenuItem, Toolbar} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import MainToolbar from "../../components/Navigation/MainToolbar/MainToolbar";
import api from '../../api'
import {Link, useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import RemoveProjectMenuItem from "../../components/Navigation/Menu/ProjectMenu/RemoveProjectMenuItem";
import ActionsMenu from "../../components/Navigation/Menu/ActionsMenu";
import NewPageMenuItem from "../../components/Navigation/Menu/PageMenu/NewPageMenuItem";

export default function Dashboard() {
    const navigate = useNavigate();
    const project = useSelector(state => state.currentProject.item);
    const isProjectLoading = useSelector(state => state.currentProject.loading);
    const [isPagesLoading, setIsPagesLoading] = useState(false);
    const [lastCreatedPages, setLastCreatedPages] = useState([]);

    useEffect(() => {
        if (!isProjectLoading) {
            if (!project) {
                return navigate('/project/create');
            }
            (async function () {
                setIsPagesLoading(true);
                const res = await api.get(`pages?project=${project._id}&projection=_id,title,createdAt&limit=5`);
                setLastCreatedPages(res.data.pages);
                setIsPagesLoading(false);
            })();
        }
    }, [project]);

    const renderLastPagesCreatedItems = () => {
        if (lastCreatedPages.length <= 0) {
            return (
                <ListItem>
                    <ListItemText primary="This project does not contain any page yet !"/>
                </ListItem>
            )
        } else {
            return lastCreatedPages.map(page => {
                return (
                    <ListItem key={page._id}>
                        <ListItemText
                            primary={<Link to={`/page/${page._id}`}>{page.title}</Link>}
                            secondary={`Created on ${new Date(page.createdAt).toLocaleString()}`}
                        />
                    </ListItem>
                )
            })
        }
    }


    return (
        <Box sx={{display: 'flex', flexFlow: 'column'}}>
            <MainToolbar title="Dashboard">
                <ActionsMenu>
                    <NewPageMenuItem />
                    <MenuItem onClick={() => navigate('/project/edit')}><Typography>Edit
                        Projects</Typography></MenuItem>
                    <RemoveProjectMenuItem/>
                </ActionsMenu>
            </MainToolbar>
            <Toolbar/>
            <Box p={3}>
                <Card sx={{maxWidth: 360}} variant="outlined">
                    <List
                        sx={{bgcolor: 'background.paper'}}
                        dense={true}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Last pages created
                            </ListSubheader>
                        }
                    >
                        {!isPagesLoading && renderLastPagesCreatedItems()}
                    </List>
                </Card>
            </Box>
        </Box>
    )
}
