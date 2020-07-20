import { Request, Response } from 'express'
import dotenv from 'dotenv'
import Categoria from '../schemas/Categoria'

dotenv.config()
class CategoriaController {
  public async get (req: Request, res: Response): Promise<Response> {
    try {
      const categoria = await Categoria.find()
      return res.status(200).json(categoria)
    } catch (err) {
      return res.status(400).json({ mensagem: 'Usuário não encontrado', erro: err })
    }
  }

  public async getId (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.path.split('/').pop()
      const categoria = await Categoria.findOne({ _id: id })
      return res.status(200).json(categoria)
    } catch (err) {
      return res.status(400).json({ mensagem: 'Usuário não encontrado', erro: err })
    }
  }

  public async atualiza (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.path.split('/').pop()
      const categoria = await Categoria.replaceOne({ _id: id }, req.body)
      return res.status(201).json(categoria)
    } catch (err) {
      return res.status(400).json({ mensagem: 'Usuário não criado', erro: err })
    }
  }

  public async cadastra (req: Request, res: Response): Promise<Response> {
    try {
      const categoria = await Categoria.create(req.body)
      return res.status(201).json(categoria)
    } catch (err) {
      return res.status(400).json({ mensagem: 'Usuário não criado', erro: err })
    }
  }

  public async deleteId (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.path.split('/').pop()
      const categoria = await Categoria.deleteOne({ _id: id })
      return res.status(200).json({ mensagem: 'Categoria deletada', data: categoria })
    } catch (err) {
      return res.status(400).json({ mensagem: 'Produto não encontrado', erro: err })
    }
  }
}

export default new CategoriaController()
