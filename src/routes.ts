import { Router } from 'express'

import Auth from './services/auth'

import multer from 'multer'

import UsuarioController from './controllers/UsuarioController'
import ProdutoController from './controllers/ProdutoController'

const auth = new Auth()
const routes = Router()

const storage = multer.diskStorage({
  destination: './uploads/produtos',
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
routes.post('/produto/cadastra', auth.verificaToken, upload.array('imagens'), ProdutoController.cadastra)
routes.get('/produto/:id', ProdutoController.getId)
routes.delete('/produto/:id', ProdutoController.deleteId)

export default routes
