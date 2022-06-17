import {Button} from "@mui/material";
import CreatePageDialog from "../CreatePage/CreatePageDialog";
import {useState} from "react";
import {useSelector} from "react-redux";

export default function NewPageButton() {
    const project = useSelector(state => state.currentProject.item);
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button fullWidth disabled={!project} variant="contained" disableElevation sx={{ mt: 1 }} onClick={() => {setOpen(true)}}>New page</Button>
            <CreatePageDialog open={open} setOpen={setOpen} />
        </>
    )
}
