import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./reset.css"
import Header from "./components/header"
import HomePage from "./components/homePage"
import MovieTime from "./components/movieTime";
import Session from "./components/session";

export default function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sessoes/:idFilme" element={<MovieTime/>} />
                <Route path="sessoes/:idFilme/assentos/:idSessao" element={<Session/>}/>
            </Routes>
        </BrowserRouter>
    );
}