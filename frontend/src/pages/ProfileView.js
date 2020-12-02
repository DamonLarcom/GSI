import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";

class ProfileView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(<Profile {...this.props}/>);
    }
}
export default connect(state=>({ ...state }))(ProfileView);