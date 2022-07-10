import TableCell from "@mui/material/TableCell";
import {Chip, IconButton, InputLabel, Select, TextField, FormControl, MenuItem} from "@mui/material";
import {Cancel, Delete, Edit, Save} from "@mui/icons-material";
import TableRow from "@mui/material/TableRow";
import {useState} from "react";
import * as Yup from "yup";
import {validateTagColor, validateTagName} from "../../form-validations/tagValidation";
import {useFormik} from "formik";
import {TAGS_COLORS} from "../../constants/TagsColors";
import api from "../../api";
import {useDispatch} from "react-redux";
import {NOTIFICATION_SUCCESS_TYPE, pushNotification} from "../../reducers/notificationsSlice";
import RemoveTagDialog from "./RemoveTagDialog";

export default function TagRow({tag, setErrors, tags}) {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const validationSchema = Yup.object({
        name: validateTagName,
        color: validateTagColor
    });

    const formik = useFormik({
        initialValues: {
            name: tag.name,
            color: tag.color,
        },
        validationSchema,
        onSubmit: async ({name, color}) => {
            try {
                setIsLoading(true);
                const res = await api.put(`tags/${tag._id}`, {
                    name,
                    color
                });

                const {data} = res;

                tag.name = data.name;
                tag.color = data.color;

                dispatch(pushNotification({text: 'Tag has been updated !', type: NOTIFICATION_SUCCESS_TYPE}));
                setIsEditing(false);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                if (error.response && error.response.status === 422) {
                    setErrors(error.response.data.errors);
                }
            }
        }
    });

    function tagRowEdition() {
        return (
            <>
                <TableCell component="th" scope="row" sx={{width: '50%'}}>
                    <TextField
                        fullWidth
                        name="name"
                        disabled={isLoading}
                        label="Set a name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={(!!(formik.touched.name && formik.errors.name))}
                        helperText={formik.touched.name && formik.errors.name ? (
                            formik.errors.name
                        ) : null}
                    />
                </TableCell>
                <TableCell align="center">
                    <FormControl fullWidth>
                        <InputLabel>Select a color</InputLabel>
                        <Select
                            name="color"
                            value={formik.values.color}
                            label="Select a color"
                            disabled={isLoading}
                            onChange={formik.handleChange}
                            fullWidth
                        >
                            {TAGS_COLORS.map(color => <MenuItem key={color} value={color}>{color}</MenuItem>)}
                        </Select>
                    </FormControl>
                </TableCell>
                <TableCell align="right" sx={{width: '20%'}}>
                    <IconButton aria-label="save" size="small" type="button" onClick={formik.handleSubmit}>
                        <Save/>
                    </IconButton>
                    <IconButton aria-label="cancel" size="small" type="button" onClick={() => {
                        setIsEditing(false)
                    }}>
                        <Cancel color="error"/>
                    </IconButton>
                </TableCell>
            </>
        )
    }

    const tagRowShow = () => {
        return (
            <>
                <TableCell component="th" scope="row" sx={{width: '50%'}}>
                    {tag.name}
                </TableCell>
                <TableCell align="center">
                    <Chip color={tag.color} label={tag.color}/>
                </TableCell>
                <TableCell align="right" sx={{width: '20%'}}>
                    <IconButton aria-label="edit" size="small" onClick={() => setIsEditing(true)}>
                        <Edit/>
                    </IconButton>
                    <IconButton aria-label="delete" size="small" onClick={() => setOpenDeleteDialog(true)}>
                        <Delete color="error"/>
                    </IconButton>
                </TableCell>
            </>
        )
    }

    return (
        <>
            <TableRow sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                {isEditing ? tagRowEdition() : tagRowShow()}
            </TableRow>
            <RemoveTagDialog tag={tag} tags={tags} setOpen={setOpenDeleteDialog} open={openDeleteDialog}/>
        </>
    )
}
