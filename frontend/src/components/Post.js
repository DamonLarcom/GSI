//@ts-check
import axios from "axios"
import React from "react"
import { Button, Card } from "react-bootstrap"
import { useHistory } from "react-router-dom"

/**
 * @param {{ username: String; text: String; userId: any }} props
 */
const Post = props => {
    const history = useHistory();
    const deletePost = async () => {
        console.log("Delete Post");
        const deleteStatus = (await axios.delete(`http://localhost:4000/post/${props.userId}`)).status
        console.log(deleteStatus);
        if(deleteStatus === 200) {
            // Probably not the best way to do it, but for what we're doing it should be fine
            location.reload();
        }
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