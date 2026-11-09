import { useState, useEffect } from "react";
import PostService from "../../API/PostService";
import { useFetching } from "../../hooks/useFetching";
import { usePosts } from "../../hooks/usePosts";
import getPageCount from "../../utils/pages";
import PostFilter from "../PostFilter";
import PostForm from "../PostForm";
import PostList from "../PostList";
import MyButton from "../UI/button/MyButton";
import MyModal from "../UI/modal/MyModal";
import Loader from "../UI/Loader/Loader";
import Pagination from "../UI/pagination/Pagination";


function Posts() {
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
            <Pagination totalPages={totalPages} page={page} changePage={setPage} />
        </div>
    );
}

export default Posts;
