import pagarme from 'pagarme'

export default function pagar() {
  return new Promise( (resolve, reject) => {
    pagarme.client.connect({ api_key: 'ak_test_n2re8Cnh82ZhYjjPajzgUh32m4iuU2' })
      .then( client => {
        client.transactions.create({
          amount: 1000,
          card_number: '4111111111111111',
          card_holder_name: 'abc',
          card_expiration_date: '1225',
          card_cvv: '123',
          billing: {
            name: "Trinity Moss",
            address: {
              country: "br",
              state: "sp",
              city: "Cotia",
              neighborhood: "Rio Cotia",
              street: "Rua Matrix",
              street_number: "9999",
              zipcode: "06714360"
            }
          },
          items: [
            {
              "id": "r123",
              "title": "Red pill",
              "unit_price": 10000,
              "quantity": 1,
              "tangible": true
            },
            {
              "id": "b123",
              "title": "Blue pill",
              "unit_price": 10000,
              "quantity": 1,
              "tangible": true
            }
          ],
          "customer": {
            "external_id": "#3311",
            "name": "Morpheus Fishburne",
            "type": "individual",
            "country": "br",
            "email": "mopheus@nabucodonozor.com",
            "documents": [
              {
                "type": "cpf",
                "number": "30621143049"
              }
            ],
            "phone_numbers": ["+5511999998888", "+5511888889999"],
            "birthday": "1965-01-01"
          },
          "shipping": {
            "name": "Neo Reeves",
            "fee": 1000,
            "delivery_date": "2000-12-21",
            "expedited": true,
            "address": {
              "country": "br",
              "state": "sp",
              "city": "Cotia",
              "neighborhood": "Rio Cotia",
              "street": "Rua Matrix",
              "street_number": "9999",
              "zipcode": "06714360"
            }
          },
        })
        .then( (resposta) => {
          return resolve(resposta)
        }) .catch( (err) => { return reject(err) })
      }
    ) .catch( (err) => {
      return reject(err)
    })
  })
}