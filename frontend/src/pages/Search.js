//@ts-check
import React from "react";
import axios from "axios";

export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }



    render() {
        return(
            <div>
                <input onChange={(event) => {
                        document.getElementById("searchResults").innerText=event.target.value;
                    }} 
                    id="searchBar" placeholder="Search" name="searchText"
                />
                <br/>
                <br/>
                <p id="searchResults"/>
            </div>
        );
    }
}