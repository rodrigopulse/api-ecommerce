import { Schema, Document, model } from 'mongoose'
import bcrypt from 'bcrypt'
interface UsuarioInterface extends Document {
  email?: string
  nome?: string,
  senha?: string,
  role?: string,
  cpf?: number,
  endereco?: {
    logradouro: string,
    numero: number,
    complemento: string,
    bairro: string,
    cidade: string,
    estado: string,
    cep: number
  }
}

const UsuarioSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  nome: String,
  senha: String,
  role: String,
  cpf: Number,
  endereco: {
    logradouro: String,
    numero: Number,
    complemento: String,
    bairro: String,
    cidade: String,
    estado: String,
    cep: Number
  }
}, {
  collection: 'usuarios',
  versionKey: false,
  timestamps: true
})

UsuarioSchema.pre<UsuarioInterface>('save', async function (next) {
  if (!this.isModified('senha')) return next()
  try {
    // Criptografa a senha
    this.senha = await bcrypt.hash(this.senha, 12)
    return next()
  } catch (err) {
    return next(err)
  }
})

export default model<UsuarioInterface>('User', UsuarioSchema)
