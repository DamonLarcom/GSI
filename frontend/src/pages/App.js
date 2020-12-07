import React from "react";
import {HashRouter as Router, Switch, Route, Link} from "react-router-dom";
import axios from 'axios';

import Navigation from "../components/Navigation";
import Home from "./Home";

import "../styles/globals.css"
import Search from "./Search";
import PostForm from "./PostForm";
import Profile from "./Profile";
import ProfileForm from "./ProfileForm";
import { connect } from "react-redux";
import ProfileView from "./ProfileView";
import Blocked from "./Blocked";
import Following from "./Following"
import Post from "../components/Post";

class App extends React.Component {
    constructor(props) {
        super(props);

        axios.get(`${process.env.BACKEND_URL}/`).then(res => {
            if(res.data) {
                this.props.dispatch({type: 'STORE_USER', data: { User: {...res.data}}});
            }
        })
    }
    
    render() {

        return (
            <Router>
                <div>
                  <Navigation/>
                  <Switch>
                      <Route path="/profile/:userId/blocked" component={Blocked}/>
                      <Route path="/profile/:userId/view" component={ProfileView}/>
                      <Route path="/profile/:userId/edit" component={ProfileForm}/>
                      <Route path="/profile/:userId/followers" render={(props) => (<Following {...props} followers/>)}></Route>
                      <Route path="/profile/:userId/following" render={(props) => (<Following {...props} followers/>)}></Route>
                      <Route path="/profile/:userId" component={Profile} key={location.pathname}/>
                      <Route exact path="/"><Home/></Route>
                      <Route path="/home"><Home/></Route>
                      <Route path="/search"><Search/></Route>
                      <Route path="/post/comment/:postId/edit" render={(props) => (<PostForm {...props} edit/>)}></Route>
                      <Route path="/post/:postId" render={(props) => (<Post {...props} details/>)}></Route>
                      <Route path="/post"><PostForm/></Route>
                  </Switch>
                </div>
            </Router>
        );
    }
}

export default connect((state)=>({...state}))(App);