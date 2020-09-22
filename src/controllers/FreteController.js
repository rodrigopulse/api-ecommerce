//import axios from 'axios'
import Correios from 'node-correios'

const correios = new Correios();

class FreteController {
  async calcula(req, res) {
    let peso = parseFloat(req.body.peso)
    peso = peso / 1000
    peso = peso.toString()
    let args = {
      sCepOrigem: req.body.cepOrigem,
      sCepDestino: req.body.cepDestino,
      nVlPeso: peso,
      nCdServico: req.body.servico,
      nCdFormato: '1',
      nVlComprimento: req.body.comprimento,
      nVlAltura: req.body.altura,
      nVlLargura: req.body.largura
    }
    correios.calcPreco(args)
    .then(frete => {
      return res.status(200).json(frete)
    })
    .catch(error => {
      return res.status(400).json(error)
    });
  }

}

export default new FreteController()