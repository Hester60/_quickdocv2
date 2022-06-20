import ReactQuill from "react-quill";
import ImageUploader from "quill-image-uploader";
import Quill from "quill";
import api, { API_BASE_URL } from '../../api';
import { useMemo } from "react";

export default function PageContentEditor({ formik }) {
    Quill.register("modules/imageUploader", ImageUploader);

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                { 'indent': '-1' }, { 'indent': '+1' }],
                ['link', 'image', 'code-block'],
            ],
        },
        imageUploader: {
            upload: (file) => {
                return new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append('file', file);

                    api.post(`upload`, formData)
                        .then(result => {
                            const filename = result.data.filename;
                            resolve(`${API_BASE_URL}uploads/${filename}`);
                        })
                        .catch(error => {
                            reject("Upload failed");
                        });
                });
            },
        },
    }), []);

    return (
        <ReactQuill name="body" theme="snow" onChange={value => formik.setFieldValue('body', value)}
            value={formik.values.body} modules={modules} placeholder="Your page content ..." />
    )
}
