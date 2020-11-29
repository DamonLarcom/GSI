import axios from "axios";
import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";
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

        this.getProfile();
    }
    
    getProfile() {
        axios.get(`${process.env.BACKEND_URL}/user/${this.props.match.params.userId}`)
        .then(res => {
            this.setState({user:{...this.state.user, ...res.data.profile, authoredPosts: res.data.authoredPosts, username: res.data.username}});
            this.getPosts();
        });
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
            <Card style={{margin: "2em", padding: "2em"}}>
                <Card.Title>{this.state.user.username} ({this.state.user.name})<NavLink to={`/profile/${this.props.match.params.userId}/edit`}>Edit</NavLink></Card.Title>
                    <Card.Body>
                        <Card.Text>Email: {this.state.user.email}</Card.Text>
                        <Card.Text>Phone: {this.state.user.phoneNum}</Card.Text>
                        <Card.Text>{this.state.user.bio}</Card.Text>
                        <Card.Text>{this.state.user.followedBy.length} Followers | {this.state.user.followedUsers.length} Following</Card.Text>
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
        );
    }
}