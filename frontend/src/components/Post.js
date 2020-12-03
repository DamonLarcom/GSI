import axios from "axios"
import React from "react"
import { Button, Card } from "react-bootstrap"
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

/**
 * @param {{ username: String; text: String; postId: any }} props
 */
class Post extends React.Component {

    constructor(props) {
        super(props);
        this.deletePost = this.deletePost.bind(this);
        this.state = {

        }
        if(this.props.details) {
            axios.get(`${process.env.BACKEND_URL}/post/${this.props.match.params.postId}`).then(res => {
                const post = res.data;
                this.setState({...post});
                console.log(this.state);;
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

    render() {
        return (
            <Card>
                {console.log(this.state)}
                <Card.Body>
                    <Card.Title>Posted by {this.props.username||this.state.username}</Card.Title>
                    <Card.Text>{this.props.text||this.state.text}</Card.Text>
                    {(this.props?.user?._id == this.state.user) && this.props?.details ?<Button variant="danger" onClick={this.deletePost}>Delete</Button>:null}
                    {!this.props?.details ? <Button as={NavLink} to={`/post/${this.props.postId}`} variant="primary">Read More</Button>: null}
                </Card.Body>
            </Card>
        );
    }
}

export default connect(state=>({...state}))(Post);