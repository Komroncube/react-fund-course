import React, { useState, useRef } from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import "./styles/App.css";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: 'Javascript', body: 'Description' },
        { id: 2, title: 'Python', body: 'Description' },
        { id: 3, title: 'Java', body: 'Description' }
    ]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const [selectedSort, setSelectedSort] = useState('');
    const sortPosts = (sort) => {
        setSelectedSort(sort);
    }

    const [searchQuery, setSearchQuery] = useState('');
    function getSortedPosts() {
        console.log("hello")
        if (selectedSort) {
            return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
        }
        return posts;
    }

    const sortedPosts = getSortedPosts();
    
    return (
        <div className="App">
            <PostForm create={createPost} />
            <hr style={{margin: '15px 0'}} />
            <MyInput 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search..."
            />
            <MySelect
                value={selectedSort}
                onChange={sort => sortPosts(sort)}
                defaultValue="Sort by"
                options={[
                    {value: 'title', name: 'By name'},
                    {value: 'body', name: 'By description'}
                ]}
            />
            {
                posts.length
                    ? <PostList remove={removePost} posts={sortedPosts} title="Posts about JS" />
                    : <h1 style={{textAlign: 'center'}}>No posts</h1>
            }
        </div>
    );
}

export default App;
