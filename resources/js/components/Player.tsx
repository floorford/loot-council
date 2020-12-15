import { useState, useEffect, useLayoutEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import lcStore from "../store/lc";
import axios from "axios";

import { IState, Detail } from "../types";
import { ucFirst } from "../helper";

import "../../css/player.css";

const Player = (): JSX.Element => {
    const [data, setDataState] = useState<IState>(lcStore.initialState);
    const [details, setDetails] = useState<Detail[]>([]);
    const [raidTotal, setRaidTotal] = useState<number>(0);

    const location = useLocation();

    useLayoutEffect(() => {
        lcStore.subscribe(setDataState);
        lcStore.init();
    });

    useEffect(() => {
        axios
            .get(`/api${location.pathname}`, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                setDetails(response.data.details);
                setRaidTotal(response.data.raid_total);
                lcStore.setMember(response.data.member[0]);
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

    const {
        absence,
        member,
        prev_raids,
        rank,
        six_months,
        one_oh_one
    } = data.selectedMember;

    const playerClass = data.selectedMember.class;
    const urlName = member.slice(0, member.indexOf("/"));

    return (
        <main className="wrapper">
            <section className={`member ${playerClass} header`}>
                <img
                    className="class-icon"
                    alt={playerClass}
                    src={`/assets/${playerClass}.png`}
                />
                <div className="member-wrapper">
                    <header className="member-header">
                        <h1>{member}</h1>
                        <a
                            href={`https://classic.warcraftlogs.com/character/eu/firemaw/${urlName}`}
                            target="_blank"
                            className="tooltip"
                        >
                            <img
                                className="icon"
                                alt="Warcraft Logs"
                                src={`/assets/warcraftlogs.png`}
                            />
                            <span className="tooltip-text">Warcraft Logs</span>
                        </a>
                    </header>
                    <p>{ucFirst(playerClass)}</p>
                    <p>Rank: {ucFirst(rank)}</p>
                </div>
            </section>

            <section className={`player-info ${playerClass}`}>
                <h3 className="pink">Player Stats</h3>
                <p>Missed Raids: {absence}</p>
                <p>
                    Attendance:{" "}
                    {Math.ceil(((raidTotal - absence) / raidTotal) * 100)}%
                </p>
                {/* <p>Recent Attendance: {one_oh_one}</p> */}
                <p>Raids before MO: {prev_raids}</p>
                {six_months ? (
                    <p>
                        6 months<sup>+</sup> member
                    </p>
                ) : null}
            </section>

            <section className={`player-info ${playerClass}`}>
                <h3 className="pink">Loot Recieved</h3>
                {details ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Raid</th>
                                <th>Item</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map((item: Detail) => {
                                let formattedItems: any = item.item.split("/");
                                return (
                                    <tr key={item.id}>
                                        <td>
                                            <Link to={`/raids/${item.id}`}>
                                                {item.title}
                                            </Link>
                                        </td>
                                        <td>
                                            {formattedItems.map(
                                                (x: string, i: number) => (
                                                    <p key={i}>{x}</p>
                                                )
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p>No loot recieved!</p>
                )}
            </section>
        </main>
    );
};

export default Player;
