import {useSelector} from "react-redux";
import {selectAllPage} from "../../../reducers/pagesSlice";
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import {Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function PageTree({drawerWidth}) {
    const pages = useSelector(selectAllPage);
    const pagesLoading = useSelector(state => state.pages.loading);
    const navigate = useNavigate();

    const renderNode = (page) => {
        const children = pages.filter(e => e.parent === page._id);

        return (
            <TreeItem nodeId={page._id}
                      label={<Typography
                          noWrap
                          onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/page/${page._id}`)
                          }}
                      >{page.title}</Typography>} key={page._id}>
                {children.map(child => {
                    return renderNode(child);
                })}
            </TreeItem>
        )
    }

    const renderTree = () => {
        return pages.filter(e => e.parent === null).map(page => {
            return renderNode(page);
        })
    }

    return (
        <TreeView
            aria-label="Pages tree view"
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRightIcon/>}
            sx={{
                flexGrow: 1,
                width: drawerWidth,
                overflowY: 'auto',
                overflowX: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'block'
            }}
        >
            {!pagesLoading && renderTree()}
        </TreeView>
    )
}
