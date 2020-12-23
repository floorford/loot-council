import { useState, useEffect, useLayoutEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import lcStore from "../store/lc";
import axios from "axios";

import { IState, Detail } from "../types";
import MemberCard from "./Member";
import LootTable from "./LootTable";
import Stats from "./Stats";

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

    return (
        <main className="wrapper">
            <MemberCard
                member={data.selectedMember}
                interactive={false}
                propClass="header"
            />

            <section className="flex player-wrapper">
                <Stats
                    member={data.selectedMember}
                    raidTotal={raidTotal}
                    totalLoot={details}
                />

                <LootTable
                    details={details}
                    maxHeight={750}
                    playerClass={data.selectedMember.class}
                />
            </section>
        </main>
    );
};

export default Player;
