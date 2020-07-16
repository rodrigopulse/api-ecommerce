import { Router } from 'express'
import Auth from './services/auth'
import UsuarioController from './controllers/UsuarioController'

const auth = new Auth()
const routes = Router()

// Usuario
routes.get('/usuario/:id', auth.verificaToken, UsuarioController.id)
routes.post('/usuario/cadastra', UsuarioController.cadastra)
routes.post('/usuario/login', UsuarioController.login)

export default routes
