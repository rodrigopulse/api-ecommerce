import { Router } from 'express'

import Auth from './services/auth'

import multer from 'multer'

import UsuarioController from './controllers/UsuarioController'
import ProdutoController from './controllers/ProdutoController'
import CategoriaController from './controllers/CategoriaController'

const auth = new Auth()
const routes = Router()

const storage = multer.diskStorage({
  destination: './imagens',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg')
  }
})

const upload = multer({ storage: storage })

// Usuario
routes.get('/usuario/:id', auth.verificaToken, UsuarioController.id)
routes.post('/usuario/cadastra', UsuarioController.cadastra)
routes.post('/usuario/login', UsuarioController.login)

// Produto
routes.post('/produto', auth.verificaToken, upload.array('imagens'), ProdutoController.cadastra)
routes.put('/produto/:id', auth.verificaToken, ProdutoController.atualiza)
routes.get('/produto/:id', ProdutoController.get)
routes.get('/produto', ProdutoController.getTodos)
routes.delete('/produto/:id', auth.verificaToken, ProdutoController.delete)

// Categoria
routes.post('/categoria', auth.verificaToken, CategoriaController.cadastra)
routes.put('/categoria/:id', auth.verificaToken, CategoriaController.atualiza)
routes.get('/categoria', CategoriaController.getTodas)
routes.get('/categoria/:id', CategoriaController.get)
routes.delete('/categoria/:id', auth.verificaToken, CategoriaController.delete)

export default routes
