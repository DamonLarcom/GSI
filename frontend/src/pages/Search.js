//@ts-check
import React from "react";
import axios from "axios";
import Post from "../components/Post";

import {Button, Form, InputGroup, FormControl, ButtonGroup} from "react-bootstrap";

export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: '', results: []};
        this.handleChange = this.handleChange.bind(this);
        this.handleUserSubmit = this.handleUserSubmit.bind(this);
        this.handleKeywordSubmit = this.handleKeywordSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({...this.state, value: e.target.value});
    }

    async handleKeywordSubmit(e) {
        let searchParam = this.state?.value;
        const posts = await (await axios.put(`${process.env.BACKEND_URL}/search/keyword`, {searchText: this.state.value})).data;
        this.setState({...this.state, results: posts});
    }

    async handleUserSubmit(e) {
        let searchParam = this.state?.value;
        const usersList = await (await axios.put(`${process.env.BACKEND_URL}/search/user`, {searchText: this.state.value})).data;
        this.setState({...this.state, results: usersList});
    }

    render() {
        return(
            <Form style={{margin: "5%"}}>
                <InputGroup>
                    <FormControl type="text" placeholder="Search" onChange={this.handleChange}/>
                    <InputGroup.Append>
                            <Button onClick={this.handleUserSubmit}>Search For Users</Button>
                            <Button onClick={this.handleKeywordSubmit}>Search For Posts</Button>
                    </InputGroup.Append>
                </InputGroup>
                <ul>
                    {this.state.results.map(function(Object) {
                        if(Object.hasOwnProperty('profile')) {
                            return <li key={Object._id}><a href={`/#/profile/${Object._id}/view`}>{Object.username}</a></li>
                        } else {
                            return(<Post text={Object.text} userId={Object.user} username={Object.username} postId={Object._id} key={Object._id}/>);
                        }
                    })} 
                </ul>
            </Form>
        );
    }
}