import React from "react";
import {Button, Card} from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";




class FollowedUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.unfollowUser = this.unfollowUser.bind(this);
    }
    
    async unfollowUser() {
        const data = await axios.put(`${process.env.BACKEND_URL}/user/followToggle/${this.props.userId}`)
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
                <Card.Title><NavLink to={`/profile/${this.props.userId}/view`}>{this.props.username}</NavLink></Card.Title>
                {this.props.showUnfollow ? <Button variant="danger" onClick={this.unfollowUser}>Unfollow</Button>: null}
                
            </Card.Body>
        </Card>
        );
    }
}

export default connect((state) => ({ ...state }))(FollowedUser);