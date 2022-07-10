import {Autocomplete, Box, Chip, createFilterOptions, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectAllPage} from "../../../reducers/pagesSlice";
import {useState} from "react";

export default function FindPageForm({isLoading}) {
    const navigate = useNavigate();
    const OPTIONS_LIMIT = 5;
    const pages = useSelector(selectAllPage);
    const [value, setValue] = useState(null);

    const filterOptions = createFilterOptions({
        limit: OPTIONS_LIMIT
    });

    const onSelectionChange = (e, val, reason) => {
        if (reason === 'clear') {
            return;
        }

        setValue(null);
        return navigate(`/page/${val._id}`);
    }

    return (
        <Autocomplete
            onChange={onSelectionChange}
            clearOnEscape
            clearOnBlur
            blurOnSelect
            disabled={isLoading}
            filterOptions={filterOptions}
            options={pages}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            getOptionLabel={(option) => option.title}
            fullWidth
            value={value}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option._id}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            {option.tag && (
                                <Chip size="small" label={option.tag.name} color={option.tag.color} sx={{mr: 1, cursor: 'pointer'}}/>
                            )}
                            <Typography
                                noWrap
                            >{option.title}</Typography>
                        </Box>
                    </li>
                );
            }}
            renderInput={(params) => <TextField {...params} label="Find a page"/>}
        />
    )
}
