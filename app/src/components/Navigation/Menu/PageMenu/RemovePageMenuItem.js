import { MenuItem } from "@mui/material";
import { useState } from "react";
import RemovePageDialog from "../../../RemovePage/RemovePageDialog";

export default function ({page}) {
   
    const [open, setOpen] = useState(false);

    return (
        <>
            <MenuItem onClick={() => {setOpen(true);}}>Remove page</MenuItem>
            <RemovePageDialog page={page} open={open} setOpen={setOpen}/>
        </>
    )
}