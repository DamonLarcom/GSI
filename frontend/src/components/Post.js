import axios from "axios";
import React from "react";
import { Button, Card, Accordion, FormControl, Form, ButtonGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import Comment from "./Comment";

/**
 * @param {{ username: String; text: String; postId: any }} props
 */
class Post extends React.Component {

    constructor(props) {
        super(props);
        this.deletePost = this.deletePost.bind(this);
        this.postComment = this.postComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);

        this.state = {
            commentInput: ""
        }
        if(this.props.details) {
            axios.get(`${process.env.BACKEND_URL}/post/${this.props.match.params.postId}`).then(res => {
                const post = res.data;
                this.setState({...post});
            });
        }
    }

    async deletePost () {
        console.log("Delete Post");
        const deleteStatus = (await axios.delete(`${process.env.BACKEND_URL}/post/${this.props.postId || this.state._id}`)).status
        if(deleteStatus === 200) {
            if(this?.props?.postDelete) {
                this.props?.postDeleted({...this.props});
            }
        }
        window.location = "/";
    }

    async deleteComment (id) {
        console.log("Delete Comment");
        await axios.patch(`${process.env.BACKEND_URL}/post/deleteCom/${this.props.postId || this.state._id}`, {commentToDelete: {_id: id}});
        window.location.reload();
    }

    async postComment () {
        await axios.patch(`${process.env.BACKEND_URL}/post/comment/${this.state._id}`, {commentText: this.state.commentInput});
        window.location.reload();
    }

    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>Posted by <NavLink to={`/profile/${this.state.user || this.props.userId}/view`}>{this.props.username||this.state.username}</NavLink></Card.Title>
                    <Card.Text>{this.props.text||this.state.text}</Card.Text>
                    {this.props?.details ? (
                        <>
                            <Accordion>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            Comments
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <>
                                            {this.state?.comments?.map(comment => {
                                                return(<Comment key={comment._id} username={comment.commentAuthorUsername} userId={comment.commentAuthor} commentId={comment._id} text={comment.commentText} onDelete={this.deleteComment}/>);
                                            })}
                                            {this.props?.user?._id ? (
                                                <Card>
                                                    <Card.Body>
                                                        <Card.Title>Create Comment</Card.Title>
                                                        <Form>
                                                            <FormControl as="textarea" placeholder="Comment" onChange={(e)=>{this.setState({...this.state, commentInput: e.target.value})}}/>
                                                            <Button onClick={this.postComment} style={{marginTop: "2%"}}>Post Comment</Button>
                                                        </Form>
                                                    </Card.Body>
                                                </Card>
                                            ): null}
                                        </>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                            {(this.props?.user?._id == this.state.user) ? (
                                <ButtonGroup>
                                    <Button variant="primary" as={NavLink} to={`/post/comment/${this.state._id}/edit`}>Edit</Button>
                                    <Button variant="danger" onClick={this.deletePost}>Delete</Button>
                                </ButtonGroup>
                            ): null}
                        </>
                    ): null}
                    {!this.props?.details ? <Button as={NavLink} to={`/post/${this.props.postId}`} variant="primary">Read More</Button>: null}
                </Card.Body>
            </Card>
        );
    }
}

export default connect(state=>({...state}))(Post);