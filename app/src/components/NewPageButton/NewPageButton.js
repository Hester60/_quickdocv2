import {Button} from "@mui/material";
import CreatePageDialog from "../CreatePage/CreatePageDialog";
import {useState} from "react";
import api from '../../api';
import { useDispatch, useSelector } from "react-redux";
import { addPage } from "../../reducers/pagesSlice";
import { useNavigate } from "react-router-dom";

export default function NewPageButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const currentProject = useSelector(state => state.currentProject.item);
    

    const handleClickOpen = () => {
        setOpen(true);
    };

    const validateSelectParent = async (values) => {
        const parent = values.page._id !== '*' ? values.page._id : null;

        try {
            setErrors(null);
            setIsLoading(true);

            const res = await api.post(`pages`, {title: values.title, parent, project: currentProject._id});
            const page = res.data;

            dispatch(addPage(page));

            setIsLoading(false);
            navigate(`page/edit/${page._id}`);
        } catch (error) {
            setIsLoading(false);
            if (error.response && error.response.status) {
                console.log(error.response.data.errors);
                setErrors(error.response.data.errors);
            }
        }
    }

    return (
        <>
            <Button fullWidth variant="contained" disableElevation sx={{ mt: 1 }} onClick={handleClickOpen}>New page</Button>
            <CreatePageDialog open={open} setOpen={setOpen} submitForm={validateSelectParent} errors={errors} formLoading={isLoading}/>
        </>
    )
}
