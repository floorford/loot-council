import { useState, useLayoutEffect, useEffect } from "react";
import axios from "axios";

import lcStore from "../store/lc";
import { IState, Member } from "../types";
import MemberCard from "../components/Member";
import "../../css/lootcouncil.css";

const LootCouncil = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [data, setDataState] = useState<IState>(lcStore.initialState);

    useLayoutEffect(() => {
        const sub = lcStore.subscribe(setDataState);
        lcStore.init();

        return function cleanup() {
            sub.unsubscribe();
        };
    });

    useEffect(() => {
        const newPlayers = JSON.parse(
            localStorage.getItem("lcPlayers") || "[]"
        );
        lcStore.setPlayers(newPlayers);
    }, []);

    const submitSearch = (e: React.SyntheticEvent): void => {
        e.preventDefault();

        axios
            .get(`/api/addPlayer/${searchTerm}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                const newPlayers = data.lcPlayers.concat(response.data.player);
                lcStore.setPlayers(newPlayers);
                localStorage.setItem("lcPlayers", JSON.stringify(newPlayers));
                lcStore.setLoading(false);
                setSearchTerm("");
            })
            .catch(ex => {
                const err =
                    ex.response.status === 404
                        ? "No player could be found"
                        : "An unexpected error has occurred";
                lcStore.setError(err);
                lcStore.setLoading(false);
            });
    };

    const deletePlayer = (player: any) => {
        const newPlayers = data.lcPlayers.filter(
            (x: any) => x.player.id !== player.id
        );
        lcStore.setPlayers(newPlayers);
    };

    return (
        <main className="wrapper">
            <header className="pink">
                <h1>Loot Council</h1>
                <h4>Add players using the search below to compare</h4>
            </header>

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
                <button
                    disabled={!searchTerm.length ? true : false}
                    onClick={e => submitSearch(e)}
                    type="button"
                >
                    Add
                </button>
            </div>

            {/* MAKE SURE IT PERSISTS */}

            {data.lcPlayers.length
                ? data.lcPlayers.map((x: any, i: number) => (
                      <section key={i} className={`lc ${x.player.class}`}>
                          <i
                              className="fas fa-times"
                              onClick={() => deletePlayer(x.player)}
                          ></i>
                          <MemberCard
                              member={x.player}
                              interactive={false}
                              propClass="header"
                          />
                      </section>
                  ))
                : null}

            {data.loading && <p className="pink">Loading...</p>}

            {data.error && <p className="pink">{data.error}</p>}
        </main>
    );
};

export default LootCouncil;
