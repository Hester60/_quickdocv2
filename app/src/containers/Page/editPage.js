import { Card, CardContent, TextField, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from '../../api';
import MainToolbar from "../../components/Navigation/MainToolbar";
import { EDIT_PAGE_TOOLBAR } from "../../components/Navigation/MainToolbar";

export default function EditPage() {
    let { pageId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(null);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await api.get(`pages/${pageId}`);
            setPage(res.data);
            setIsLoading(false);
        })();
    }, [pageId]);

    const form = () => (
        <>
            <TextField fullWidth label="Page title" variant="outlined" value={page.title} />
        </>
    )

    return (
        <>
            <Box sx={{ display: 'flex', flexFlow: 'column' }}>
                <MainToolbar toolbarType={EDIT_PAGE_TOOLBAR} />
                <Toolbar />
            </Box>
            <Box sx={{ width: '100%', flexFlow: 'column' }} display='flex' alignItems="center">
                <Box sx={{ width: '100%', maxWidth: 1250, mt: 2 }}>
                    <CardContent>
                        {!isLoading && page && form()}
                    </CardContent>
                </Box>
            </Box>

        </>
    )
}