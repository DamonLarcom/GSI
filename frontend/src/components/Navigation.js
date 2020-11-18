import { Nav } from "react-bootstrap";
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/navigation.css"

const Navigation = (props) => {
    return(
        <Nav className="navigation">
            <Nav.Item>
                <Nav.Link as={NavLink} exact to="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default Navigation;
