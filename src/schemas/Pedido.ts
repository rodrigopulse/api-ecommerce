import { Schema, Document, model, Types } from 'mongoose'
import Produto from './Produto'
import Usuario from './Usuario'

interface PedidoInterface extends Document {
  produtos?: [
    {
      produto?: Types.ObjectId,
      quantidade?: number
    }
  ],
  valor?: number,
  frete?: number,
  usuario?: Types.ObjectId
}

const PedidoSchema = new Schema({
  produtos: [{
    produto: { type: Schema.Types.ObjectId, ref: Produto },
    quantidade: Number
  }],
  valor: Number,
  frete: Number,
  usuario: { type: Schema.Types.ObjectId, ref: Usuario }
}, {
  collection: 'pedidos',
  versionKey: false,
  timestamps: true
})

export default model<PedidoInterface>('Pedido', PedidoSchema)
