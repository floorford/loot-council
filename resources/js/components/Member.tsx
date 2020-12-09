import { IMember } from "../types";

type MemberProps = {
    member: IMember;
};

const Member = ({ member }: MemberProps): JSX.Element => (
    <section className={member.class}>
        <h1>{member.member}</h1>
        <img alt={member.class} src={`/assets/${member.class}.png`} />
    </section>
);

export default Member;
