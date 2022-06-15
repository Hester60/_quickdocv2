import TextField from "@mui/material/TextField";
import {Autocomplete, createFilterOptions} from "@mui/material";

export default function PageAutocompleter({rootSelection, pages, formik, disabled}) {
    const OPTIONS_LIMIT = 5;

    const filterOptions = createFilterOptions({
        limit: OPTIONS_LIMIT
    });

    const onSelectionChange = (e, val, reason) => {
        if (reason === 'clear') {
            formik.setFieldValue('page', rootSelection, true);
        } else {
            formik.setFieldValue('page', val, true);
        }
    }

    return (
        <Autocomplete
            onChange={onSelectionChange}
            disabled={disabled}
            filterOptions={filterOptions}
            options={pages}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            getOptionLabel={(option) => option.title}
            fullWidth
            autoSelect
            value={formik.values.page}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option._id}>
                        {option.title}
                    </li>
                );
            }}
            renderInput={(params) => <TextField {...params} label="Select a parent"/>}
        />
    )
}
