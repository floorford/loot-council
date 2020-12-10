// window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import { IMember, IRoleRankClass, IState } from "../types";
import Overview from "./Overview";
import Classes from "./Classes";
import NavBar from "../components/NavBar";

const LootCouncil = (): JSX.Element => {
    const [members, setMembers] = useState<IMember[]>([]);
    const [classes, setClasses] = useState<IRoleRankClass[]>([]);
    const [roles, setRoles] = useState<IRoleRankClass[]>([]);
    const [ranks, setRanks] = useState<IRoleRankClass[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        axios
            .get<IState>("/api/members", {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                setMembers(response.data.members);
                setClasses(response.data.classes);
                setRoles(response.data.roles);
                setRanks(response.data.ranks);
                setLoading(false);
            })
            .catch(ex => {
                const err =
                    ex.response.status === 404
                        ? "Resource not found"
                        : "An unexpected error has occurred";
                setError(err);
                setLoading(false);
            });
    }, []);
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/">
                    <Overview
                        members={members}
                        loading={loading}
                        error={error}
                    />
                </Route>
                <Route exact path="/classes">
                    <Classes
                        members={members}
                        classes={classes}
                        loading={loading}
                        error={error}
                    />
                </Route>
            </Switch>
        </Router>
    );
};

export default LootCouncil;
