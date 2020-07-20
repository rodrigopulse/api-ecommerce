import { Request, Response } from 'express'
import fs from 'fs'

import Produto from '../schemas/Produto'

class ProdutoController {
  // Cadastra produto
  public async cadastra (req: Request, res: Response): Promise<Response> {
    try {
      const reqFiles = []
      for (let i = 0; i < req.files.length; i++) {
        reqFiles.push(req.files[i].filename)
      }
      const data = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        peso: req.body.peso,
        estoque: req.body.estoque,
        categoria: req.body.categoria,
        destaque: req.body.destaque,
        preco: req.body.preco,
        imagens: reqFiles
      }
      const produto = await Produto.create(data)
      return res.status(201).json({ produto, arquivo: req.file })
    } catch (err) {
      return res.status(400).json({ mensagem: 'Produto não cadastrado', erro: err })
    }
  }

  // Get produto ID
  public async getId (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.path.split('/').pop()
      const produto = await Produto.find({ _id: id })
      return res.status(200).json(produto)
    } catch (err) {
      return res.status(400).json({ mensagem: 'Produto não encontrado', erro: err })
    }
  }

  // Delete produto ID
  public async deleteId (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.path.split('/').pop()
      const produto = await Produto.findOne({ _id: id })
      const deletaImagem = produto?.imagens?.forEach((valor:string) => {
        const nomeImagem = valor.split('.')
        console.log('Nome Imagem: ', nomeImagem)
        fs.unlink(`${process.cwd()}/uploads/produtos/${nomeImagem[0]}.jpg`, (err) => {
          if (err) {
            console.error(err)
            return res.status(400).json({ mensagem: 'Produto não deletado', erro: err })
          }
        })
      })
      console.log(deletaImagem)
      const produtoDeleta = await Produto.deleteOne({ _id: id })
      return res.status(200).json({ mensagem: 'Produto deletado', data: produtoDeleta })
    } catch (err) {
      return res.status(400).json({ mensagem: 'Produto não encontrado', erro: err })
    }
  }
}

export default new ProdutoController()
