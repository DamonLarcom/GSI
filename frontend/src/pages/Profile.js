import React from "react";

export const Profile = (props) => {
    var User = props.User;
    return (
        <div>
            <h1>{User.username} ({User.name})</h1>
            <p class="contact">Contact: <br />
                Email: {User.email} <br />
                Phone: {User.phoneNum} <br />
            </p>
            <p class="bio">{User.bio}</p>

            <p>{User.followedBy.length} Followers | {User.followedUsers.length} Following</p>

            <ul>
                {User.authoredPosts.map(post => (
                    <li key={post.postId}>
                        <p class="postUser">post.user</p>
                        <p class="postDate">post.date</p>
                        <p class="postText">post.text</p>
                        <p class="postLikes">post.likeCount</p>
                        <ul class="commentSection">
                            {post.comments.map(comment => (
                                <li class="comment">
                                    <strong class="commentAuthor">comment.commentAuthor</strong>
                                    <p class="commentDate">comment.commentDate</p>
                                    <p class="commentText">comment.commentText</p>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}