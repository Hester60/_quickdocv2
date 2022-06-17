import { Button } from "@mui/material";
import { useState } from "react";
import RemovePageDialog from "./RemovePageDialog";

export default function RemovePageButton({page}) {
   
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="contained" disableElevation onClick={() => {setOpen(true)}}>Remove page</Button>
            <RemovePageDialog page={page} open={open} setOpen={setOpen}/>
        </>
    )
}