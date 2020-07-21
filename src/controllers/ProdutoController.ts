import { Request, Response } from 'express'
// import fs from 'fs'

import Produto from '../schemas/Produto'

class ProdutoController {
  // Cadastra produto
  public async cadastra (req: Request, res: Response): Promise<Response> {
    try {
      const data = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        peso: req.body.peso,
        estoque: req.body.estoque,
        categoria: req.body.categoria,
        destaque: req.body.destaque,
        preco: req.body.preco,
        imagens: req.files
      }
      const produto = await Produto.create(data)
      return res.status(201).json({ produto, arquivo: req.file })
    } catch (err) {
      return res.status(400).json({ mensagem: 'Produto não cadastrado', erro: err })
    }
  }

  public async atualiza (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.path.split('/').pop()
      const data = {
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        peso: req.body.peso,
        estoque: req.body.estoque,
        categoria: req.body.categoria,
        destaque: req.body.destaque,
        preco: req.body.preco,
        imagens: req.files
      }
      const produto = await Produto.replaceOne({ _id: id }, data)
      return res.status(201).json({ produto, arquivo: req.file })
    } catch (err) {
      return res.status(400).json({ mensagem: 'Produto não cadastrado', erro: err })
    }
  }

  // Get produto ID
  public async get (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.path.split('/').pop()
      const produto = await Produto.findOne({ _id: id })
      return res.status(200).json(produto)
    } catch (err) {
      return res.status(400).json({ mensagem: 'Produto não encontrado', erro: err })
    }
  }

  public async getTodos (req: Request, res: Response): Promise<Response> {
    try {
      const produto = await Produto.find()
      return res.status(200).json(produto)
    } catch (err) {
      return res.status(400).json({ mensagem: 'Produtos não encontrados', erro: err })
    }
  }

  // Delete produto ID
  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.path.split('/').pop()
      // const produto = await Produto.findOne({ _id: id })
      /* const deletaImagem = produto?.imagens?.forEach((valor:string) => {
        const nomeImagem = valor.split('.')
        console.log('Nome Imagem: ', nomeImagem)
        fs.unlink(`${process.cwd()}/uploads/produtos/${nomeImagem[0]}.jpg`, (err) => {
          if (err) {
            console.error(err)
            return res.status(400).json({ mensagem: 'Produto não deletado', erro: err })
          }
        })
      }) */
      const produtoDeleta = await Produto.deleteOne({ _id: id })
      return res.status(200).json({ mensagem: 'Produto deletado', data: produtoDeleta })
    } catch (err) {
      return res.status(400).json({ mensagem: 'Produto não encontrado', erro: err })
    }
  }
}

export default new ProdutoController()
