// window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Overview from "./Overview";
import NavBar from "../components/NavBar";

const LootCouncil = (): JSX.Element => {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/">
                    <Overview />
                </Route>
            </Switch>
        </Router>
    );
};

export default LootCouncil;
