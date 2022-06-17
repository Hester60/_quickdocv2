import { MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import RemovePageDialog from "../../../RemovePage/RemovePageDialog";

export default function ({page}) {

    const [open, setOpen] = useState(false);

    return (
        <>
            <MenuItem onClick={() => {setOpen(true);}}><Typography color="error">Remove page</Typography></MenuItem>
            <RemovePageDialog page={page} open={open} setOpen={setOpen}/>
        </>
    )
}
