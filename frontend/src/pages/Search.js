//@ts-check
import React from "react";
import axios from "axios";

export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {value: '', results: []};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value, results: {...this.state.results}});
    }

    handleSubmit(event) {
        var username = this.state.value;
        var usersList = []; //get the list from the backend
        this.setState({value: event.target.value, results: usersList});
        event.preventDefault();
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                <input type="submit" value="Search"/>
                <br/>
                <br/>
                <ul>
                    {this.state.results.map(function(User) {
                        return <li><a href="/#/profile/${id}">User.username</a></li>
                    })}
                </ul>
            </form>
        );
    }
}