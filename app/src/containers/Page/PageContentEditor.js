import React from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';
import './CustomCKEditor.css'
import {makeStyles} from "@mui/styles";

export const SAVE_KEYBOARD_SHORTCUT = 'CTRL+V';

const useStyles = makeStyles((theme) => ({
    richTextEditor: {
        "& .ck-editor__main > .ck-editor__editable": {
            backgroundColor: theme.palette.background.default,
        },
        "& .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused)": {
            borderColor: theme.palette.action.disabled
        },
        "& .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused):hover": {
            borderColor: theme.palette.action.active
        },
        "& .ck.ck-toolbar": {
            backgroundColor: theme.palette.background.default,
            borderColor: theme.palette.action.disabled
        },
        "& .ck.ck-toolbar__items": {
            backgroundColor: theme.palette.background.default,
        },
        "& .ck .ck-button": {
            backgroundColor: theme.palette.background.default,
            cursor: 'pointer'
        }
    }
}));

export default function PageContentEditor({formik}) {
    const classes = useStyles();

    const handleKeydown = (e) => {
        let charCode = String.fromCharCode(e.which).toLowerCase();

        if (e.ctrlKey && charCode === 's') {
            e.preventDefault();
            formik.handleSubmit();
        }
    }

    return (
        <div className={classes.richTextEditor} onKeyDown={handleKeydown}>
            <CKEditor
                editor={Editor}
                data={formik.values.body}
                name="body"
                sx={{
                    background: "#121212 !important"
                }}
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => formik.setFieldValue('body', editor.getData())}
            />
        </div>
    )
}
