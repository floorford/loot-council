export interface IMember {
    id: number;
    member: string;
    class: string;
    rank: string;
    role: string;
    prev_raids: number;
    absence: number;
    one_oh_one: number;
    six_months: boolean;
}
export interface IRoleRankClass {
    id: number;
    title: string;
}

export interface IState {
    members: Array<IMember>;
    roles: Array<IRoleRankClass>;
    ranks: Array<IRoleRankClass>;
    classes: Array<IRoleRankClass>;
}

export type MemberProps = {
    member: IMember;
};

export type LootCouncilProps = {
    members: Array<IMember>;
    loading: boolean;
    error: string;
};

export type FilterProps = {
    members: Array<IMember>;
    filter: Array<IRoleRankClass>;
    loading: boolean;
    error: string;
};
