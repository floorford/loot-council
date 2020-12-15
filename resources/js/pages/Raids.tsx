import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import lcStore from "../store/lc";

const Raids = () => {
    const id = useParams();
    useEffect(() => {
        const url = id ? `/api/raids/${id}` : "/api/raids";
        axios
            .get(url, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                lcStore.setIMember(response.data.member[0]);
                lcStore.setLoading(false);
            })
            .catch(ex => {
                const err =
                    ex.response.status === 404
                        ? "Resource not found"
                        : "An unexpected error has occurred";
                lcStore.setError(err);
                lcStore.setLoading(false);
            });
    }, []);

    return <main>hi</main>;
};

export default Raids;
