import Posts from "../components/pages/Posts";
import PostIdPage from "../components/pages/PostIdPage";
import About from "../components/pages/About";
import Login from "../components/pages/Login";
import { Navigate } from "react-router";

export const privateRoutes = [
    {
        path: "posts",
        children: [
            { index: true, element: <Posts /> },
            { path: ":id", element: <PostIdPage /> },
        ],
    },
    {
        path: "about",
        element: <About />,
    },
    {
        path: "*",
        element: <Navigate to="/posts" replace />,
    },
];

export const publicRoutes = [
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "*",
        element: <Navigate to="/login" replace />,
    },
];
