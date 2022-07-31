import "./homePage.css"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function HomePage() {
    const [homePage,setHomePage] = useState()

    useEffect(()=>{
        const promise = axios.get("https://mock-api.driven.com.br/api/v7/cineflex/movies")
        promise.then((promise)=> {
            const movies = promise.data
            setHomePage(movies)
        })
    },[])
    
    if(homePage){
        return (
            <>
                <h1>Selecione o filme</h1>
                <div className="movieSection">
                    {homePage.map((movie) => {
                        return(
                            <div className="moviePoster" key={movie.id}>
                                <Link to={`sessoes/${movie.id}`}><img src={movie.posterURL} alt="Movie Poster"/></Link>
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }else{
        return <h1>Carregando</h1>
    }
}

