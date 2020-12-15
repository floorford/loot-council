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
    [key: string]: any;
}
export interface IRoleRankClass {
    id: number;
    title: string;
}

export interface IDetail {
    item: string;
    title: string;
    id: number;
}

export interface IState {
    members: Array<IMember>;
    roles: Array<IRoleRankClass>;
    ranks: Array<IRoleRankClass>;
    classes: Array<IRoleRankClass>;
    selectedMember: IMember;
    loading: boolean;
    error: string;
    raidTotal: number;
    [key: string]: any;
}

export interface IData {
    members: Array<IMember>;
    roles: Array<IRoleRankClass>;
    ranks: Array<IRoleRankClass>;
    classes: Array<IRoleRankClass>;
    raid_total: number;
}

export type MemberProps = {
    member: IMember;
};
