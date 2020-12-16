import { from } from "rxjs";
import { StatsProps } from "../types";

const Stats = ({ member, raidTotal }: StatsProps) => {
    const { absence, prev_raids, six_months, one_oh_one } = member;

    return (
        <section className={`player-info ${member.class}`}>
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
    );
};

export default Stats;
