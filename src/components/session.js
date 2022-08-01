import axios from "axios"

import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"

import "./session.css"

export default function Session() {
    const params = useParams()

    const [session, setSession] = useState(true)

    const [seats, setSeats] = useState()
    const [info, setInfo] = useState()

    const [name, setName] = useState()
    const [cpf, setCpf] = useState()
    const [select, setSelect] = useState([])

    const userData = { name: name, cpf: cpf, ids: select }

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v7/cineflex/showtimes/${params.idSessao}/seats`)
        promise.then((promise) => {
            setSeats(promise.data.seats)
            setInfo(promise.data)
        })
    }, [])

    if (session) {
        if (seats) {
            return (
                <>
                    <h1>Selecione os assentos</h1>
                    <div className="seats">
                        {seats.map((seat, index) => {
                            if (seat.isAvailable) {
                                return <div className={`seat avaliable ${select.includes(seat.id) ? "selected" : ""}`} onClick={() => {
                                    if (select.includes(seat.id)) {
                                        let n = select.indexOf(seat.id)
                                        select.splice(n, 1)
                                        setSelect([...select])
                                    } else {
                                        setSelect([...select, seat.id])
                                    }
                                }}>{index + 1}</div>
                            } else {
                                return <div className="seat notAvaliable" onClick={() => alert("Esse assento não está disponível")}>{index + 1}</div>
                            }
                        })}
                    </div>
                    <div className="subtitle">
                        <div className="subtitleItem">
                            <div id="green"></div>
                            <p>Selecionado</p>
                        </div>
                        <div className="subtitleItem">
                            <div id="gray"></div>
                            <p>Disponível</p>
                        </div>
                        <div className="subtitleItem">
                            <div id="yellow"></div>
                            <p>Indisponível</p>
                        </div>
                    </div>

                    <form onSubmit={(event) => {
                        event.preventDefault()
                        const promise = axios.post("https://mock-api.driven.com.br/api/v7/cineflex/seats/book-many", userData)
                        promise.then(() => setSession(false))
                    }}>
                        <p>Nome do comprador</p>
                        <input type="text" placeholder="Digite seu nome..." onChange={(event) => setName(event.target.value)} required></input>
                        <p>CPF do comprador</p>
                        <input type="text" placeholder="Digite seu CPF..." onChange={(event) => setCpf(event.target.value)} required></input>
                        <button type="submit">Reservar assento(s)</button>
                    </form>

                    <footer>
                        <div className="movie">
                            <div className="movieCoverBox">
                                <img src={info.movie.posterURL} />
                            </div>
                            <div className="sessionDetails">
                                <p>{info.movie.title}</p>
                                <p>{info.day.weekday} - {info.name}</p>
                            </div>
                        </div>
                    </footer>
                </>
            )
        } else {
            return (
                <>
                    <h1>Carregando...</h1>
                </>
            )
        }
    } else {
        return (
            <>
                <h1 className="sucess">Pedido feito com sucesso!</h1>
                <div className="movieInfo">
                    <h1>Filme e Sessão</h1>
                    <p>{info.movie.title}</p>
                    <p>{info.day.date} - {info.name}</p>
                </div>

                <div className="movieInfo">
                    <h1>Ingressos</h1>
                    {select.map((item) => {
                        const assentos = seats.map((seat) => seat.id)
                        return(
                            <p>Assento {assentos.indexOf(item)+1}</p>
                        )
                    })}
                </div>

                <div className="movieInfo">
                    <h1>Comprador</h1>
                    <p>Nome: {userData.name}</p>
                    <p>Cpf: {userData.cpf}</p>
                </div>

                <Link to="/"><div className="home">Voltar para Home</div></Link>
            </>
        )

    }



}