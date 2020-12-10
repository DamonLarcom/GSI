import React from "react";
import BlockedUser from "../components/BlockedUser";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Card } from "react-bootstrap";

class Blocked extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blocked : []
        }
        this.retrieveBlocked();
        axios.get(`${process.env.BACKEND_URL}/`).then(res => {
            if (res.data) {
                this.props.dispatch({ type: 'STORE_USER', data: { User: { ...res.data } } });
            } else {
                this.props.dispatch({type: "TO_LOGIN"})
            }
        })
    }

    async retrieveBlocked() {
        let data = await (await axios.get(`${process.env.BACKEND_URL}/user/blockedUsers`)).data;
        console.log(data);
        this.setState({
            blocked : data
        })
    }

    render() {
        return(
            <Card style={{margin: "2em", padding: "2em"}}>
                <Card.Title>Blocked Users</Card.Title>
                <Card.Body>
                    {
                        this.state.blocked.map(blockeduser => {
                            return(<BlockedUser key={blockeduser._id} userToBlockId={blockeduser._id} username={blockeduser.username}/>);
                        })
                    }
                </Card.Body>
            </Card>
        );
    }
}

export default connect((state) => ({...state}))(Blocked)