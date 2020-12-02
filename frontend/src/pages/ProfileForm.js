import axios from "axios";
import React from "react";
import { Button, Card, Form } from "react-bootstrap";

export default class ProfileForm extends React.Component {
    constructor(props) {
        super(props);
        axios.get(`${process.env.BACKEND_URL}/user/${this.props.match.params.userId}`).then(res => {
            const profile = res.data.profile;
            this.setState({ ...profile });    
        });

        this.state = {
            name: "",
            email: "",
            phoneNum: "",
            bio: ""
        }

        this.submitEdit = this.submitEdit.bind(this);
    }

    submitEdit(e) {
        e.preventDefault();
        axios.put(`${process.env.BACKEND_URL}/user/${this.props.match.params.userId}`, {user: this.state}).then(res => {
            window.location = `/#/profile/${this.props.match.params.userId}`
        });
    }

    render() {
        return(
            <div style={{margin: "0 auto", padding: "5%"}}>
                <Card style={{padding: "1.25rem"}}>
                    <Card.Title>Editing Your Profile</Card.Title>
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control as="input" type="text" defaultValue={this.state.name} onChange={e => {this.setState({name: e.target.value})}}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control as="input" type="email" defaultValue={this.state.email} onChange={e => {this.setState({email: e.target.value})}}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control as="input" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" defaultValue={this.state.phoneNum} onChange={e => {this.setState({phoneNum: e.target.value})}}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Bio</Form.Label>
                                <Form.Control as="textarea" defaultValue={this.state.bio} onChange={e => {this.setState({bio: e.target.value})}}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control as={Button} variant="primary" onClick={this.submitEdit} type="submit">Edit Profile</Form.Control>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}