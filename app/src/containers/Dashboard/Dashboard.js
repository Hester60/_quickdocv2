import {Box} from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import MainToolbar from "../../components/Navigation/MainToolbar";
import { DASHBOARD_TOOLBAR } from "../../components/Navigation/MainToolbar";

export default function Dashboard() {
    const project = useSelector(state => state.currentProject.item);
    const isLoading = useSelector(state => state.currentProject.loading);

    return (
        <Box>
            <MainToolbar toolbarType={DASHBOARD_TOOLBAR} name={project.name} isLoading={isLoading} />
        </Box>
    )
}
