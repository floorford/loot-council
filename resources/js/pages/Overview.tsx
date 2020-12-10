// window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
import { useEffect, useState } from "react";
import axios from "axios";

import { IMember } from "../types";
import Member from "../components/Member";

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

    const tanks = members.filter(mem => mem.role === "tank");
    const healers = members.filter(mem => mem.role === "healer");
    const dps = members.filter(
        mem =>
            mem.role === "melee" ||
            mem.role === "caster" ||
            mem.role === "ranged"
    );

    return (
        <main className="wrapper">
            {tanks ? (
                <section>
                    <p className="team-role">
                        <i className="fas fa-shield-alt"></i>
                        TANKS ({tanks.length})
                    </p>
                    <div className="flex">
                        {tanks.map((member: IMember) => (
                            <Member key={member.id} member={member} />
                        ))}
                    </div>
                </section>
            ) : null}
            {healers ? (
                <section>
                    <p className="team-role">
                        <i className="fas fa-medkit"></i>
                        HEALERS ({healers.length})
                    </p>
                    <div className="flex">
                        {healers.map((member: IMember) => (
                            <Member key={member.id} member={member} />
                        ))}
                    </div>
                </section>
            ) : null}
            {dps ? (
                <section>
                    <p className="team-role">
                        <i className="fas fa-skull-crossbones"></i> DPS (
                        {dps.length})
                    </p>
                    <div className="flex">
                        {dps.map((member: IMember) => (
                            <Member key={member.id} member={member} />
                        ))}
                    </div>
                </section>
            ) : null}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
        </main>
    );
};

export default LootCouncil;
