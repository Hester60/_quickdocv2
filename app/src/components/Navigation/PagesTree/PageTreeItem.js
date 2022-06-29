import { Box, Button, Chip, Typography } from "@mui/material";
import TreeItem from "@mui/lab/TreeItem";
import { useNavigate } from "react-router-dom";
import { ChevronRight, CompareArrows, ExpandMore } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";

const useStyle = makeStyles((theme) => ({
    moveBtn: {
        height: '100%',
        padding: 0,
        minWidth: 'unset',
        width: 35,
        color: "white",
        backgroundColor: theme.palette.action.selected,
        "&:hover": {
            backgroundColor: theme.palette.action.hover
        }
    }
}))

export default function PageTreeItem({ page, selectedPageId, pages, onIconClick, handleMoveBtnClick }) {
    const navigate = useNavigate();
    const classes = useStyle();
    const [showMoveBtn, setShowMoveBtn] = useState(false);

    useEffect(() => {
        return () => {
            setShowMoveBtn(false);
        }
    }, []);

    const label = (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
            onMouseEnter={() => setShowMoveBtn(true)}
            onMouseLeave={() => setShowMoveBtn(false)}>
            {page.tag && (
                <Chip size="small" label={page.tag.name} color={page.tag.color} sx={{ mr: 1, cursor: 'pointer' }} />
            )}
            <Typography sx={{ mr: showMoveBtn ? 1 : 0 }}
                noWrap
            >{page.title}</Typography>
            {showMoveBtn && (
                <Box ml='auto'>
                    <Button variant="contained" disableElevation className={classes.moveBtn} onClick={(e) => { setShowMoveBtn(false); handleMoveBtnClick(e, page); }}><CompareArrows /></Button>
                </Box>
            )}
        </Box>
    );

    const renderNode = () => {
        const children = pages.filter(e => e.parent && e.parent._id === page._id);

        return (
            <TreeItem nodeId={page._id}
                key={page._id}
                expandIcon={<ChevronRight onClick={(e) => {
                    e.stopPropagation();
                    onIconClick(page._id)
                }} />}
                collapseIcon={<ExpandMore onClick={(e) => {
                    e.stopPropagation();
                    onIconClick(page._id)
                }} />}
                onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/page/${page._id}`)
                }}
                sx={{
                    '& .MuiTreeItem-content': {
                        margin: '2px 0 2px 0',
                        padding: '6px 4px 6px 4px',
                        borderRadius: '5px',
                    },
                }}
                label={label}>
                {children.map(child => {
                    return <PageTreeItem handleMoveBtnClick={handleMoveBtnClick} onIconClick={onIconClick} page={child} key={child._id}
                        selectedPageId={selectedPageId} pages={pages} />;
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
