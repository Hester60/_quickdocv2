import {Box, Chip, Toolbar, Typography, Button} from "@mui/material";
import MainToolbar from "../../components/Navigation/MainToolbar/MainToolbar";
import {useEffect, useState} from "react";
import api from '../../api';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Add} from "@mui/icons-material";
import CreateTagDialog from "../../components/Tags/CreateTagDialog";
import TagRow from "../../components/Tags/TagRow";
import ErrorsAlert from "../../components/Errors/ErrorsAlert";

export default function ShowTags() {
    const [tags, setTags] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [errors, setErrors] = useState(null);


    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const res = await api.get('tags');
                const {data} = res;
                setIsLoading(false);

                setTags(data);
            } catch (error) {
                alert(error);
            }
        })();
    }, []);

    return (
        <Box sx={{display: 'flex', flexFlow: 'column'}}>
            <MainToolbar title="Manage tags"/>
            <Toolbar/>
            <Box sx={{width: '100%'}} display='flex' justifyContent="center">
                <Box display='flex' alignItems="start" width="100%"
                     sx={{maxWidth: 1250, flexFlow: 'column'}}>
                    <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="h5" fontWeight="700" textTransform="uppercase">
                            Manage tags
                        </Typography>
                        <Button variant="contained" startIcon={<Add/>} onClick={() => setDialogOpen(true)}>
                            Add tag
                        </Button>
                    </Box>
                    <Box sx={{my: 2}} width="100%">
                        {errors && (
                            <ErrorsAlert errors={errors} />
                        )}
                        <TableContainer component={Paper} sx={{width: '100%'}}>
                            <Table sx={{width: '100%'}} aria-label="tags table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align="center">Color</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tags.map(tag => (
                                        <TagRow tag={tag} key={tag._id} setErrors={setErrors} tags={tags}/>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </Box>
            {!isLoading && <CreateTagDialog open={dialogOpen} setOpen={setDialogOpen} tags={tags}/>}
        </Box>
    );
}
