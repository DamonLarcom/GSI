//@ts-check
import React from "react";
import Post from "../components/Post";
import ObjectId from "bson-objectid"
import axios from "axios";

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
        this.retrivePosts();
    }

    async retrivePosts() {
        let data = await (await axios.get(`${process.env.BACKEND_URL}/post`)).data;
        console.log(data);
        this.setState({
            posts: data
        })
    }

    render() {
        return(
            <div className="home posts-wrapper">
                {this.state.posts.map(post => {
                    return(<Post text={post.text} username={post.user} userId={post._id} key={post._id}/>);
                })}
            </div>
        );
    }
}