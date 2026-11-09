import { Routes, Route } from "react-router";
import Posts from "./pages/Posts";
import About from "./pages/About";
import ErrorPage from "./pages/Error";
import PostIdPage from "./pages/PostIdPage";
const AppRouter = () => {
    return ( 
        <Routes>
            <Route path="posts">
                <Route index element={<Posts />} />
                <Route path=":id" element={<PostIdPage />}/>
            </Route>
            <Route path="about" element={<About />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}
 
export default AppRouter;