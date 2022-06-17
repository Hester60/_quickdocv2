import { Alert, AlertTitle, Typography, TextField, Button } from "@mui/material"

export default function ProjectForm({formik, isLoading, errors}) {
    return (
        <form onSubmit={formik.handleSubmit}>
            {errors && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    <AlertTitle>There are errors in your form !</AlertTitle>
                    {Object.keys(errors).map(error => {
                        return <Typography key={error}>{errors[error].message}</Typography>
                    })}
                </Alert>

            )}
          <TextField
                name="name" fullWidth label="Project title" variant="outlined" onChange={formik.handleChange}
                value={formik.values.name} sx={{ mb: 3 }}
                disabled={isLoading}
                error={(!!(formik.touched.name && formik.errors.name))}
                helperText={formik.touched.name && formik.errors.name ? (
                    formik.errors.name
                ) : null}
            />
            <Button disabled={isLoading} type="submit" variant="contained">Create</Button>
        </form>
    )
}
