import React from "react";

export default class PostForm extends React.Component {
  render() {
    return(
        <div>
            {true ?
            <div>
                <h1>Create a Post</h1>
                 <form>
                    <textarea placeholder="Share your thoughts..."></textarea>
                    <input type="submit" value="Create Post"></input>
                 </form>
            </div>
            :
            <div>
                <h1>Edit Post</h1>
                <form>
                    <textarea placeholder="Enter some new post text..."></textarea>
                    <input type="submit" value="Edit Post"></input>
                </form>
            </div>}
        </div>
    );
  }
}