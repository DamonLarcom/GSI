import React from "react";
import { connect } from "react-redux";
import {Button, Card} from "react-bootstrap";
import axios from "axios";


class BlockedUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.unblockUser = this.unblockUser.bind(this);
    }

    async unblockUser() {
        const data = await axios.put(`${process.env.BACKEND_URL}/user/blockToggle/${this.props.userToBlockId}`)
        .then(res => {
            if (res.data) {
            this.props.dispatch({ type: 'STORE_USER', data: { User: { ...res.data } } });
            window.location.reload();
        }});;

    }

    render() {
        return(
            <Card>
                <Card.Body>
                    <Card.Title>{this.props.username}</Card.Title>
                    <Button variant="danger" onClick={this.unblockUser}>Unblock</Button>
                </Card.Body>
            </Card>
        );
    }
}

export default connect((state) => ({ ...state }))(BlockedUser);