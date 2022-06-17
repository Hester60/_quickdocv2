import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from '../../api';
import MainToolbar, {PAGE_TOOLBAR} from "../../components/Navigation/MainToolbar/MainToolbar";
import {Box, Card, Toolbar, Typography, CardContent} from "@mui/material";

export default function ShowPage() {
    const navigate = useNavigate();
    let {pageId} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(null);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await api.get(`pages/${pageId}`);
            setPage(res.data);
            setIsLoading(false);
        })();
    }, [pageId])

    const pageContent = () => !page.body || page.body.replace( /(<([^>]+)>)/ig, '') === '' ?
        <Typography>Cette page est vide.</Typography> : <div dangerouslySetInnerHTML={{__html: page.body}} />;

    return (
        <>
            <Box sx={{display: 'flex', flexFlow: 'column'}}>
                <MainToolbar page={page} toolbarType={PAGE_TOOLBAR} isLoading={isLoading} setPage={setPage} goToEdit={() => navigate(`/page/edit/${page._id}`)}/>
                <Toolbar/>
                {!isLoading && (
                    <Box  sx={{width: '100%', flexFlow: 'column'}} display='flex' alignItems="center">
                        <Box sx={{width: '100%', maxWidth: 1250}}>
                            <Typography variant="h5" fontWeight="700" textTransform="uppercase">
                                {page.title}
                            </Typography>
                        </Box>
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
