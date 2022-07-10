import {Alert, AlertTitle, Typography} from "@mui/material";

export default function ErrorsAlert({errors = []}) {
    return (
        <Alert severity="error" sx={{mb: 2}}>
            <AlertTitle>There are errors in your form !</AlertTitle>
            {Object.keys(errors).map(error => {
                return <Typography key={error}>{errors[error].message}</Typography>
            })}
        </Alert>
    )
}
