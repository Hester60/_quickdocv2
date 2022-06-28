import {useState} from "react";
import ActionsMenu from "./ActionsMenu";
import {MenuItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import CreatePageDialog from "../../Page/CreatePage/CreatePageDialog";
import {useNavigate} from "react-router-dom";
import RemoveProjectDialog from "../../Project/RemoveProject/RemoveProjectDialog";

export default function DashboardMenu() {
    const navigate = useNavigate();
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

    return (
        <>
            <ActionsMenu>
                <MenuItem onClick={() => {
                    setOpenCreateDialog(true)
                }}>New page</MenuItem>
                <MenuItem onClick={() => navigate('/project/edit')}><Typography>Edit
                    Projects</Typography></MenuItem>
                <MenuItem onClick={() => {
                    setOpenRemoveDialog(true);
                }}><Typography color="error">Remove project</Typography></MenuItem>
            </ActionsMenu>
            <RemoveProjectDialog open={openRemoveDialog} setOpen={setOpenRemoveDialog}/>
            <CreatePageDialog open={openCreateDialog} setOpen={setOpenCreateDialog}/>
        </>
    )
}
