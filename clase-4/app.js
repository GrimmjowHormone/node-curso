import express, { json } from 'express'

import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'
const app = express()
app.use(corsMiddleware())
app.use(json())
app.disable('x-powered-by')

app.get('/', (req, res) => res.send('Hello World!'))

// Todos los recursos que sean movies se identifica con //movies
app.use('/movies', moviesRouter)

// Definimos el puerto a utilizar
const PORT = process.env.PORT ?? 1234

app.listen(PORT, () =>
  console.log(`Example app listening on PORT http://localhost:${PORT}`)
)

console.log('xd')
