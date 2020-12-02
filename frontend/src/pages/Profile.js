import axios from "axios";
import React from "react";
import { Accordion, Card, Button, Modal } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Post from "../components/Post";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.getPosts = this.getPosts.bind(this);
        this.getProfile = this.getProfile.bind(this);

        this.state = {
            user: {
                username: "",
                name: "",
                email: "",
                phoneNum: "",
                bio: "",
                followedBy: [],
                followedUsers: [],
                authoredPosts: [],
                posts: []
            }
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.getProfile();
    }
    
    getProfile() {
        axios.get(`${process.env.BACKEND_URL}/user/${this.props.match.params.userId}`)
        .then(res => {
            this.setState({user:{...this.state.user, ...res.data.profile, authoredPosts: res.data.authoredPosts, username: res.data.username}});
            this.getPosts();
        });
    }

    async handleDelete() {
        try {
            const data = await axios.delete(`${process.env.BACKEND_URL}/user/${this.props.match.params.userId}`, {...this.state.input});
            this.setState({ show: false });
            window.location = "/"
        } catch (error) {
            console.log("Delete error", error);
            this.setState({ show: true})
        }
    }
    
    getPosts() {
        let collection = [];

        this.state.user.authoredPosts.forEach(postId => {
            axios.get(`${process.env.BACKEND_URL}/post/${postId}`)
            .then(res => {
                collection.push(res.data);
                this.forceUpdate();
            })
        });

        this.setState({user: {...this.state.user, posts: collection}})
    }

    render() {
        return(
            <>
            <Modal show={this.state.show} onHide={() => { this.setState({ show: false }) }} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { this.setState({ show: false }) }}>Close</Button>
                        <Button variant="danger" onClick={this.handleDelete}>Delete</Button>
                    </Modal.Footer>
                </Modal>

                <Card style={{margin: "2em", padding: "2em"}}>
                    <Card.Title>{this.state.user.username} ({this.state.user.name})</Card.Title>
                        <Card.Body>
                            <NavLink to={`/profile/${this.props.match.params.userId}/edit`}>Edit</NavLink>
                            <Card.Text>Email: {this.state.user.email}</Card.Text>
                            <Card.Text>Phone: {this.state.user.phoneNum}</Card.Text>
                            <Card.Text>{this.state.user.bio}</Card.Text>
                            <Card.Text>{this.state.user.followedBy.length} Followers | {this.state.user.followedUsers.length} Following</Card.Text>
                            <Button variant="danger" onClick={() => { this.setState({ show: true }) }}>Delete</Button>
                            <NavLink to={`/profile/${this.props.match.params.userId}/blocked`}>Blocked Users</NavLink>
                            <Accordion>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            Posts
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <>
                                        {
                                            this.state.user.posts.map(post => {
                                                return(<Post key={post._id} username={post.user} text={post.text} postId={post._id}/>);
                                            })
                                        }
                                        </>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Card.Body>
                </Card>
            </>
        );
    }
}