import { Schema, Document, model, Types } from 'mongoose'

import Categoria from './Categoria'

interface ProdutoInterface extends Document {
  titulo?: string,
  descricao?: string,
  imagens?: [],
  peso?: number,
  estoque?: number,
  categoria?: Types.ObjectId,
  destaque?: boolean,
  preco?: string
}

const ProdutoSchema = new Schema({
  titulo: { type: String, required: true },
  descricao: { type: String },
  imagens: { type: Array },
  peso: { type: Number },
  estoque: { type: Number },
  categoria: { type: Schema.Types.ObjectId, ref: Categoria },
  destaque: { type: Boolean },
  preco: { type: String }
}, {
  collection: 'produtos',
  versionKey: false,
  timestamps: true
})

export default model<ProdutoInterface>('Produto', ProdutoSchema)
