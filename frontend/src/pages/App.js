import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import Navigation from "../components/Navigation";
import Home from "./Home";

import "../styles/globals.css"

export default class App extends React.Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <Router>
                <div>
                  <Navigation/>
                  <Switch>
                      <Route exact path="/"><Home/></Route>
                      <Route path="/home"><Home/></Route>
                  </Switch>
                </div>
            </Router>
        );
    }
}