import { Request, Response } from 'express'
import dotenv from 'dotenv'
import Pedido from '../schemas/Pedido'

dotenv.config()
class PedidoController {
  public async cadastra (req: Request, res: Response): Promise<Response> {
    try {
      const pedido = await Pedido.create(req.body)
      return res.status(201).json(pedido)
    } catch (err) {
      return res.status(400).json({ mensagem: 'Pedido não criado', erro: err })
    }
  }

  public async get (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.path.split('/').pop()
      const pedido = await Pedido.findOne({ _id: id })
        .populate({
          path: 'produtos',
          populate: {
            path: 'produto',
            populate: { path: 'categoria' }
          }
        })
      return res.status(200).json(pedido)
    } catch (err) {
      return res.status(400).json({ mensagem: 'Categoria não encontrada', erro: err })
    }
  }
}

export default new PedidoController()
