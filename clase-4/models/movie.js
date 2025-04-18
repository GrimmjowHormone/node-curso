import movies from '../movies.json' with { type: 'json' }
import { randomUUID } from 'node:crypto'

export class MovieModel {
  static async getAll({ genre }) {
    if (genre) {
      console.log(genre)
      return movies.filter((movie) =>
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static async getById({ id }) {
    const movie = movies.find((movie) => movie.id === id)
    return movie
  }

  static async getByPage(number) {
    const offset = (number - 1) * 10
    const end = offset + 10
    const data = movies.slice(offset, end)
    if (data.length > 0) return data
    return false
  }

  static async create(input) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }
    // esto no seria rest porque lo estamos guardando en memoria
    movies.push(newMovie)
    return newMovie
  }

  static async delete({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)
    if (movieIndex === -1) return false
    movies.splice(movieIndex, 1)
    return true
  }

  static async update({ id, input }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)
    if (movieIndex === -1) return false
    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }
    return movies[movieIndex]
  }
}
