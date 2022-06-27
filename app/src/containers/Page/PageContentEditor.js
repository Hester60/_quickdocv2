import React, {useEffect} from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build';
import './CustomCKEditor.css'
import {makeStyles} from "@mui/styles";
export const SAVE_KEYBOARD_SHORTCUT = 'CTRL+V';

const useStyles = makeStyles((theme) => ({
    richTextEditor: {
        "& .ck-editor__main > .ck-editor__editable": {
            backgroundColor: theme.palette.background.default,
            minHeight: 250
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
        },
        "& pre": {
            color: 'white'
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

    const config = {
        placeholder: "Write something..."
    }

    return (
        <div className={classes.richTextEditor} onKeyDown={handleKeydown}>
            <CKEditor
                editor={Editor}
                data={formik.values.body}
                name="body"
                config={config}
                onChange={(event, editor) => formik.setFieldValue('body', editor.getData())}
            />
        </div>
    )
}
