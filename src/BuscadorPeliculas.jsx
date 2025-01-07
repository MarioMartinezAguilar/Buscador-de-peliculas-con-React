import { useState } from "react"


export const BuscadorPeliculas = () => {

    const url = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = '6fd6d3809e891955e11a3d5a57fea3d6'

    const [busqueda, setBusqueda] = useState('')
    const [peliculas, setPeliculas] = useState([])

    const handleInputChange = (e) => {
        setBusqueda(e.target.value)

    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        fetchPeliculas()
    }
    const fetchPeliculas = async () => {
        try{
            const response = await fetch(`${url}?query=${busqueda}&api_key=${API_KEY}`)
            const data = await response.json()
            console.log(data.results)
            setPeliculas(data.results)

        }catch(error){
            console.log('Ocurrio un error:' , error)
        }
    }

  return (
    <div className="container">
        <h1>Buscador de Películas</h1>
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="Escribe Una Película"
                value={busqueda}
                onChange={handleInputChange}
            />

            <button type="submit" className="search-button">Buscar</button>
        </form>

        <div className="movie-list">
            {peliculas.map((pelicula) => (
                <div key={pelicula.id} className="movie-card">
                    <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
                    <h2>{pelicula.title}</h2>
                    <p>{pelicula.overview}</p>
                </div>
            
            
            ))}

        </div>



    </div>
  )
}
