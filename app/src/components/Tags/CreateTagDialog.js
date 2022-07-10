import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
    Alert,
    AlertTitle,
    Chip,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {useState} from "react";
import {TAGS_COLORS} from "../../constants/TagsColors";
import * as Yup from "yup";
import {validateTagColor, validateTagName} from "../../form-validations/tagValidation";
import {useFormik} from "formik";
import api from '../../api';
import ErrorsAlert from "../Errors/ErrorsAlert";
import {NOTIFICATION_SUCCESS_TYPE, pushNotification} from "../../reducers/notificationsSlice";
import {useDispatch} from "react-redux";

export default function CreateTagDialog({open, setOpen, tags = null}) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
    };

    const validationSchema = Yup.object({
        name: validateTagName,
        color: validateTagColor
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            color: TAGS_COLORS[0],
        },
        validationSchema,
        onSubmit: async ({name, color}) => {
            try {
                setIsLoading(true);
                const res = await api.post('tags', {
                    name,
                    color
                });

                const {data} = res;

                tags.unshift(data);
                dispatch(pushNotification({text: 'Tag has been removed !', type: NOTIFICATION_SUCCESS_TYPE}));
                handleClose(false);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                if (error.response && error.response.status === 422) {
                    setErrors(error.response.data.errors);
                }
            }
        }
    });

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Configure your page</DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    {errors && (
                        <ErrorsAlert errors={errors} />
                    )}
                    <DialogContentText>
                        Name your tag and select a color. You'll be able to edit it later.
                    </DialogContentText>
                    <TextField
                        fullWidth
                        name="name"
                        disabled={isLoading}
                        label="Set a name"
                        type="text"
                        sx={{mt: 2, mb: 3}}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={(!!(formik.touched.name && formik.errors.name))}
                        helperText={formik.touched.name && formik.errors.name ? (
                            formik.errors.name
                        ) : null}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Select a color</InputLabel>
                        <Select
                            name="color"
                            value={formik.values.color}
                            label="Select a color"
                            disabled={isLoading}
                            onChange={formik.handleChange}
                            sx={{mb: 3}}
                            fullWidth
                        >
                            {TAGS_COLORS.map(color => <MenuItem key={color} value={color}><Chip label={color}
                                                                                                color={color}/></MenuItem>)}
                        </Select>
                        {(!!(formik.touched.color && formik.errors.color)) && (
                            <FormHelperText>{formik.errors.color}</FormHelperText>
                        )}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" disableElevation onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" type="submit" disableElevation disabled={isLoading}>Create</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
