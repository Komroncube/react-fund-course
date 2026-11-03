import React, { useRef } from "react";
import PostItem from "./PostItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const PostList = ({ posts, title, remove }) => {
    const nodeRefs = useRef(new Map());

    if (!posts.length) {
        return <h1 style={{ textAlign: "center" }}>No posts</h1>;
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>{title}</h1>
            <TransitionGroup>
                {posts.map((post, index) => {
                    if (!nodeRefs.current.has(post.id)) {
                        nodeRefs.current.set(post.id, React.createRef());
                    }

                    const nodeRef = nodeRefs.current.get(post.id);

                    return (
                        <CSSTransition
                            key={post.id}
                            nodeRef={nodeRef}
                            timeout={500}
                            classNames="post"
                        >
                            <div ref={nodeRef}>
                                <PostItem
                                    ref={nodeRef}
                                    remove={remove}
                                    number={index + 1}
                                    post={post}
                                />
                            </div>
                        </CSSTransition>
                    );
                })}
            </TransitionGroup>
        </div>
    );
};

export default PostList;
