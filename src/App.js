import "./styles/App.css";
import { BrowserRouter } from "react-router";
import Navbar from "./components/UI/navbar/Navbar";
import AppRouter from "./components/AppRouter";
function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;
