import {useSelector} from "react-redux";
import {selectAllPage} from "../../../reducers/pagesSlice";
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {matchPath, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import PageTreeItem from "./PageTreeItem";

export default function PageTree({drawerWidth}) {
    const {pathname} = useLocation();
    const matches = [matchPath(
        {path: "/page/:pageId"},
        pathname,
    ), matchPath(
        {path: "/page/edit/:pageId"},
        pathname,
    )];
    const pages = useSelector(selectAllPage);
    const pagesLoading = useSelector(state => state.pages.loading);
    const [selectedPageId, setSelectedPageId] = useState(null);
    const [expanded, setExpanded] = useState([]);

    useEffect(() => {
        const match = matches.find(e => e !== null);
        if (!match) {
            setSelectedPageId(null);
        } else {
            setSelectedPageId(match.params.pageId);
        }
    }, [pages])

    const renderTree = () => {
        return pages.filter(e => e.parent === null).map(page => <PageTreeItem key={page._id} page={page} pages={pages}
                                                                              expanded={expanded}
                                                                              setExpanded={setExpanded}
                                                                              selectedPageId={selectedPageId} />)
    }

    return (
        <TreeView
            aria-label="Pages tree view"
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRightIcon/>}
            selected={selectedPageId}
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
