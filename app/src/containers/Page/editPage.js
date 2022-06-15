import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from '../../api';

export default function EditPage() {
    let { pageId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(null);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const res = await api.get(`pages/${pageId}`);
            setPage(res.data);
            setIsLoading(false);
        })();
    }, [pageId])

    return (
        <>
            {!isLoading && page && <div>Edit page {page._id}</div>}
        </>
    )
}