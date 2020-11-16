import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home } from "./Home";
import "../styles/globals.css";

export default class App extends React.Component {
    constructor() {
        super();
    }
    ping() {
        console.log("ping")
    }
    render() {
        return (
            <div>
                <Router>
                    <div className="wrapper">

                    </div>
                    <nav>
                        <Link to="/home">Home</Link>
                    </nav>
                    <Switch>
                        <Route path="/home"><Home title="Test" user={{ name: "Something", password: "password" }} onTest={this.ping} /></Route>
                        <Route exact path="/"><Home title="Test" user={{ name: "Something", password: "password" }} onTest={this.ping} /></Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}