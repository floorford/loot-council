export type Member = {
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
};

export type RoleRankClass = {
    id: number;
    title: string;
};

export type Detail = {
    item: string;
    title: string;
    id: number;
};

export interface IState {
    members: Array<Member>;
    roles: Array<RoleRankClass>;
    ranks: Array<RoleRankClass>;
    classes: Array<RoleRankClass>;
    raids: Array<RoleRankClass>;
    selectedMember: Member;
    loading: boolean;
    error: string;
    lcPlayers: [];
    [key: string]: any;
}

export interface IData {
    members: Array<Member>;
    roles: Array<RoleRankClass>;
    ranks: Array<RoleRankClass>;
    classes: Array<RoleRankClass>;
}

export type MemberProps = {
    member: Member;
    interactive: boolean;
    propClass: string;
};

export type StatsProps = {
    member: Member;
    raidTotal: number;
};

export type LootTableProps = {
    details: Array<Detail>;
    playerClass: string;
};

export type Loot = {
    item: string;
    id: number;
    member: string;
};
