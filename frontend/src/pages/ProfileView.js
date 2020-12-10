import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import axios from "axios";


class ProfileView extends React.Component {
    constructor(props) {
        super(props);

        axios.get(`${process.env.BACKEND_URL}/`).then(res => {
            if (res.data) {
                this.props.dispatch({ type: 'STORE_USER', data: { User: { ...res.data } } });
            } else {
                this.props.dispatch({type: "TO_LOGIN"})
            }
        })
    }
    render() {
        return(<Profile {...this.props}/>);
    }
}
export default connect(state=>({ ...state }))(ProfileView);