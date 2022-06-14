import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from '../../api';

export default function ShowPage() {
    let {pageId} = useParams();
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
            {!isLoading && (
                <div>{page.title}</div>
            )}
        </>
    )
}
