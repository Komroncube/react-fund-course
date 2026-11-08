import React, { useState, useRef, useMemo, useEffect } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import { usePosts } from "./hooks/usePosts";
import { useFetching } from "./hooks/useFetching";
import PostService from "./API/PostService";
import axios from "axios";
import Loader from "./components/UI/Loader/Loader";
import getPageCount from "./utils/pages";
import { usePagination } from "./utils/pages";


function App() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: "", query: "" });
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [fetchPosts, isPostsLoading, postError] = useFetching(async (page, limit) => {
        const response = await PostService.getAll(limit, page);
        const totalCount = response.headers["x-total-count"];
        setPosts(response.data);
        setTotalPages(getPageCount(totalCount, limit));
    });

    const pagesArray = usePagination(totalPages);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    };

    useEffect(() => {
        fetchPosts(page, limit);
    }, [page, limit]);

    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };

    return (
        <div className="App">
            <button onClick={() => fetchPosts(page, limit)}>Get posts</button>
            <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
                Create post
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{ margin: "15px 0" }} />
            <PostFilter filter={filter} setFilter={setFilter} />
            {postError && <h1>Error ${postError}</h1>}
            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><Loader /></div> 
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Posts about JS" />}
            <div className="page__wrapper">
                {pagesArray.map(p =>
                    <span
                        onClick={() => setPage(p)}
                        key={p}
                        className={page === p ? 'page page__current' : 'page'}
                    >
                        {p}
                    </span>
                )}
            </div>
        </div>
    );
}

export default App;
