// window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
import { useEffect, useState } from "react";
import axios from "axios";

interface IMember {
    id: number;
    member: string;
    class_id: number;
    rank_id: number;
    role_id: number;
    prev_raids: number;
    absence: number;
    101: number;
    six_months: boolean;
}

const LootCouncil = (): JSX.Element => {
    const [members, setMembers] = useState<IMember[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get<IMember[]>("/api/members", {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                setMembers(response.data);
                setLoading(false);
            })
            .catch(ex => {
                const err =
                    ex.response.status === 404
                        ? "Resource not found"
                        : "An unexpected error has occurred";
                setError(err);
                setLoading(false);
            });
    }, []);

    console.log(members);
    return (
        <main>
            <header>
                <h1>Loot Council</h1>
            </header>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </main>
    );
};

export default LootCouncil;
