import {BrowserRouter,Routes,Route} from "react-router-dom";
import "./reset.css"
import Header from "./components/header"
import HomePage from "./components/homePage"

export default function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}