import { Request, Response } from 'express'
import fs from 'fs'

import Produto from '../schemas/Produto'

class ProdutoController {
  // Cadastra produto
  public async cadastra (req: Request, res: Response): Promise<Response> {
    try {
      console.log(req.body)
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
      const produto = await Produto.findOne({ _id: id })
      for (let index = 0; index < produto.imagens.length; index++) {
        const imagem = produto?.imagens[index]
        const nomeImagem = imagem?.filename.split('.')
        fs.unlink(`${process.cwd()}/imagens/${nomeImagem[0]}.jpg`, (err) => {
          if (err) {
            console.log(err)
          }
        })
      }
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
      const categoria = await Produto.replaceOne({ _id: id }, data)
      return res.status(201).json(categoria)
    } catch (err) {
      return res.status(400).json({ mensagem: 'Produto não atualizado', erro: err })
    }
  }

  // Get produto ID
  public async get (req: Request, res: Response): Promise<Response> {
    try {
      const id = req.path.split('/').pop()
      const produto = await Produto.findOne({ _id: id }).populate('categoria')
      return res.status(200).json(produto)
    } catch (err) {
      return res.status(400).json({ mensagem: 'Produto não encontrado', erro: err })
    }
  }

  public async getTodos (req: Request, res: Response): Promise<Response> {
    try {
      const produto = await Produto.find().populate('categoria')
      return res.status(200).json(produto)
    } catch (err) {
      return res.status(400).json({ mensagem: 'Produtos não encontrados', erro: err })
    }
  }

  // Delete produto ID
  public async delete (req: Request, res: Response): Promise<Response | void> {
    try {
      const id = req.path.split('/').pop()
      const produto = await Produto.findOne({ _id: id })
      for (let index = 0; index < produto.imagens.length; index++) {
        const imagem = produto?.imagens[index]
        const nomeImagem = imagem?.filename.split('.')
        fs.unlink(`${process.cwd()}/imagens/${nomeImagem[0]}.jpg`, (err) => {
          if (err) {
            console.log(err)
          }
        })
      }
      const produtoDeleta = await Produto.deleteOne({ _id: id })
      return res.status(200).json({ mensagem: 'Produto deletado', data: produtoDeleta })
    } catch (err) {
      return res.status(400).json({ mensagem: 'Produto não encontrado', erro: err })
    }
  }
}

export default new ProdutoController()
