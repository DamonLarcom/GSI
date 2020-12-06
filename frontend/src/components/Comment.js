import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Card } from "react-bootstrap"

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Card>
                {console.log(this.props)}
                <Card.Body>
                    <Card.Title>Posted by <NavLink to={`/profile/${this.props.userId}/view`}>{this.props.username}</NavLink></Card.Title>
                    <Card.Text>{this.props.text}</Card.Text>
                    {this.props?.user?._id != this.props.userId ? null : <Button variant="danger" onClick={() => {this.props.onDelete(this.props.commentId)}}>Delete</Button>}
                </Card.Body>
            </Card>
        );
    }
}

export default connect(state => ({...state}))(Comment)