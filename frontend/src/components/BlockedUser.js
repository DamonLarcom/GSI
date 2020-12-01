import React from "react";
import {Button, Card} from "react-bootstrap";


const BlockedUser = props => {
    const unblockUser = async() => {
        const status = (await axios.put(`${process.env.BACKEND_URL}/user/blockToggle/${props.userToBlockId}`)).status
        if(status === 200) {
            console.log("User blocked/unblocked");
        }
    }

    return(
        <Card>
            <Card.Body>
                <Card.Title>{props.username}</Card.Title>
                <Button variant="danger" onclick={unblockUser}></Button>
            </Card.Body>
        </Card>
    );
}

export default BlockedUser;