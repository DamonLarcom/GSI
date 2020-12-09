//@ts-check
import React from "react";
import axios from "axios";
import Post from "../components/Post";
import { connect } from "react-redux";

import { Button, Form, InputGroup, FormControl, ButtonGroup } from "react-bootstrap";


/**
 * @param {{ userid: String; }} props
 */

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = { value: '', results: [], currentUser: null };
        this.handleChange = this.handleChange.bind(this);
        this.handleUserSubmit = this.handleUserSubmit.bind(this);
        this.handleKeywordSubmit = this.handleKeywordSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ ...this.state, value: e.target.value });
    }

    async handleKeywordSubmit(e) {
        let searchParam = this.state?.value;
        const posts = await (await axios.put(`${process.env.BACKEND_URL}/search/keyword`, { searchText: this.state.value })).data;
        console.log(this.props.user);
        const user = await (await axios.get(`${process.env.BACKEND_URL}/user/${this.props.user?._id}`)).data;
        this.setState({ ...this.state, results: posts, currentUser: user });
    }

    async handleUserSubmit(e) {
        let searchParam = this.state?.value;
        const usersList = await (await axios.put(`${process.env.BACKEND_URL}/search/user`, { searchText: this.state.value })).data;
        this.setState({ ...this.state, results: usersList });
    }

    render() {
        if(this.props.user) {
            return (
                <Form style={{ margin: "5%" }}>
                    <InputGroup>
                        <FormControl type="text" placeholder="Search" onChange={this.handleChange} />
                        <InputGroup.Append>
                            <Button onClick={this.handleUserSubmit}>Search For Users</Button>
                            <Button onClick={this.handleKeywordSubmit}>Search For Posts</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    <ul>
                        {this.state.results.map((Object) => {
                            if (Object.hasOwnProperty('profile')) {
                                if (!Object.profile.blockedBy.includes(this.props.user?._id) && !Object.profile.blockedUsers.includes(this.props.user?._id)) {
                                    return <li key={Object._id}><a href={`/#/profile/${Object._id}/view`}>{Object.username}</a></li>
                                }
                            } else {
                                if (this.state.currentUser != null && !this.state.currentUser.profile.blockedBy.includes(Object.user) && !this.state.currentUser.profile.blockedUsers.includes(Object.user)) {
                                    return (<Post text={Object.text} userId={Object.user} username={Object.username} postId={Object._id} key={Object._id} />);
                                }
                            }
                        })}
                    </ul>
                </Form>
            );
        }
        else {
            this.props.dispatch({type: "TO_LOGIN"})
            return(<></>);
        }
    }
}

export default connect(state=>({ ...state }))(Search);