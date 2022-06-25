import { MenuItem } from "@mui/material";
import { useState } from "react";
import CreatePageDialog from "../../../Page/CreatePage/CreatePageDialog";

export default function NewPageMenuItem({page}) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <MenuItem onClick={() => {setOpen(true);}}>New page</MenuItem>
            <CreatePageDialog open={open} setOpen={setOpen} selectedPage={page} />
        </>
    )
}
