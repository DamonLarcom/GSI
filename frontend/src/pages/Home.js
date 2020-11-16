import React from "react";

export const Home = (props) => {
    const fullUser = props.user.name + ":" + props.user.password;

    return(
        <div>
            {true ? <p>This is </p> : <p>Not Here</p>}
            <p>Hello Home{props.title}{fullUser}</p>
            <button onClick={() => {props.onTest()}}>Test</button>
        </div>
    );
}