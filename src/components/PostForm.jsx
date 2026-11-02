import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { useState } from "react";

const PostForm = ({create}) => {
    const [post, setPost] = useState({ title: '', body: '' });
    
    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost);
        setPost({ title: '', body: '' });
    }
    
    return ( 
        <form>
            {/* Managed component */}
            <MyInput value={post.title} onChange={e => setPost({...post, title: e.target.value})} type="text" placeholder="Post title" />
            {/* <input ref={bodyInputRef} type="text" placeholder="Post description" /> */}
            <MyInput value={post.body} onChange={e => setPost({...post, body: e.target.value})} type="text" placeholder="Post description" />
            <MyButton onClick={addNewPost}>Add post</MyButton>
        </form>
     );
}
 
export default PostForm;