import {Button} from "@mui/material";
import SelectPageParentDialog from "../CreatePage/SelectPageParentDialog";
import {useState} from "react";

export default function NewPageButton() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const validateSelectParent = (parent) => {
        // Create new page
        // If reponse 201, redirect to edit page : there is no creation page.
    }

    return (
        <>
            <Button fullWidth variant="contained" disableElevation sx={{ mt: 1 }} onClick={handleClickOpen}>New page</Button>
            <SelectPageParentDialog open={open} handleClose={handleClose} submitForm={validateSelectParent}/>
        </>
    )
}
