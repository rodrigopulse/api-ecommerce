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
  codigoPedido: number,
  valor?: number,
  frete?: number,
  usuario?: Types.ObjectId,
  status?: string
}

const PedidoSchema = new Schema({
  produtos: [{
    produto: { type: Schema.Types.ObjectId, ref: Produto },
    quantidade: Number
  }],
  codigoPedido: { type: Number },
  valor: Number,
  frete: Number,
  usuario: { type: Schema.Types.ObjectId, ref: Usuario },
  status: String
}, {
  collection: 'pedidos',
  versionKey: false,
  timestamps: true
})

export default model<PedidoInterface>('Pedido', PedidoSchema)
