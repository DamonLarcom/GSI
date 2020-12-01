import React from "react";
import Post from "../components/Post";
import ObjectId from "bson-objectid"
import axios from "axios";
import { connect } from "react-redux";

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
        this.retrivePosts();
    }

    async retrivePosts() {
        let data = await (await axios.get(`${process.env.BACKEND_URL}/post/followedPosts`)).data;
        console.log(data);
        this.setState({
            posts: data
        })
    }

    render() {
        return(
            <div className="home posts-wrapper">
                {this.state.posts.map(post => {
                    return(<Post text={post.text} username={post.user} postId={post._id} key={post._id}/>);
                })}
            </div>
        );
    }
}

export default connect((state) => ({...state}))(Home)