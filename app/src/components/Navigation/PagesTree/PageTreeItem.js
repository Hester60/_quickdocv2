import {Box, Chip, Typography} from "@mui/material";
import TreeItem from "@mui/lab/TreeItem";
import {useNavigate} from "react-router-dom";
import {ChevronRight, ExpandMore} from "@mui/icons-material";

export default function PageTreeItem({page, selectedPageId, pages, onIconClick}) {
  const navigate = useNavigate();

  const label = (
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      {page.tag && (
        <Chip size="small" label={page.tag.name} color={page.tag.color} sx={{mr: 1}} />
      )}
      <Typography
        noWrap
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/page/${page._id}`)
        }}
      >{page.title}</Typography>
    </Box>
  );

  const renderNode = () => {
    const children = pages.filter(e => e.parent === page._id);

    return (
      <TreeItem nodeId={page._id}
                key={page._id}
                expandIcon={<ChevronRight onClick={() => onIconClick(page._id)}/>}
                collapseIcon={<ExpandMore onClick={() => onIconClick(page._id)}/>}
                sx={{
                  '& .MuiTreeItem-content': {
                    margin: '2px 0 2px 0',
                    padding: '3px 4px 3px 4px',
                    borderRadius: '5px',
                    backgroundColor: 'white'
                  },
                }}
                label={label}>
        {children.map(child => {
          return <PageTreeItem onIconClick={onIconClick} page={child} key={child._id}
                               selectedPageId={selectedPageId} pages={pages}/>;
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
