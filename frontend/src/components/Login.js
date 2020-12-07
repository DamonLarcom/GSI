import QueryString from "querystring";

import React from "react";
import { connect } from "react-redux";

import { Button, Modal, Nav, Form, Alert } from "react-bootstrap";
import axios from "axios";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            hasError: false,
            errorMessage: "",
            input: {
                username: '',
                password: ''
            }
        }

        
        this.handleLogin = this.handleLogin.bind(this);
    }

    async handleLogin() {
        try {
            const data = await (await axios.post(`${process.env.BACKEND_URL}/login`, QueryString.stringify({ ...this.state.input }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })).data;
            this.props.dispatch({ type: 'STORE_USER', data: { User: data } });
            this.setState({ show: false });
            location.reload();
        } catch (error) {
            console.error("Login error", error);
            console.log(error.response);
            if(error.response.status === 400) {
                this.setState({ show: true, hasError: true, errorMessage: "Invalid Login"})
            }
            else if(error.response.status === 401) {
                this.setState({ show: true, hasError: true, errorMessage: "Invalid Username or Password"});
            }
        }
    }

    render() {
        return (
            <>
                <Nav.Item>
                    <Nav.Link onClick={() => { this.setState({ show: true }) }}>Login</Nav.Link>
                </Nav.Item>

                <Modal show={this.state.show} onHide={() => { this.setState({ show: false }) }} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Alert variant="danger" show={this.state.hasError} style={{marginBottom: "0", borderRadius: "0"}}>{this.state.errorMessage}</Alert>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="email" placeholder="Enter username" onChange={e => { this.setState({ input: { ...this.state.input, username: e.target.value } }) }} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={e => { this.setState({ input: { ...this.state.input, password: e.target.value } }) }} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { this.setState({ show: false }) }}>Close</Button>
                        <Button variant="primary" onClick={this.handleLogin}>Login</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default connect((state) => ({ ...state }))(Login);