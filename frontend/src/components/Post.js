//@ts-check
import React from "react"
import { Card } from "react-bootstrap"

/**
 * @param {{ username: String; text: String; userId: any }} props
 */
const Post = props => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Posted by {props.username}</Card.Title>
                <Card.Text>{props.text}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Post;