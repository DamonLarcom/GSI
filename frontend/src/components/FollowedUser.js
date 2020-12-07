import React from "react";
import {Button, Card} from "react-bootstrap";
import axios from "axios";


const FollowedUser = props => {
    const unfollowUser = async() => {
        const status = (await axios.put(`${process.env.BACKEND_URL}/user/followToggle/${props._id}`)).status
        if(status === 200) {
            console.log("User unfollowed");
        }
    }

    return(
        <Card>
            <Card.Body>
                <Card.Title>{props.username}</Card.Title>
                <Button variant="danger" onClick={unfollowUser}>Unfollow</Button>
            </Card.Body>
        </Card>
    );
}

export default FollowedUser;