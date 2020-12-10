import React from "react";
import Post from "../components/Post";
import axios from "axios";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
        this.retrivePosts();

        axios.get(`${process.env.BACKEND_URL}/`).then(res => {
            if (res.data) {
                this.props.dispatch({ type: 'STORE_USER', data: { User: { ...res.data } } });
            } else {
                this.props.dispatch({type: "TO_LOGIN"})
            }
        })
    }

    async retrivePosts() {
        //followedPosts
        let data = await (await axios.get(`${process.env.BACKEND_URL}/post/followedPosts`)).data;
        console.log(data);
        this.setState({
            posts: data
        })
    }

    render() {
        return(
            <div className="home posts-wrapper">
                {this.state.posts.length > 0 ?
                    <>{this.state.posts.map(post => {
                        return(<Post {...post} text={post.text} userId={post.user} username={post.username} postId={post._id} key={post._id} />);
                    })}</>
                :
                    <p>Follow some people to get started!<br/> Just head over to the <a style={{color:"blue"}} href="/#/search">search</a> tab to begin!</p>
                }
            </div>
        );
    }
}

export default connect((state) => ({...state}))(Home)