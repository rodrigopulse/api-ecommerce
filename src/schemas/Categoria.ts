import { Schema, Document, model } from 'mongoose'

interface CategoriaInterface extends Document {
  titulo?: string,
  descricao?: string,
}

const CategoriaSchema = new Schema({
  titulo: { type: String, required: true },
  descricao: { type: String }
}, {
  collection: 'categorias',
  versionKey: false,
  timestamps: true
})

export default model<CategoriaInterface>('Categoria', CategoriaSchema)
