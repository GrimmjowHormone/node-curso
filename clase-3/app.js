const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const { validateMovie, validatePartialMovie } = require('./Schemas/movies')
const app = express()
const PORT = process.env.PORT ?? 1234
app.use(express.json())
app.disable('x-powered-by')

app.get('/', (req, res) => res.send('Hello World!'))

// Origenes cors
const ACCEPTED_ORIGINS = ['http://localhost:8080', 'http://localhost:1234']

// Todos los recursos que sean movies se identifica con //movies
app.get('/movies', (req, res) => {
  const origin = req.header('origin')
  console.log(origin)

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    )

    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/movies/page/:number', (req, res) => {
  const { number } = req.params
  const offset = (number - 1) * 10
  const end = offset + 10
  const data = movies.slice(offset, end)
  if (data.length > 0) return res.json(data)
  res.status(404).json({ message: 'Page no found' })
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie no found' })
})

app.post('/movies', (req, res) => {
  // const { title, genre, year, director, duration, rate, poster } = req.body

  const result = validateMovie(req.body)
  if (result.error) {
    return res.json({ error: JSON.parse(result.error.message) })
  }
  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }
  // esto no seria rest porque lo estamos guardando en memoria
  movies.push(newMovie)
  res.status(201).json(newMovie) // actualizar la cache del cliente
})

app.delete('/movies/:id', (req, res) => {
  const origin = req.header('origin')
  console.log(origin)

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }
  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'movie not found' })
  }

  movies.splice(movieIndex, 1)
  return res.json({ message: 'movie deleted' })
})

app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(404).json({ error: JSON.parse(result.error.message) })
  }
  const { id } = req.params

  const movieIndex = movies.findIndex((movie) => movie.id === id)
  console.log(movieIndex, ' indice')
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }
  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie
  return res.json(updateMovie)
})

app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  }
  res.send(200)
})

app.listen(PORT, () =>
  console.log(`Example app listening on PORT http://localhost:${PORT}`)
)
