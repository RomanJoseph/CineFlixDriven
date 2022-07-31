import axios from "axios"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

import "./movieTime.css"

export default function MovieTime() {
    const [movieTime, setMovieTime] = useState()
    const [movie, setMovie] = useState()
    const params = useParams();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/movies/${params.idFilme}/showtimes`)
        promise.then((movieShowTime) => {
            const movieData = movieShowTime.data.days
            setMovie({title:movieShowTime.data.title,image:movieShowTime.data.posterURL})
            setMovieTime(movieData)
        })
    }, [])


    if (movieTime) {
        return (
            <>
                <h1>Selecione o horário</h1>
                {movieTime.map((day, index) => {
                    const showtimes = day.showtimes

                    return (
                        <>
                            <div className="date" key={index}>
                                <p>{day.weekday} - {day.date}</p>
                                <div className="time">
                                    {showtimes.map((time, index) =><Link to={`assentos/${time.id}`}><div key={time.id} className="timeBox">{time.name}</div></Link>)}
                                </div>
                            </div>
                        </>
                    )
                })}

                <footer>
                    <div className="movie">
                        <div className="movieCoverBox">
                            <img src={movie.image}/>
                        </div>
                        <p>{movie.title}</p>
                    </div>
                </footer>
            </>
        )
    } else {
        return (
            <h1>Carregando...</h1>
        )
    }
}