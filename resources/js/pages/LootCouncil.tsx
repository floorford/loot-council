import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Overview from "./Overview";
import Filter from "./Filter";
import NavBar from "../components/NavBar";
import Player from "../components/Player";
import Raids from "./Raids";

const LootCouncil = (): JSX.Element => {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/">
                    <Overview />
                </Route>
                <Route exact path="/classes">
                    <Filter />
                </Route>
                <Route exact path="/roles">
                    <Filter />
                </Route>
                <Route exact path="/ranks">
                    <Filter />
                </Route>
                <Route path="/player/:playerID">
                    <Player />
                </Route>
                <Route path="/raids/:raidID">
                    <Raids />
                </Route>
            </Switch>
        </Router>
    );
};

export default LootCouncil;
