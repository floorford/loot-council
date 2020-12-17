import { useState, useLayoutEffect, useEffect } from "react";
import axios from "axios";

import lcStore from "../store/lc";
import { IState } from "../types";
import MemberCard from "../components/Member";
import Stats from "../components/Stats";
import "../../css/lootcouncil.css";

const LootCouncil = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [data, setDataState] = useState<IState>(lcStore.initialState);
    const [expanded, setExpand] = useState<boolean[]>([]);
    const [totalRaids, setTotal] = useState<number>(0);

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

    useEffect(() => {
        if (!totalRaids) {
            axios
                .get(`/api/raids/total`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    setTotal(response.data.totalRaids);
                })
                .catch(ex => {
                    const err =
                        ex.response.status === 404
                            ? "The total number of raids couldn't be found"
                            : "An unexpected error has occurred";
                    lcStore.setError(err);
                    lcStore.setLoading(false);
                });
        }
        console.log(totalRaids);
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

    const getDetails = (i: number) => {
        const newExpanded = expanded.slice();
        newExpanded[i] = !newExpanded[i];
        setExpand(newExpanded);
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

            {data.loading && <p className="pink">Loading...</p>}

            {data.error && <p className="pink">{data.error}</p>}

            <section className="flex">
                {data.lcPlayers.length
                    ? data.lcPlayers.map((x: any, i: number) => (
                          <section key={i} className={`lc ${x.player.class}`}>
                              <i
                                  className="fas fa-times float-right"
                                  onClick={() => deletePlayer(x.player)}
                              ></i>
                              <MemberCard
                                  member={x.player}
                                  interactive={false}
                                  propClass=""
                              />
                              <i
                                  className={`fas fa-search-${
                                      expanded[i] ? "minus" : "plus"
                                  }`}
                                  onClick={() => getDetails(i)}
                              ></i>

                              <Stats member={x.player} raidTotal={totalRaids} />
                          </section>
                      ))
                    : null}
            </section>
        </main>
    );
};

export default LootCouncil;
