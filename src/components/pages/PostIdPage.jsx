import { useParams } from "react-router";
import { useFetching } from "../../hooks/useFetching";
import PostService from "../../API/PostService";
import { useEffect, useState } from "react";
import Loader from "../UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    });

    useEffect(() => {
        fetchPostById(params.id);
    }, []);
    return (
        <div>
            <h1>You opened {params.id}</h1>
            {isLoading ? (
                <Loader />
            ) : (
                <p>
                    {post.id}. {post.title}
                </p>
            )}
        </div>
    );
};

export default PostIdPage;
