"use strict";

import React          from "react/addons";
import Tabs           from "../components/Tabs"

//allow react dev tools work
window.React = React;

React.render(<Tabs tabs={["aaa", "bbb"]}/>, document.getElementById("tabs"));
