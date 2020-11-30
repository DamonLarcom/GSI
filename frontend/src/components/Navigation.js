import React from "react";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Login from "./Login";
import "../styles/navigation.css"

const Navigation = (props) => {
    return(
        <Nav className="navigation">
            <Nav.Item>
                <Nav.Link as={NavLink} exact to="/">Home</Nav.Link>
            </Nav.Item>
            {props.user?<Nav.Item>
                <Nav.Link as={NavLink} to={`/profile/${props.user._id}`}>Profile</Nav.Link>
            </Nav.Item>: null}
            <Login/>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/post">Create Post</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/search">Search</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default connect((state) => ({ ...state }))(Navigation);
