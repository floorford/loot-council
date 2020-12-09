// window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import LootCouncil from "./components/LootCouncil";

ReactDOM.render(<LootCouncil />, document.getElementById("root"));
