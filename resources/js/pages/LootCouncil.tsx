import { useState, useLayoutEffect } from "react";
import axios from "axios";

import lcStore from "../store/lc";
import { IState } from "../types";
import "../../css/lootcouncil.css";

const LootCouncil = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [data, setDataState] = useState<IState>(lcStore.initialState);
    const [players, setPlayer] = useState([]);

    useLayoutEffect(() => {
        lcStore.subscribe(setDataState);
        lcStore.init();
    });

    const submitSearch = (e: React.SyntheticEvent): void => {
        e.preventDefault();

        axios
            .get(`/api/addPlayer/${searchTerm}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                setPlayer(response.data.player);
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
    };

    return (
        <main className="wrapper">
            <div className="flex search">
                <form onSubmit={e => submitSearch(e)}>
                    <label htmlFor="search">
                        <input
                            type="search"
                            id="search"
                            className="pink"
                            value={searchTerm}
                            placeholder="Enter a player..."
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </label>
                </form>
                <button onClick={e => submitSearch(e)} type="button">
                    Add
                </button>
            </div>

            {data.loading && <p className="pink">Loading...</p>}

            {data.error && <p className="pink">{data.error}</p>}
        </main>
    );
};

export default LootCouncil;
