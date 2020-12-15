import { useHistory } from "react-router-dom";

import lcStore from "../store/lc";
import { MemberProps } from "../types";
import { ucFirst } from "../helper";
import "../../css/members.css";

const Member = ({ member }: MemberProps): JSX.Element => {
    const history = useHistory();

    const selectMember = () => {
        lcStore.setIMember(member);
        history.push(`/player/${member.id}`);
    };

    return (
        <section className={`member ${member.class}`} onClick={selectMember}>
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
};

export default Member;
