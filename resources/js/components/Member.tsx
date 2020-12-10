import { MemberProps } from "../types";
import { ucFirst } from "../helper";
import "../../css/members.css";

const Member = ({ member }: MemberProps): JSX.Element => (
    <section className={`member ${member.class}`}>
        <img
            className="class-icon"
            alt={member.class}
            src={`/assets/${member.class}.png`}
        />
        <div className="member-wrapper">
            <header className="member-header">
                <h1>{member.member}</h1>
                <a
                    href={`https://classic.warcraftlogs.com/character/eu/firemaw/${member.member}`}
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
            <p>{ucFirst(member.class)}</p>
            <p>Rank: {ucFirst(member.rank)}</p>
        </div>
    </section>
);

export default Member;
