import ActionsMenu from "./ActionsMenu";
import MenuItem from "@mui/material/MenuItem";
import {Typography} from "@mui/material";
import CreatePageDialog from "../../Page/CreatePage/CreatePageDialog";
import MovePageDialog from "../../Page/MovePage/MovePageDialog";
import RemovePageDialog from "../../Page/RemovePage/RemovePageDialog";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function ShowPageMenu({page, setPage}) {
    const navigate = useNavigate();
    const [openMoveDialog, setOpenMoveDialog] = useState(false);
    const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);

    useEffect(() => {
        return () => {
            setOpenMoveDialog(false);
            setOpenRemoveDialog(false);
            setOpenCreateDialog(false);
        }
    }, []);

    return (
        <>
            <ActionsMenu>
                <MenuItem onClick={() => {setOpenCreateDialog(true);}}>New page</MenuItem>
                <MenuItem onClick={() => navigate(`/page/edit/${page._id}`)}>Edit page</MenuItem>
                <MenuItem onClick={() => {
                    setOpenMoveDialog(true);
                }}>Move page</MenuItem>
                <MenuItem onClick={() => {setOpenRemoveDialog(true);}}><Typography color="error">Remove page</Typography></MenuItem>
            </ActionsMenu>
            <CreatePageDialog open={openCreateDialog} setOpen={setOpenCreateDialog} selectedPage={page} />
            <MovePageDialog page={page} open={openMoveDialog} setOpen={setOpenMoveDialog} setPage={setPage}/>
            <RemovePageDialog page={page} open={openRemoveDialog} setOpen={setOpenRemoveDialog}/>
        </>
    )
}
