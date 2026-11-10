import { useRoutes } from "react-router";
import { privateRoutes, publicRoutes } from "../router";
import { useContext } from "react";
import { AuthContext } from "../context";
import Loader from "./UI/Loader/Loader";
const AppRouter = () => {
    const { isAuth, setIsAuth, isLoading } = useContext(AuthContext);
    const routes = useRoutes(isAuth ? privateRoutes : publicRoutes);

    if (isLoading) {
        return <Loader />;
    }
    return routes;
};

export default AppRouter;
