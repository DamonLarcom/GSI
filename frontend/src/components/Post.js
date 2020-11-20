import React from "react"
import { Card } from "react-bootstrap"

const Post = props => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Posted by {props.username}</Card.Title>
                <Card.Text>{props.text}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Post;