import { Warning } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearHttpError } from '../../reducers/httpErrorSlice';

export default function HttpErrorDialog() {
    const httpError = useSelector(state => state.httpError.error);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(clearHttpError());
    };

    return (
        <Dialog 
            open={!!httpError}
            onClose={handleClose}
        >
            <DialogTitle>
            <Typography fontWeight="bold">{"Error from the server !"}</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText color="error">
                    {httpError}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button disableElevation onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}