import { Link } from "react-router";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar__links">
                <Link to="posts">posts</Link>
                <Link to="about">about</Link>
            </div>
        </div>
    );
};

export default Navbar;
