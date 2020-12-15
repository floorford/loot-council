import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "../components/NavBar";
import Player from "../components/Player";
import Raids from "./Raids";
import Overview from "./Overview";
import Filter from "./Filter";
import LootCouncil from "./LootCouncil";

const App = (): JSX.Element => {
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
                <Route path={["/raids", "/raids/:raidID"]}>
                    <Raids />
                </Route>
                <Route path="/loot-council">
                    <LootCouncil />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
