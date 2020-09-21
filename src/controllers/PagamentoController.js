import pagar from '../services/pagarme'

class PagamentoController {

  async pagar (req, res) {
    try  {
      const pagamento = await pagar()
      console.log('pagamento', pagamento)
      return res.status(200).json({ mensagem: 'pagamento efetuado', pagamento })
    } catch (err) {
      return res.status(400).json({ mensagem: 'pagamento não efetuado', pagamento })
    }
  }

}

export default new PagamentoController()