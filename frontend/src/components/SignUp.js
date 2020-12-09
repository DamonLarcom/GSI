import React from "react";
import { connect } from "react-redux";

import { Button, Modal, Nav, Form, Alert } from "react-bootstrap";
import axios from "axios";

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            input: {
                username: '',
                password: ''
            },
            alertText: ""
        }

        this.handleSignup = this.handleSignup.bind(this);
        this.showAlertInfo = this.showAlertInfo.bind(this);
    }

    validateSignUpPassword(pass) {
        let regex = /^[1-z]{8,}$/
        return regex.test(pass);
    }

    showAlertInfo() {
        let regex = /^[1-z]{8,}$/;
        if(this.state.input.password.length < 8) {
            this.setState({...this.state, alertText: "Password too short"});
        }
        else if(!regex.test(this.state.input.password)) {
            this.setState({...this.state, alertText: "Non-alphanumeric password."});
        } else {
            this.setState({...this.state, alertText: ""});
            return true;
        }
        return false;
    }

    async handleSignup() {
        try {
            if(!/^[1-z]+$/.test(this.state.input.username)) {
                this.setState({...this.state, alertText: "Invalid Username"});
            }
            else if(this.showAlertInfo() && this.validateSignUpPassword(this.state.input.password)) {
                const data = await (await axios.post(`${process.env.BACKEND_URL}/signup`, {...this.state.input})).data;
                this.props.dispatch({type: 'STORE_USER', data: { User: data }});
                this.setState({ show: false });
                location.href ="/#/";
            } else {
                console.error("Invalid Password");
            }
        } catch (error) {
            console.log("Sign Up error", error);
            this.setState({...this.state, alertText: "Username taken or invalid"});
            this.setState({ show: true})
        }
    }

    render() {
        return (
            <>
                <Nav.Item>
                    <Nav.Link onClick={() => { this.setState({ show: true }) }}>Sign Up</Nav.Link>
                </Nav.Item>

                <Modal show={this.state.show} onHide={() => { this.setState({ show: false }) }} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign Up</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        { this.state.alertText != "" ? <Alert variant="danger">{this.state.alertText}</Alert>:null}
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username(Aphanumeric & Underscores)</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" onChange={e => {this.setState({input: {...this.state.input, username: e.target.value}})}}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password(Alphanumeric & 8 characters minimum)</Form.Label>
                                <Form.Control type="password" minLength={8} placeholder="Password" onChange={e => {this.setState({input: {...this.state.input, password: e.target.value}});}}/>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { this.setState({ show: false }) }}>Close</Button>
                        <Button variant="primary" onClick={this.handleSignup}>Sign Up</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default connect((state) => ({ ...state }))(SignUp);