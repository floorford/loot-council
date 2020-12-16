import axios from "axios";
import { useEffect, useState } from "react";

import lcStore from "../store/lc";
import { IState, IData, Member } from "../types";
import MemberCard from "../components/Member";

const Overview = (): JSX.Element => {
    const [{ error, loading, members }, setDataState] = useState<IState>(
        lcStore.initialState
    );

    useEffect(() => {
        lcStore.init();
        const sub = lcStore.subscribe(setDataState);

        if (!members.length) {
            axios
                .get<IData>("/api/members", {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(response => {
                    lcStore.setData(response.data);
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
    }, []);

    const tanks = members.filter(mem => mem.role === "tank");
    const healers = members.filter(mem => mem.role === "healer");
    const dps = members
        .filter(
            mem =>
                mem.role === "melee" ||
                mem.role === "caster" ||
                mem.role === "ranged"
        )
        .sort(function(a, b) {
            if (a.class < b.class) {
                return 1;
            }
            if (a.class > b.class) {
                return -1;
            }

            return 0;
        });

    return (
        <main className="wrapper">
            {tanks.length ? (
                <section>
                    <p className="team-role">
                        <i className="fas fa-shield-alt"></i>
                        TANKS ({tanks.length})
                    </p>
                    <div className="flex">
                        {tanks.map((member: Member) => (
                            <MemberCard
                                key={member.id}
                                member={member}
                                interactive={true}
                                propClass=""
                            />
                        ))}
                    </div>
                </section>
            ) : null}
            {healers.length ? (
                <section>
                    <p className="team-role">
                        <i className="fas fa-medkit"></i>
                        HEALERS ({healers.length})
                    </p>
                    <div className="flex">
                        {healers.map((member: Member) => (
                            <MemberCard
                                key={member.id}
                                member={member}
                                interactive={true}
                                propClass=""
                            />
                        ))}
                    </div>
                </section>
            ) : null}
            {dps.length ? (
                <section>
                    <p className="team-role">
                        <i className="fas fa-skull-crossbones"></i> DPS (
                        {dps.length})
                    </p>
                    <div className="flex">
                        {dps.map((member: Member) => (
                            <MemberCard
                                key={member.id}
                                member={member}
                                interactive={true}
                                propClass=""
                            />
                        ))}
                    </div>
                </section>
            ) : null}
            {loading && <p className="pink">Loading...</p>}
            {error && <p className="pink">{error}</p>}
        </main>
    );
};

export default Overview;
