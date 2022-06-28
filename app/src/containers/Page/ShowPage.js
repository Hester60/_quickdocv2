import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from '../../api';
import MainToolbar from "../../components/Navigation/MainToolbar/MainToolbar";
import {Box, Toolbar, Typography, Chip} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectAllProjects} from "../../reducers/projectsSlice";
import {selectCurrentProject} from "../../reducers/currentProjectSlice";
import ActionsMenu from "../../components/Navigation/Menu/ActionsMenu";
import MenuItem from "@mui/material/MenuItem";
import "highlight.js/styles/github-dark-dimmed.css";
import hljs from "highlight.js";
import MovePageDialog from "../../components/Page/MovePage/MovePageDialog";
import RemovePageDialog from "../../components/Page/RemovePage/RemovePageDialog";
import CreatePageDialog from "../../components/Page/CreatePage/CreatePageDialog";
import ShowPageMenu from "../../components/Navigation/Menu/ShowPageMenu";

export default function ShowPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let {pageId} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(null);
    const currentProject = useSelector(state => state.currentProject.item);
    const projects = useSelector(selectAllProjects);


    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await api.get(`pages/${pageId}`);
            if (currentProject._id !== res.data.project._id) {
                const projectIndex = projects.findIndex(e => e._id === res.data.project._id);
                if (projectIndex < 0) {
                    return navigate('/dashboard');
                }

                dispatch(selectCurrentProject(res.data.project));
            }

            setPage(res.data);
            setIsLoading(false);
            hljs.highlightAll();
        })();
    }, [pageId])

    function parseBody() {
        let htmlObject = document.createElement('div');
        htmlObject.innerHTML = page.body;
        const images = htmlObject.getElementsByTagName('img');
        [...images].forEach(image => {
            image.setAttribute("onclick", `window.open('${image.src}', '_blank')`);
        });
        return htmlObject.outerHTML;
    }

    function handleClick(e) {
        if (e.detail >= 2) {
            return navigate(`/page/edit/${page._id}`);
        }
    }

    const pageContent = () => !page.body || page.body.replace(/(<([^>]+)>)/ig, '') === '' ?
        <Typography>Cette page est vide.</Typography> : <div dangerouslySetInnerHTML={{__html: parseBody()}}/>;

    return (
        <>
            <Box sx={{display: 'flex', flexFlow: 'column'}}>
                <MainToolbar title="Show Page">
                    {page && (
                        <ShowPageMenu page={page} setPage={setPage}/>
                    )}
                </MainToolbar>
                <Toolbar/>
                {!isLoading && (
                    <Box sx={{width: '100%'}} display='flex' justifyContent="center">
                        <Box display='flex' alignItems="start" width="100%"
                             sx={{maxWidth: 1250, flexFlow: 'column'}}>
                            <Box width="100%" onClick={handleClick} component="div" title="Double click to edit page">
                                <Typography variant="h5" fontWeight="700" textTransform="uppercase">
                                    {page.title}
                                </Typography>
                            </Box>
                            {page.tag && (
                                <Box sx={{my: 2}}>
                                    <Chip size="small" label={page.tag.name} color={page.tag.color}
                                          sx={{mr: 1, cursor: 'pointer'}}/>
                                </Box>
                            )}
                            <Box width="100%" onClick={handleClick} component="div" title="Double click to edit page">
                                {pageContent()}
                            </Box>
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    )
}
