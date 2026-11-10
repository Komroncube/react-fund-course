import { Link } from "react-router";
import MyButton from "../button/MyButton";
import { useContext } from "react";
import { AuthContext } from "../../../context";

const Navbar = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem("auth");
    };
    return (
        <div className="navbar">
            <MyButton onClick={logout}>Log out</MyButton>
            <div className="navbar__links">
                <Link to="posts">posts</Link>
                <Link to="about">about</Link>
            </div>
        </div>
    );
};

export default Navbar;
