import {Button} from "@mui/material";
import SelectPageParentDialog from "../CreatePage/SelectPageParentDialog";
import {useState} from "react";
import api from '../../api';
import { useSelector } from "react-redux";

export default function NewPageButton() {
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState(null);
    const currentProject = useSelector(state => state.currentProject.item);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const validateSelectParent = async (values) => {
        const parent = values.page._id !== '*' ? values.page._id : null;

        try {
            setErrors(null);
            // Bloquer le formulaire
            const res = await api.post(`pages`, {title: values.title, parent, project: currentProject._id});
            // Enregistrer la nouvelle page dans la sidenav
            // Rediriger l'utilsiateur vers la page edit
            console.log(res);
        } catch (error) {
            // Débloquer le formulaire !!
            if (error.response && error.response.status) {
                console.log(error.response.data.errors);
                setErrors(error.response.data.errors);
            }
        }
        // Create new page
        // If reponse 201, redirect to edit page : there is no creation page.
    }

    return (
        <>
            <Button fullWidth variant="contained" disableElevation sx={{ mt: 1 }} onClick={handleClickOpen}>New page</Button>
            <SelectPageParentDialog open={open} handleClose={handleClose} submitForm={validateSelectParent} errors={errors}/>
        </>
    )
}
