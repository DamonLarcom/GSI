//@ts-check
import React from "react";
import axios from "axios";

import {Button, Form, InputGroup, FormControl} from "react-bootstrap";

export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: '', results: []};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({...this.state, value: e.target.value});
    }

    async handleSubmit(e) {
        let searchParam = this.state?.value;
        const posts = await (await axios.put(`${process.env.BACKEND_URL}/search/user`, {searchText: this.state.value})).data
        var usersList = posts; //get the list from the backend
        this.setState({...this.state, results: usersList});
    }

    render() {
        return(
            <Form style={{margin: "5%"}}>
                <InputGroup>
                    <FormControl type="text" placeholder="Search" onChange={this.handleChange}/>
                    <InputGroup.Append>
                        <Button onClick={this.handleSubmit}>Search</Button>
                    </InputGroup.Append>
                </InputGroup>
                <ul>
                    {this.state.results.map(function(User) {
                        return <li key={User._id}><a href={`/#/profile/${User._id}/view`}>{User.username}</a></li>
                    })}
                </ul>
            </Form>
        );
    }
}