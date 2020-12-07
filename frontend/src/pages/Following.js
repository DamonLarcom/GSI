import React from "react";
import BlockedUser from "../components/FollowedUser";
import axios from "axios";
import { Button, Card } from "react-bootstrap";

class Following extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            followed : []
        }
        
        if(this.props.followers) {
            this.retrieveFollowedBy();
        } else {
            this.retrieveFollowing();
        }
    }

    async retrieveFollowing() {
        let data = await (await axios.get(`${process.env.BACKEND_URL}/user/followedUsers`)).data;
        console.log(data);
        this.setState({
            followed : data
        })
    }

    async retrieveFollowedBy() {
        let data = await(await axios.get(`${process.env.BACKEND_URL}/user/followedBy`)).data;
        this.setState({
            followed : data
        })
    }

    render() {
        return(
            <Card style={{margin: "2em", padding: "2em"}}>
                <Card.Title>{this.props.followers ? "Followers" : "Following"}</Card.Title>
                <Card.Body>
                    {
                        this.state.blocked.map(followuser => {
                            return(<FollowedUser key={followuser._id} userToFollowId={followuser._id} username={followuser.username}/>);
                        })
                    }
                </Card.Body>
            </Card>
        );
    }
}

export default Following;