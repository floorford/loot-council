import { StatsProps } from "../types";

const Stats = ({ member, raidTotal }: StatsProps) => {
    const { absence, prev_raids, six_months, one_oh_one } = member;

    return (
        <section className={`player-info ${member.class}`}>
            <h3 className="pink">Player Stats</h3>
            <section
                className="flex"
                style={{ justifyContent: "space-between" }}
            >
                <div>
                    <p>Missed Raids: {absence}</p>
                    <p>Raids before MO: {prev_raids}</p>
                </div>
                <div>
                    <p>
                        Attendance:
                        {Math.ceil(((raidTotal - absence) / raidTotal) * 100)}%
                    </p>
                    <p>Recent Attendance: ??</p>
                    {six_months ? (
                        <p>
                            6 months<sup>+</sup> member
                        </p>
                    ) : null}
                </div>
            </section>
        </section>
    );
};

export default Stats;
