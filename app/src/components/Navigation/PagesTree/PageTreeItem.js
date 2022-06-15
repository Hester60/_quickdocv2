import {Typography} from "@mui/material";
import TreeItem from "@mui/lab/TreeItem";
import {useNavigate} from "react-router-dom";

export default function PageTreeItem({page, selectedPageId, expanded, setExpanded, pages}) {
    const navigate = useNavigate();

    const renderNode = () => {
        const children = pages.filter(e => e.parent === page._id);

        return (
            <TreeItem nodeId={page._id}
                      key={page._id}
                      label={<Typography
                          noWrap
                          onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/page/${page._id}`)
                          }}
                      >{page.title}</Typography>}>
                {children.map(child => {
                    return <PageTreeItem page={child} key={child._id} selectedPageId={selectedPageId}
                                         expanded={expanded} setExpanded={setExpanded} pages={pages}/>;
                })}
            </TreeItem>
        )
    }

    return (
        <>
            {renderNode()}
        </>
    )
}
