import React from "react";
import {Home} from "./Home"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import "../styles/globals.css"

export default class App extends React.Component {
    constructor() {
        super();
    }

    ping() {
        console.log('Hello')
    }
    
    render() {
        return (
            <Router>
                <div>
                    <nav>
                        <Link to="/home">Home</Link>
                    </nav>
                  <Switch>
                      <Route exact path="/"><Home title="Something" user={{name: "Something", password: "Something2"}} onTest={this.ping}/></Route>
                      <Route path="/home"><Home title="Something" user={{name: "Something", password: "Something2"}} onTest={this.ping}/></Route>
                  </Switch>
                </div>
            </Router>
        );
    }
}