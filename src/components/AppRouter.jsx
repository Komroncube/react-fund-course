import { Routes, Route } from "react-router";
import Posts from "./pages/Posts";
import About from "./pages/About";
import ErrorPage from "./pages/Error";
const AppRouter = () => {
    return ( 
        <Routes>
            <Route path="posts" element={<Posts />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}
 
export default AppRouter;