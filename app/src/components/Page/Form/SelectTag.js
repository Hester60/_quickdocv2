import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

export default function SelectTag({tags, formik, isLoading}) {
    return (
        <FormControl fullWidth>
            <InputLabel>Select a tag (not required)</InputLabel>
            <Select
                name="tag"
                value={formik.values.tag}
                label="Select a tag (not required)"
                disabled={isLoading}
                onChange={formik.handleChange}
                sx={{mb: 3}}
                fullWidth
            >
                <MenuItem value={''}>Ne pas choisir de tag</MenuItem>
                {tags.map(tag => <MenuItem key={tag._id} value={tag._id}>{tag.name}</MenuItem>)}
            </Select>
        </FormControl>
    )
}
