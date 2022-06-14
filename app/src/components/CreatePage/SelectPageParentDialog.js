import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import {Autocomplete, createFilterOptions} from '@mui/material';
import api from '../../api';
import {useSelector} from "react-redux";

export default function SelectPageParentDialog() {
    const [open, setOpen] = useState(true);
    const handleClose = () => setOpen(false);
    const [isLoading, setIsLoading] = useState(true);
    const [pages, setPages] = useState([]);
    const currentProject = useSelector(state => state.currentProject.item);
    const OPTIONS_LIMIT = 10;
    const ROOT_SELECTION = {_id: '*', title: 'Project Root (No Parent)'};
    const [selectedPage, setSelectedPage] = useState(ROOT_SELECTION);

    // TODO : Don't fetch children !! (API EVOLUTION)
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await api.get(`pages?project=${currentProject._id}&projection=_id,title`);
            setPages([ROOT_SELECTION, ...res.data.pages]);
            setIsLoading(false);
        })();
    }, []);

    const filterOptions = createFilterOptions({
        limit: OPTIONS_LIMIT
    });

    const onSelectionChange = (e, val, reason) => {
        if (reason === 'clear') {
            setSelectedPage(ROOT_SELECTION);
        } else {
            setSelectedPage(val);
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Where do you want to add your page ?</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Search for a parent, or select project root. You'll be able to move the page later.
                </DialogContentText>
                {!isLoading && (
                    <Autocomplete
                        onChange={onSelectionChange}
                        filterOptions={filterOptions}
                        options={pages}
                        isOptionEqualToValue={(option, value) => option._id === value._id}
                        getOptionLabel={(option) => option.title}
                        fullWidth
                        autoSelect
                        value={selectedPage}
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
                )}
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleClose}>Validate</Button>
            </DialogActions>
        </Dialog>
    )
}
