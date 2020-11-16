import React from "react";

export const Home = (props) => {
    const fulluser = props.user.name + "" + props.user.password;
    return (
        <div>
            {true ? <p>Test1</p> : <p>Test2</p>}
            <p>Homepage {fulluser}</p>
            <button onClick={() =>{props.onTest()}}>Text</button>
        </div>
    )
}