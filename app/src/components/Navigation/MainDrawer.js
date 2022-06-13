import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';
import ProjectSelect from './ProjectMenu/ProjectSelect';
import {useSelector} from "react-redux";
import {selectAllPage} from "../../reducers/pagesSlice";

export const drawerWidth = 260;

export default function MainDrawer() {
    const pagesLoading = useSelector(state => state.pages.loading);
    const pages = useSelector(selectAllPage);

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Box px={1} py={2}>
                <ProjectSelect />
            </Box>
            <Divider />
            <Box px={1} py={2}>
                {!pagesLoading && pages.map(page => {
                    return <div>{page.title}</div>;
                })}
            </Box>
        </Drawer>
    )
}
