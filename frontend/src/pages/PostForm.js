import axios from "axios";
import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { connect } from "react-redux";

class PostForm extends React.Component {

    constructor(props) {
        super(props)
        this.createPost = this.createPost.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            text: "",
            user: "Test User"
        };
    }

    handleChange(e) {
        this.setState({text: e.target.value})
    }

    createPost(e) {
        e.preventDefault();
        axios.post(`${process.env.BACKEND_URL}/post`, {user: this.props.data.user, text: this.state.text})
        location.href="#/"
        return false;
    }

    render() {
        return (
            <div style={{ padding: "5%" }}>
                {!this.props.edit ?
                    <Card style={{ padding: "2%" }}>
                        <Card.Title>
                            <h1>Create a Post</h1>
                        </Card.Title>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="text">
                                    <Form.Label>Post</Form.Label>
                                    <Form.Control as="textarea" placeholder="Share your thoughts..." value={this.state.text} onChange={this.handleChange}></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control as={Button} variant="primary" type="submit" onClick={this.createPost}>Create Post</Form.Control>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                    :
                    <Card style={{ padding: "2%" }}>
                        <Card.Title>
                            <h1>Edit Post</h1>
                        </Card.Title>
                        <Card.Body>
                                <Form.Group>
                                    <Form.Label>Post</Form.Label>
                                    <Form.Control as="textarea" placeholder="Edit your thoughts..."></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control as="input" type="submit" value="Edit Post" onSubmit={this.createPost}></Form.Control>
                                </Form.Group>
                        </Card.Body>
                    </Card>}
            </div>
        );
    }
}

export default connect((state) => ({...state}))(PostForm)