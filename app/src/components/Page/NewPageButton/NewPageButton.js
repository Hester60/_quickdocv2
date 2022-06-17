import {Button} from "@mui/material";
import CreatePageDialog from "../CreatePage/CreatePageDialog";
import {useState} from "react";

export default function NewPageButton() {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Button fullWidth variant="contained" disableElevation sx={{ mt: 1 }} onClick={() => {setOpen(true)}}>New page</Button>
            <CreatePageDialog open={open} setOpen={setOpen} />
        </>
    )
}
