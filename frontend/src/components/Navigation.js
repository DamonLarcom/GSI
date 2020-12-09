import React from "react";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Login from "./Login";
import "../styles/navigation.css"
import SignUp from "./SignUp";

const Navigation = (props) => {
    return(
        <Nav className="navigation">
            <Nav.Item>
                <Nav.Link as={NavLink} exact to="/">Home</Nav.Link>
            </Nav.Item>
            {props.user?<Nav.Item>
                <Nav.Link as={NavLink} to={`/profile/${props.user._id}`}>Profile</Nav.Link>
            </Nav.Item>: null}
            {console.log()}
            {!props.user ? null: <Nav.Item><Nav.Link onClick={() => {props.dispatch({type: 'LOGOUT_USER'});}}>Log Out</Nav.Link></Nav.Item>}
            {/* {!props.user ? <SignUp/>: null} */}
            {props.user ? 
            <Nav.Item>
                <Nav.Link as={NavLink} to="/post">Create Post</Nav.Link>
            </Nav.Item>: null}
            {props.user ?
            <Nav.Item>
                <Nav.Link as={NavLink} to="/search">Search</Nav.Link>
            </Nav.Item>: null}
        </Nav>
    );
}

export default connect((state) => ({ ...state }))(Navigation);
