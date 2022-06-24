import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from '../../api';
import MainToolbar, {PAGE_TOOLBAR} from "../../components/Navigation/MainToolbar/MainToolbar";
import {Box, Card, Toolbar, Typography, CardContent, Chip} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectAllProjects} from "../../reducers/projectsSlice";
import {selectCurrentProject} from "../../reducers/currentProjectSlice";
import PageMenu from "../../components/Navigation/Menu/PageMenu/PageMenu";

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
            console.log(res.data);
            setIsLoading(false);
        })();
    }, [pageId])

    function parseBody() {
        let htmlObject = document.createElement('div');
        htmlObject.innerHTML = page.body;
        const images = htmlObject.getElementsByTagName('img');
        [...images].forEach(image => {
            image.setAttribute("onclick", `window.open('${image.src}', '_blank')` );
        });
        return htmlObject.outerHTML;
    }

    const pageContent = () => !page.body || page.body.replace(/(<([^>]+)>)/ig, '') === '' ?
        <Typography>Cette page est vide.</Typography> : <div dangerouslySetInnerHTML={{__html: parseBody()}}/>;

    return (
        <>
            <Box sx={{display: 'flex', flexFlow: 'column'}}>
                <MainToolbar title="Show Page">
                    <PageMenu page={page} setPage={setPage} goToEdit={() => navigate(`/page/edit/${page._id}`)} isLoading={isLoading}/>
                </MainToolbar>
                <Toolbar/>
                {!isLoading && (
                    <Box sx={{width: '100%', flexFlow: 'column'}} display='flex' alignItems="center">
                        <Box sx={{width: '100%', maxWidth: 1250}}>
                            <Typography variant="h5" fontWeight="700" textTransform="uppercase">
                                {page.title}
                            </Typography>
                        </Box>
                        {page.tag && (
                            <Box sx={{width: '100%', maxWidth: 1250, mt: 2}}>
                                <Chip size="small" label={page.tag.name} color={page.tag.color}
                                      sx={{mr: 1, cursor: 'pointer'}}/>
                            </Box>
                        )}
                        <Card variant="outlined" sx={{width: '100%', maxWidth: 1250, mt: 2}}>
                            <CardContent>
                                {pageContent()}
                            </CardContent>
                        </Card>
                    </Box>
                )}
            </Box>
        </>
    )
}
