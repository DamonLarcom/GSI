import axios from "axios";
import React from "react";
import { Accordion, Button, Card, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";

class ProfileForm extends React.Component {
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
            bio: "",
            input: {
                usernameChange: "",
                passwordChange: "",
                oldPasswordChange: ""
            },
            showEditUser: false
        }

        this.submitEdit = this.submitEdit.bind(this);
        this.handleEditUser = this.handleEditUser.bind(this);
    }

    validateSignUpPassword(pass) {
        let regex = /^[1-z]{8,}$/g
        return regex.test(pass);
    }

    submitEdit(e) {
        e.preventDefault();
        axios.put(`${process.env.BACKEND_URL}/user/${this.props.match.params.userId}`, { user: this.state }).then(res => {
            window.location = `/#/profile/${this.props.match.params.userId}`
        });
    }


    async handleEditUser() {
        let hasError = false;
        if(this.state.input.passwordChange != "" && this.validateSignUpPassword(this.state.input.passwordChange)) {
            const resP = await axios.put(`${process.env.BACKEND_URL}/user/updatePass`, {
                newPassword: this.state.input.passwordChange,
                oldPassword: this.state.input.oldPasswordChange
            }).then(res => {
                if(res.data && res.status !== 401) {
                    this.props.dispatch({ type: 'STORE_USER', data: { User: { ...res.data } } });
                } else if(res.status === 401) {
                    console.error("That password is incorrect");
                }
            });
        } else {
            hasError = true;
            console.error("Invalid Password");
        }
        if(this.state.input.usernameChange != "") {
            const resU = await axios.put(`${process.env.BACKEND_URL}/user/updateUser`, {
                username: this.state.input.usernameChange
            }).then(res => {
                if(res.data && res.status !== 400) {
                    this.props.dispatch({ type: 'STORE_USER', data: { User: { ...res.data } } });
                }else if(res.status === 400) {
                    console.error("That username is taken");
                }
            });
        }
        if(!hasError) {
            window.location = `/#/profile/${this.props.match.params.userId}`;
        }
    }

    render() {
        console.log(this);
        return (
            <>
                {this.props.match.params.userId === this.props?.user?._id ? (
                <div style={{ margin: "0 auto", padding: "5%" }}>
                    <Card style={{ padding: "1.25rem" }}>
                        <Card.Title>Editing Your Profile</Card.Title>
                        <Card.Body>
                            <Accordion defaultActiveKey="1">
                                <Card style={{ padding: "1.25rem" }}>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        Edit Profile
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="1">
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control as="input" type="text" defaultValue={this.state.name} onChange={e => { this.setState({ name: e.target.value }) }} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control as="input" type="email" defaultValue={this.state.email} onChange={e => { this.setState({ email: e.target.value }) }} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Phone Number</Form.Label>
                                                <Form.Control as="input" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" defaultValue={this.state.phoneNum} onChange={e => { this.setState({ phoneNum: e.target.value }) }} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label>Bio</Form.Label>
                                                <Form.Control as="textarea" defaultValue={this.state.bio} onChange={e => { this.setState({ bio: e.target.value }) }} />
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Control as={Button} variant="primary" onClick={this.submitEdit} type="submit">Edit Profile</Form.Control>
                                            </Form.Group>
                                        </Form>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                            <Accordion>
                                <Card style={{ padding: "1.25rem" }}>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Edit Username & Password
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <>
                                            <Form>
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Username</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter username" defaultValue={this.state.input.usernameChange} onChange={e => { this.setState({ input: { ...this.state.input, usernameChange: e.target.value } }) }} />
                                                </Form.Group>

                                                <Form.Group controlId="formBasicPassword">
                                                    <Form.Label>Old Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Password" onChange={e => { this.setState({ input: { ...this.state.input, oldPasswordChange: e.target.value } }) }} />
                                                </Form.Group>

                                                <Form.Group controlId="formBasicPassword">
                                                    <Form.Label>New Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Password" onChange={e => { this.setState({ input: { ...this.state.input, passwordChange: e.target.value } }) }} />
                                                </Form.Group>
                                            </Form>
                                            <Button variant="info" onClick={this.handleEditUser}>Edit Username & Password</Button>
                                        </>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Card.Body>
                    </Card>
                </div>) : (<p>This isn't your profile.</p>)
                }
            </>
        );
    }
}

export default connect(state => ({ ...state }))(ProfileForm)