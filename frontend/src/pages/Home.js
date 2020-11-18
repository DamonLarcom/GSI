//@ts-check
import React from "react";
import Post from "../components/Post";
import ObjectId from "bson-objectid"

/**
 * @param {{ user: { name: string; password: string; }; title: React.ReactNode; onTest: () => void; }} props
 */

const Home = (props) => {
    const fullUser = props.user.name + ":" + props.user.password;

    return(
        <div>
            {true ? <p>This is </p> : <p>Not Here</p>}
            <p>Hello Home{props.title}{fullUser}</p>
            <button onClick={() => {props.onTest()}}>Test</button>
            <Post text="Something" username="Carter" userId={new ObjectId()}/>
        </div>
    );
}

export default Home;