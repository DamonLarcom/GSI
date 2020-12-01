//@ts-check
import React from "react";
import axios from "axios";

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
        console.log(this.state);
        let searchParam = this.state.value;
        const posts = await (await axios.put(`${process.env.BACKEND_URL}/search/user`, {searchText: this.state.value})).data
        var usersList = posts; //get the list from the backend
        this.setState({...this.state, results: usersList});
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleChange}/>
                <input type="submit" value="Search"/>
                <br/>
                <br/>
                <ul>
                    {this.state.results.map(function(User) {
                        return <li key={User._id}><a href={`/#/profile/${User._id}`}>{User.username}</a></li>
                    })}
                </ul>
            </form>
        );
    }
}