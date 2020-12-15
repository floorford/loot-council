import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

import { RoleRankClass, Loot } from "../types";
import lcStore from "../store/lc";

const Raids = () => {
    const [{ raids }, setRaidsData] = useState(lcStore.initialState);

    const location = useLocation();
    const [selectedFilter, setFilter] = useState<string>(
        location.pathname.replace(/[^0-9]+/, "")
    );
    const [raidDetails, setRaidDetails] = useState([]);

    const raidID = selectedFilter;

    useEffect(() => {
        lcStore.init();
        const sub = lcStore.subscribe(setRaidsData);

        if (!raids.length) {
            axios
                .get(`/api/raids`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    lcStore.setRaids(response.data.raids);
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
        }

        if (raidID) {
            axios
                .get(`/api/raids/${raidID}`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    setRaidDetails(response.data.raidInfo);
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
        }

        return function cleanup() {
            sub.unsubscribe();
        };
    }, [selectedFilter]);

    return (
        <main className="wrapper">
            <header>
                <h1 className="pink">Raid Overview</h1>
            </header>

            {raids.length ? (
                <form>
                    <select
                        className="pink"
                        value={selectedFilter}
                        onChange={e => setFilter(e.target.value)}
                    >
                        <option value="">Please Select a Raid</option>
                        {raids.map((cl: RoleRankClass) => (
                            <option key={cl.id} value={cl.id}>
                                {cl.title}
                            </option>
                        ))}
                    </select>
                </form>
            ) : null}

            {raidDetails.length ? (
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Member</th>
                        </tr>
                    </thead>
                    <tbody>
                        {raidDetails.map((item: Loot) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.item}</td>
                                    <td>
                                        <Link to={`/player/${item.id}`}>
                                            {item.member}
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : null}
        </main>
    );
};

export default Raids;
