import { Subject } from "rxjs";
import { IState, IMember, IData } from "../types";

// An RxJS Subject can act as both an Observable and an Observer at the same time
// when a Subject receives any data, that data can be forwarded to every Observer subscribed to it
const subject = new Subject();

const initialState: IState = {
    members: [],
    roles: [],
    ranks: [],
    classes: [],
    raidTotal: 0,
    selectedMember: {
        id: 0,
        member: "",
        class: "",
        rank: "",
        role: "",
        prev_raids: 0,
        absence: 0,
        one_oh_one: 0,
        six_months: false
    },
    loading: false,
    error: ""
};

let state = initialState;

// Subscribing different React Hooks setState functions to our RxJS Subject
// so that when it receives any data, it forwards that data to every state associated with our
// setState function.
const lcStore = {
    // initialize our component’s state whenever it’s mounted
    init: () => subject.next(state),
    subscribe: (setState: any) => subject.subscribe(setState),
    setData: (data: IData) => {
        state = {
            ...state,
            members: data.members,
            roles: data.roles,
            ranks: data.ranks,
            classes: data.classes,
            raidTotal: data.raid_total
        };
        subject.next(state);
    },
    setIMember: (member: IMember) => {
        state = {
            ...state,
            selectedMember: member
        };
        subject.next(state);
    },
    setLoading: (boolean: boolean) => {
        state = {
            ...state,
            loading: boolean
        };
        subject.next(state);
    },
    setError: (message: string) => {
        state = {
            ...state,
            error: message
        };
        subject.next(state);
    },
    initialState
};

export default lcStore;
