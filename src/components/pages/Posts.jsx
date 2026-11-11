import { useState, useEffect, useRef } from "react";
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
import { useObserver } from "../../hooks/useObserver";
import MySelect from "../UI/select/MySelect";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: "", query: "" });
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef();

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [fetchPosts, isPostsLoading, postError] = useFetching(
        async (page, limit) => {
            const response = await PostService.getAll(limit, page);
            const totalCount = response.headers["x-total-count"];
            setPosts(prevPosts => [...prevPosts, ...response.data]);
            setTotalPages(getPageCount(totalCount, limit));
        },
    );
    
    useObserver(lastElement, page<totalPages, isPostsLoading, () => setPage(page+1))
    
    useEffect(() => {
        fetchPosts(page, limit);
    }, [page, limit]);
    
    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    };

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
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Element count on page"
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Show all'}
                ]}
            />
            {postError && <h1>Error ${postError}</h1>}
            <PostList
                remove={removePost}
                posts={sortedAndSearchedPosts}
                title="Posts about JS"
            />
            <div ref={lastElement} style={{height: 20, background: 'red'}}></div>
            {isPostsLoading && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "50px",
                    }}
                >
                    <Loader />
                </div>
            )}
            <Pagination
                totalPages={totalPages}
                page={page}
                changePage={setPage}
            />
        </div>
    );
}

export default Posts;
