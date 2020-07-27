import { Schema, model } from 'mongoose'

import Categoria from './Categoria'

const ProdutoSchema = new Schema({
  titulo: { type: String, required: true },
  descricao: { type: String },
  imagens: { type: Array },
  peso: { type: Number },
  estoque: { type: Number },
  categoria: { type: Schema.Types.ObjectId, ref: Categoria },
  destaque: { type: Boolean },
  preco: { type: Number }
}, {
  collection: 'produtos',
  versionKey: false,
  timestamps: true
})

export default model('Produto', ProdutoSchema)
