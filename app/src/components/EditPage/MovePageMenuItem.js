import { MenuItem } from "@mui/material";
import { useState } from "react";
import MovePageDialog from "./MovePageDialog";

export default function MovePageMenuItem({ page, setPage }) {

    const [open, setOpen] = useState(false);

    return (
        <>
            <MenuItem onClick={() => { setOpen(true); }}>Move page</MenuItem>
            <MovePageDialog page={page} open={open} setOpen={setOpen} setPage={setPage} />
        </>
    )
}
