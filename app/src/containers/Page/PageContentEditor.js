import ReactQuill from "react-quill";

export default function PageContentEditor({formik}) {
    const modules = {
        toolbar: {
            container: [
                [{'header': [1, 2, 3, 4, 5, 6, false]}],
                ['bold', 'italic', 'underline', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'},
                    {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image', 'code-block'],
            ],
        }
    }

    return (
        <ReactQuill name="body" theme="snow" onChange={value => formik.setFieldValue('body', value)}
                    value={formik.values.body} modules={modules} placeholder="Your page content ..."/>
    )
}
