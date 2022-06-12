import * as React from 'react';
import {useEffect, useState} from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import api from '../../../api';
import Typography from "@mui/material/Typography";

export default function PagesTree({width}) {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        api.get('pages?project=62a3ddd1ecbea0761c0bfdec&projection=_id,title,childrenCount,parent')
            .then((res) => {
                setPages(res.data.pages);
            })
            .catch(error => {
                alert(error);
            })
    }, []);


    const renderTree = function (page) {
        const children = pages.filter(e => e.parent === page._id);

        return (
            <TreeItem nodeId={page._id} label={<Typography
                onClick={(e) => {e.stopPropagation(); console.log('Clicked !')}}
                sx={{
                    textOverflow: 'ellipsis',
                    overflowX: 'hidden', whiteSpace: 'nowrap', display: 'block'
                }}>{page.title}</Typography>} key={page._id}>
                {
                    children.map(child => {
                        return renderTree(child);
                    })
                }
            </TreeItem>
        );
    }

    return (
        <TreeView
            aria-label="Pages Tree View"
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRightIcon/>}
            sx={{
                flexGrow: 1,
                width: (width),
                overflowY: 'auto',
                overflowX: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'block'
            }}
        >
            {
                pages && (
                    pages.filter(e => e.parent === null).map(page => {
                        return renderTree(page);
                    })
                )
            }
        </TreeView>
    );
}
