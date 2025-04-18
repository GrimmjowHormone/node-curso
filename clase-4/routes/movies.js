import { Router } from 'express'
import { MovieController } from '../controllers/movies.js'
export const moviesRouter = Router()

// obtener todos los recursos
moviesRouter.get('/', MovieController.getAll)
// buscar recursos por pagina
moviesRouter.get('/page/:number', MovieController.getByPage)
// buscar recurso por id
moviesRouter.get('/:id', MovieController.getById)

// crear un nuevo recurso
moviesRouter.post('/', MovieController.create)

moviesRouter.delete('/:id', MovieController.delete)

moviesRouter.patch('/:id', MovieController.update)
