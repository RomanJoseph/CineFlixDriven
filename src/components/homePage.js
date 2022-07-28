import "./homePage.css"
import { useState, useEffect } from "react"
import axios from "axios"

export default function HomePage() {
    const [homePage,setHomePage] = useState()

    useEffect(()=>{
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies")
        promise.then((promise)=> {
            const movies = promise.data
            setHomePage(movies.map((movie) => movie.posterURL))
        })
    },[])
    
    if(homePage){
        return (
            <>
                <h1>Selecione o filme</h1>
                <div className="movieSection">
                    {homePage.map((image) => {
                        return(
                            <div className="moviePoster">
                                <img src={image} alt="Movie Poster"></img>
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

