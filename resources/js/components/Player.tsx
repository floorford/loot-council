import { useState, useEffect, useLayoutEffect } from "react";
import lcStore from "../store/lc";
import axios from "axios";

import { IState, IDetail } from "../types";

const Player = (): JSX.Element => {
    const [data, setDataState] = useState<IState>(lcStore.initialState);
    const [details, setDetails] = useState<IDetail[]>([]);

    useLayoutEffect(() => {
        lcStore.subscribe(setDataState);
        lcStore.init();
    });

    useEffect(() => {
        if (data.selectedMember) {
            axios
                .get(`/api/members/${data.selectedMember.id}`, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    setDetails(response.data.details);
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
    }, [data.selectedMember]);

    console.log(details);
    console.log(data.raidTotal);

    const {
        absence,
        member,
        prev_raids,
        rank,
        role,
        six_months
    } = data.selectedMember;

    return (
        <main className="wrapper">
            <header>
                <h1 className="pink">{member}</h1>
            </header>

            <section>
                <h3 className="pink">Loot Recieved</h3>
                {details ? (
                    <ul>
                        {details.map((item: IDetail) => (
                            <li key={item.id}>
                                {item.title}: {item.item}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No loot recieved!</p>
                )}
            </section>
        </main>
    );
};

export default Player;
