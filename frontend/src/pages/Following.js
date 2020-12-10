import React from "react";
import FollowedUser from "../components/FollowedUser";
import axios from "axios";
import { Button, Card} from "react-bootstrap";
import { connect } from "react-redux";



class Following extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            followed: []
        }

        this.retrieveFollowedBy = this.retrieveFollowedBy.bind(this);
        this.retrieveFollowing = this.retrieveFollowing.bind(this);

        if (this.props.followers) {
            this.retrieveFollowedBy();
        } else {
            this.retrieveFollowing();
        }

        axios.get(`${process.env.BACKEND_URL}/`).then(res => {
            if (res.data) {
                this.props.dispatch({ type: 'STORE_USER', data: { User: { ...res.data } } });
            } else {
                this.props.dispatch({type: "TO_LOGIN"})
            }
        })
    }

    async retrieveFollowing() {
        let data = await (await axios.get(`${process.env.BACKEND_URL}/user/followedUsers/${this.props.match.params.userId}`)).data;
        console.log(data);
        this.setState({
            followed: data
        })
    }

    async retrieveFollowedBy() {
        let data = await (await axios.get(`${process.env.BACKEND_URL}/user/followedByUsers/${this.props.match.params.userId}`)).data;
        this.setState({
            followed: data
        })
    }

    render() {
        return (
            <Card style={{ margin: "2em", padding: "2em" }}>
                <Card.Title>{this.props.followers ? "Followers" : "Following"}</Card.Title>
                <Card.Body>
                    {
                        this.state.followed.map(followuser => {
                            return (
                                this.props.followers ?
                                    <FollowedUser key={followuser._id} userId={followuser._id} username={followuser.username} follower showUnfollow={this.props.user?.profile.followedUsers.indexOf(followuser._id) > -1}/>
                                    :
                                    <FollowedUser key={followuser._id} userId={followuser._id} username={followuser.username} showUnfollow={this.props.user?.profile.followedUsers.indexOf(followuser._id) > -1}/>
                            )
                        })
                    }
                </Card.Body>
            </Card>
        );
    }
}

export default connect((state) => ({...state}))(Following)