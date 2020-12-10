// window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import lcStore from "../store/lc";
import { IState, IData } from "../types";
import Overview from "./Overview";
import Filter from "./Filter";
import NavBar from "../components/NavBar";
import Player from "../components/Player";

const LootCouncil = (): JSX.Element => {
    const [data, setDataState] = useState<IState>(lcStore.initialState);

    useEffect(() => {
        lcStore.subscribe(setDataState);
        lcStore.init();

        axios
            .get<IData>("/api/members", {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                lcStore.setData(response.data);
                lcStore.setLoading(false);
            })
            .catch(ex => {
                const err =
                    ex.response.status === 404
                        ? "Resource not found"
                        : "An unexpected error has occurred";
                lcStore.setError(err);
                lcStore.setLoading(false);
            });
    }, []);
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/">
                    <Overview
                        members={data.members}
                        loading={data.loading}
                        error={data.error}
                    />
                </Route>
                <Route exact path="/classes">
                    <Filter
                        members={data.members}
                        filter={data.classes}
                        loading={data.loading}
                        error={data.error}
                    />
                </Route>
                <Route exact path="/roles">
                    <Filter
                        members={data.members}
                        filter={data.roles}
                        loading={data.loading}
                        error={data.error}
                    />
                </Route>
                <Route exact path="/ranks">
                    <Filter
                        members={data.members}
                        filter={data.ranks}
                        loading={data.loading}
                        error={data.error}
                    />
                </Route>
                <Route path="/player/:playerName">
                    <Player />
                </Route>
            </Switch>
        </Router>
    );
};

export default LootCouncil;
