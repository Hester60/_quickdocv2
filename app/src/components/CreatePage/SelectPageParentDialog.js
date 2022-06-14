import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import {Autocomplete} from '@mui/material';
import api from '../../api';
import {useSelector} from "react-redux";

export default function SelectPageParentDialog() {
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pages, setPages] = useState([]);
    const currentProject = useSelector(state => state.currentProject.item);

    useEffect(() => {
        (async () => {
            await refreshPages();
        })();
    }, []);

    // TODO Trottle
    async function onInputChange(e, value) {
        await refreshPages(value);
    }

    async function refreshPages(title = '') {
        setIsLoading(true);
        const res = await api.get(`pages?project=${currentProject._id}&projection=_id,title&limit=7&q=${title}`);
        setPages(res.data.pages);
        setIsLoading(false);
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Where do you want to add your page ?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Search for a parent, or select project root. You'll be able to move the page later.
                </DialogContentText>
                <Autocomplete
                    onChange={(event, newValue = null) => {
                        console.log(newValue);
                    }}
                    options={pages}
                    getOptionLabel={(option) => option.title}
                    fullWidth
                    onInputChange={onInputChange}
                    renderOption={(props, option) => {
                        return (
                            <li {...props} key={option._id}>
                                {option.title}
                            </li>
                        );
                    }}
                    sx={{mt: 2}}
                    renderInput={(params) => <TextField {...params} label="Select a parent"/>}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    )
}
