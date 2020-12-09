import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";

class ProfileView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // if(this.props.user) {
            return(<Profile {...this.props}/>);
        // }
        // else {
        //     this.props.dispatch({type: "TO_LOGIN"})
        //     return(<></>);
        // }
    }
}
export default connect(state=>({ ...state }))(ProfileView);