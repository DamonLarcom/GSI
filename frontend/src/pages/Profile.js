import axios from "axios";
import React from "react";
import { Accordion, Card, Button, Modal, ButtonGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Post from "../components/Post";

class Profile extends React.Component {
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
            this.forceUpdate();
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
                    <Card.Title>{this.state.user.username} {this.state.user.name ? "(" + this.state.user.name + ")": null }</Card.Title>
                        <Card.Body>
                            {this.props.user?.email ? <Card.Text>Email: {this.state.user.email}</Card.Text>:null}
                            {this.props.user?.phoneNum ? <Card.Text>Phone: {this.state.user.phoneNum}</Card.Text>:null}
                            <Card.Text>{this.state.user.followedBy.length} Followers | {this.state.user.followedUsers.length} Following</Card.Text>
                            <Card.Text>{this.state.user.bio}</Card.Text>
                            <ButtonGroup>
                                {this.props?.user?._id == this.props.match.params.userId ? <Button variant="secondary" as={NavLink} to={`/profile/${this.props.match.params.userId}/edit`}>Edit Profile</Button> : null}
                                {this.props?.user?._id == this.props.match.params.userId ? <Button variant="secondary" as={NavLink} to={`/profile/${this.props.match.params.userId}/blocked`}>Blocked Users</Button>: null}
                                {this.props?.user?._id == this.props.match.params.userId ? <Button variant="danger" onClick={() => { this.setState({ show: true }) }}>Delete Profile</Button>: null}    
                            </ButtonGroup>
                            
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

export default connect(state=>({ ...state }))(Profile);