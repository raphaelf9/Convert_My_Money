const axios = require('axios')

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`


const getCotacaoAPI = url => axios.get(url)
const extractCotacao = res => res.data.value[0].cotacaoVenda
const getToday = () => {
  const today = new Date()
  return (`${today.getDay()}-${today.getMonth() + 1}-${today.getFullYear()}`)

}

const getCotacao = async () => {
  try {
    const today = getToday()
    const url = getUrl(today)
    console.log(today)
    const res = await getCotacaoAPI(url)
    const cotacao = extractCotacao(res)
    return cotacao
  }
  catch (err) {
    //console.log('err', err)
    console.log('')
  }
}

module.exports = {
  getCotacaoAPI,
  getCotacao,
  extractCotacao
}