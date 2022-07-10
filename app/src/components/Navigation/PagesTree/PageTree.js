import { useSelector } from "react-redux";
import { selectAllPage } from "../../../reducers/pagesSlice";
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { matchPath, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import PageTreeItem from "./PageTreeItem";
import MovePageDialog from '../../Page/MovePage/MovePageDialog'

export default function PageTree({ drawerWidth }) {
    const { pathname } = useLocation();
    const matches = [matchPath(
        { path: "/page/:pageId" },
        pathname,
    ), matchPath(
        { path: "/page/edit/:pageId" },
        pathname,
    )];
    const pages = useSelector(selectAllPage);
    const pagesLoading = useSelector(state => state.pages.loading);
    const [selectedPageId, setSelectedPageId] = useState(null);
    const [expanded, setExpanded] = useState([]);
    const [openMoveDialog, setOpenMoveDialog] = useState(false);
    const [selectedPageToMove, setSelectedPageToMove] = useState(null);

    useEffect(() => {
        const match = matches.find(e => e !== null);
        if (!match) {
            setSelectedPageId(null);
        } else {
            setSelectedPageId(match.params.pageId);
        }

        openSelectedPageTree(pages.find(e => e._id === selectedPageId));
    }, [pages, matches])

    const renderTree = () => {
        return pages.filter(e => e.parent === null).map(page => <PageTreeItem handleMoveBtnClick={handleMoveBtnClick} onIconClick={toggleNode} key={page._id} page={page} pages={pages}
                                                                              selectedPageId={selectedPageId} />)
    }

    const expandItem = (pageId) => {
        if (!expanded.find(e => e === pageId)) {
            setExpanded((oldVal => [...oldVal, pageId]));
        }
    }

    const toggleNode = (nodeId) => {
        const nodeIndex = expanded.findIndex(e => e === nodeId);

        if (nodeIndex < 0) {
            setExpanded((oldVal => [...oldVal, nodeId]));
        } else {
            setExpanded((oldVal) => {
                oldVal.splice(nodeIndex, 1);
                return oldVal;
            });
        }
    }

    const handleMoveBtnClick = (e, page) => {
        e.stopPropagation();
        setSelectedPageToMove(page);
        setOpenMoveDialog(true);
    }

    const openSelectedPageTree = (page) => {
        if (page) {
            const parent = getParent(page);
            if (parent && !expanded.find(e => e === parent._id)) {
                expandItem(parent._id);
                openSelectedPageTree(parent);
            }
        }
    }

    const getParent = (page) => {
        return pages.find(e => page.parent && e._id === page.parent._id);
    }

    return (
        <TreeView
            aria-label="Pages tree view"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            selected={selectedPageId}
            expanded={expanded}
            sx={{
                flexGrow: 1,
                width: drawerWidth,
                overflowY: 'auto',
                overflowX: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'block',
                padding: '0 15px 0 5px'
            }}
        >
            {!pagesLoading && (
                <>
                    {renderTree()}
                    {selectedPageToMove && <MovePageDialog page={selectedPageToMove} setOpen={setOpenMoveDialog} open={openMoveDialog} />}
                </>
            )}
        </TreeView>
    )
}
