import ReactQuill from "react-quill";
import ImageUploader from "quill-image-uploader";
import Quill from "quill";
import api, { API_BASE_URL } from '../../api';
import { useMemo } from "react";

export const SAVE_KEYBOARD_SHORTCUT = 'CTRL+V';

export default function PageContentEditor({ formik }) {
    const Image = Quill.import('formats/image');
    Image.className = 'img-fluid';
    Quill.register(Image, true);
    Quill.register("modules/imageUploader", ImageUploader);

    const handleKeydown = (e) => {
        let charCode = String.fromCharCode(e.which).toLowerCase();

        if (e.ctrlKey && charCode === 's') {
            e.preventDefault();
            formik.handleSubmit();
        }
    }

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
                            resolve(`${API_BASE_URL}static/uploads/${filename}`);
                        })
                        .catch(error => {
                            reject("Upload failed");
                        });
                });
            },
        },
    }), []);

    return (
        <ReactQuill name="body" theme="snow" onChange={value => formik.setFieldValue('body', value)} onKeyDown={handleKeydown}
            value={formik.values.body} modules={modules} placeholder="Your page content ..." />
    )
}
