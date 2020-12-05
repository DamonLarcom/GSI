import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Card } from "react-bootstrap"

class Comment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>Posted by <NavLink to={`/profile/${this.props.userId}/view`}>{this.props.username}</NavLink></Card.Title>
                    <Card.Text>{this.props.text}</Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default connect(state => ({...state}))(Comment)