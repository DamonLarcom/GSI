import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import Navigation from "../components/Navigation";
import Home from "./Home";

import "../styles/globals.css"
import Search from "./Search";
import PostForm from "./PostForm";

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
                      <Route path="/search"><Search/></Route>
                      <Route path="/post"><PostForm/></Route>
                  </Switch>
                </div>
            </Router>
        );
    }
}