import { IMember, LootCouncilProps } from "../types";
import Member from "../components/Member";

const Overview = ({
    members,
    loading,
    error
}: LootCouncilProps): JSX.Element => {
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
                        {tanks.map((member: IMember) => (
                            <Member key={member.id} member={member} />
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
                        {healers.map((member: IMember) => (
                            <Member key={member.id} member={member} />
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
                        {dps.map((member: IMember) => (
                            <Member key={member.id} member={member} />
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
