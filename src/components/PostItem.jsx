import React from "react";
import MyButton from "./UI/button/MyButton";
import { useNavigate } from "react-router"

const PostItem = function (props) {
    const navigate = useNavigate();
    console.log(navigate)
    return (
        <div className="post">
            <div className="post__content">
                <strong>
                    {props.post.id} {props.post.title}
                </strong>
                <div>{props.post.body}</div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => navigate(`/posts/${props.post.id}`)}>
                    Open
                </MyButton>
                <MyButton onClick={() => props.remove(props.post)}>
                    Delete
                </MyButton>
            </div>
        </div>
    );
};

export default PostItem;
