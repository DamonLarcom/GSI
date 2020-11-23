//@ts-check
import React from "react"
import { Button, Card } from "react-bootstrap"

/**
 * @param {{ username: String; text: String; userId: any }} props
 */
const Post = props => {
    const deletePost = () => {

    }

    return (
        <Card>
            <Card.Body>
                <Card.Title>Posted by {props.username}</Card.Title>
                <Card.Text>{props.text}</Card.Text>
                <Button variant="danger" onClick={deletePost}>Delete</Button>
            </Card.Body>
        </Card>
    );
}

export default Post;