import ReactQuill from "react-quill";
import Quill from "quill";
import api, { API_BASE_URL } from '../../api';

export default function PageContentEditor({ formik }) {
    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image', 'code-block'],
            ],
        }
    }

    return (
        <ReactQuill name="body" theme="snow" onChange={value => formik.setFieldValue('body', value)}
            value={formik.values.body} modules={modules} placeholder="Your page content ..." />
    )
}
