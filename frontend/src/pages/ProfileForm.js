import axios from "axios";
import React from "react";
import { Accordion, Button, Card, Form, Modal, Alert } from "react-bootstrap";
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
            showEditUser: false,
            alertTextUser: "",
            alertTextPass: ""
        }

        this.submitEdit = this.submitEdit.bind(this);
        this.handleEditUser = this.handleEditUser.bind(this);
        this.showAlertInfo = this.showAlertInfo.bind(this);

        axios.get(`${process.env.BACKEND_URL}/`).then(res => {
            if (res.data) {
                this.props.dispatch({ type: 'STORE_USER', data: { User: { ...res.data } } });
            } else {
                this.props.dispatch({type: "TO_LOGIN"})
            }
        })
    }

    showAlertInfo() {
        let regex = /^[0-z]{8,}$/;
        if(this.state.input.passwordChange.length < 8) {
            this.setState({...this.state, alertTextPass: "Password too short"});
        }
        else if(!regex.test(this.state.input.passwordChange)) {
            this.setState({...this.state, alertTextPass: "Non-alphanumeric password."});
        } else {
            this.setState({...this.state, alertTextPass: ""});
            return true;
        }
        return false;
    }

    validateSignUpPassword(pass) {
        let regex = /^[0-z]{8,}$/g
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
        if(this.state.input.passwordChange.length === 0) {
            try {
                const res = await axios.put(`${process.env.BACKEND_URL}/user/updateUser`, { username: this.state.input.usernameChange })
                
                if(res.data && res.status !== 400) {
                    this.props.dispatch({ type: 'STORE_USER', data: { User: { ...res.data } } });
                }
                else if(res.status === 400) {
                    hasError = true;
                    this.setState({...this.state, alertTextUser: "That username is taken."});
                }
            }
            catch(err) {
                hasError = true;
                this.setState({...this.state, alertTextUser: "That username is taken."});
            }
        }
        
        else if(this.showAlertInfo() && this.state.input.passwordChange != "" && this.validateSignUpPassword(this.state.input.passwordChange)) {
            try {
                const resP = await axios.put(`${process.env.BACKEND_URL}/user/updatePass`, {
                    newPassword: this.state.input.passwordChange,
                    oldPassword: this.state.input.oldPasswordChange
                })
                if(resP.data && resP.status !== 401) {
                    this.props.dispatch({ type: 'STORE_USER', data: { User: { ...resP.data } } });
                } else if(resP.status === 401) {
                    this.setState({...this.state, alertTextPass: "Password Incorrect"});
                }
            } catch(err) {
                hasError = true;
                this.setState({...this.state, alertTextPass: "Password Incorrect"});
            }
        } else {
            hasError = true;
            this.setState({...this.state, alertTextPass: "Password Incorrect"});
        }
        if(!hasError) {
            window.location = `/#/profile/${this.props.match.params.userId}`;
        }
    }

    render() {
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
                                        Edit Username
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <>
                                            <Form>
                                            { this.state.alertTextUser != "" ? <Alert variant="danger">{this.state.alertTextUser}</Alert>:null}
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Username</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter username" defaultValue={this.state.input.usernameChange} onChange={e => { this.setState({ input: { ...this.state.input, usernameChange: e.target.value } }) }} />
                                                </Form.Group>
                                            </Form>
                                            <Button variant="info" onClick={this.handleEditUser}>Edit Username</Button>
                                        </>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                            <Accordion>
                                <Card style={{ padding: "1.25rem" }}>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        Edit Password
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <>
                                            <Form>
                                            { this.state.alertTextPass != "" ? <Alert variant="danger">{this.state.alertTextPass}</Alert>:null}
                                                <Form.Group controlId="formBasicPassword">
                                                    <Form.Label>Old Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Password" onChange={e => { this.setState({ input: { ...this.state.input, oldPasswordChange: e.target.value } }) }} />
                                                </Form.Group>

                                                <Form.Group controlId="formBasicPassword">
                                                    <Form.Label>New Password</Form.Label>
                                                    <Form.Control type="password" placeholder="Password" onChange={e => { this.setState({ input: { ...this.state.input, passwordChange: e.target.value } }) }} />
                                                </Form.Group>
                                            </Form>
                                            <Button variant="info" onClick={this.handleEditUser}>Edit Password</Button>
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