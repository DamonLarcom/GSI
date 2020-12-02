import React from "react";
import {HashRouter as Router, Switch, Route, Link} from "react-router-dom";

import Navigation from "../components/Navigation";
import Home from "./Home";

import "../styles/globals.css"
import Search from "./Search";
import PostForm from "./PostForm";
import Profile from "./Profile";
import ProfileForm from "./ProfileForm";
import Blocked from "./Blocked";

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Router>
                <div>
                  <Navigation/>
                  <Switch>
                      <Route path="/profile/:userId/edit" component={ProfileForm}/>
                      <Route path="/profile/:userId/blocked" component={Blocked}/>
                      <Route path="/profile/:userId" component={Profile}/>
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