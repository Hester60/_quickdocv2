import {Button} from "@mui/material";
import {useState} from "react";
import MovePageDialog from "./MovePageDialog";

export default function MovePageButton({page, setPage}) {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="contained" disableElevation onClick={() => {setOpen(true)}}>Move page</Button>
            <MovePageDialog page={page} open={open} setOpen={setOpen} setPage={setPage}/>
        </>
    )
}
