import React, { useState, useRef, useMemo } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import "./styles/App.css";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: "Javascript", body: "Description" },
        { id: 2, title: "Python", body: "Description" },
        { id: 3, title: "Java", body: "Description" },
    ]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    };
    const [modal, setModal] = useState(false);

    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };

    const [filter, setFilter] = useState({ sort: "", query: "" });
    const sortedPosts = useMemo(() => {
        if (filter.sort) {
            return [...posts].sort((a, b) =>
                a[filter.sort].localeCompare(b[filter.sort]),
            );
        }
        return posts;
    }, [filter.sort, posts]);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter((post) =>
            post.title.toLowerCase().includes(filter.query.toLowerCase()),
        );
    }, [filter.query, sortedPosts]);

    return (
        <div className="App">
            <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
                Create post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{ margin: "15px 0" }} />
            <PostFilter filter={filter} setFilter={setFilter} />
            <PostList
                remove={removePost}
                posts={sortedAndSearchedPosts}
                title="Posts about JS"
            />
        </div>
    );
}

export default App;
