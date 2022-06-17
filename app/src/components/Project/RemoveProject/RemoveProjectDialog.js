import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import Button from '@mui/material/Button';
import api from '../../../api';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {NOTIFICATION_SUCCESS_TYPE, pushNotification} from "../../../reducers/notificationsSlice";
import {selectCurrentProject} from "../../../reducers/currentProjectSlice";

export default function RemoveProjectDialog({ open, setOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const project = useSelector(state => state.currentProject.item);

  const handleClose = () => {
    setOpen(false);
  };

  async function onSubmitDelete() {
    try {
      setIsLoading(true);

      await api.delete(`projects/${project._id}/remove`);
      handleClose();
      dispatch(selectCurrentProject(null));
      dispatch(pushNotification({text: 'Project has been removed !', type: NOTIFICATION_SUCCESS_TYPE}));
      return navigate('/project/create');
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {"Are you sure to delete this project ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action is irreversible and all pages will be <strong>deleted</strong> too.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={isLoading} onClick={handleClose}>Cancel</Button>
          <Button disabled={isLoading} onClick={onSubmitDelete} variant="contained" disableElevation color="warning">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
