import { MenuItem, Skeleton } from "@mui/material";

export default function ProjectSelectSkeleton() {
    return (
        <>
            <MenuItem value={1}><Skeleton width="100%" /></MenuItem>
            <MenuItem value={2}><Skeleton width="50%" /></MenuItem>
            <MenuItem value={3}><Skeleton width="75%" /></MenuItem>
        </>
    )
}