//@ts-check
import axios from "axios"
import React from "react"
import { Button, Card } from "react-bootstrap"
import { connect } from "react-redux";

/**
 * @param {{ username: String; text: String; postId: any }} props
 */
class Post extends React.Component {

    constructor(props) {
        super(props);
        this.deletePost = this.deletePost.bind(this);
    }

    async deletePost () {
        console.log("Delete Post");
        const deleteStatus = (await axios.delete(`${process.env.BACKEND_URL}/post/${this.props.postId}`)).status
        if(deleteStatus === 200) {
            // Probably not the best way to do it, but for what we're doing it should be fine
            this.props?.postDeleted({...this.props});
        }
    }

    render() {
        return (
            <Card>
                {console.log(this.props)}
                <Card.Body>
                    <Card.Title>Posted by {this.props.username}</Card.Title>
                    <Card.Text>{this.props.text}</Card.Text>
                    {this.props?.user?._id == this.props.userId?<Button variant="danger" onClick={this.deletePost}>Delete</Button>:null}
                </Card.Body>
            </Card>
        );
    }
}

export default connect(state=>({...state}))(Post);