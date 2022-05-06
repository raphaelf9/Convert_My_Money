const api = require('./api.bcb.js')
const axios = require('axios')

jest.mock('axios')


test('getCotacaoAPI', () => {

  const res = {
    data: {
      value: [
        { cotacaoVenda: 2.90 }
      ]
    }
  }
  axios.get.mockResolvedValue(res)
  api.getCotacaoAPI('url').then(resp => {
    expect(resp).toEqual(res)
    expect(axios.get.mock.calls[0][0]).toBe('url')
  })
})

test('extractCotacao', () => {
  const cotacao = api.extractCotacao(
    {
      data: {
        value: [
          { cotacaoVenda: 2.90 }
        ]
      }
    })
  expect(cotacao).toBe(2.90)
})