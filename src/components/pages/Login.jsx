import { useContext } from "react";
import MyButton from "../UI/button/MyButton";
import MyInput from "../UI/input/MyInput";
import { AuthContext } from "../../context";

const Login = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);
    const login = (event) => {
        event.preventDefault();
        localStorage.setItem("auth", "true");
        setIsAuth(true);
    };
    return (
        <div>
            <h1>Login page</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Input login" />
                <MyInput type="text" placeholder="Input password" />
                <MyButton>Enter</MyButton>
            </form>
        </div>
    );
};

export default Login;
