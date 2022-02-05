const express = require('express')
const convert = require('./lib/convert.js')
const app = express()
const path = require('path')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/cotacao', (req, res) => {
  const { cotacao, quantidade } = req.query
  const conversao = convert.convert(cotacao, quantidade)
  if (cotacao && quantidade) {
    res.render('cotacao', {
      error: false,
      cotacao: convert.toMoney(cotacao),
      quantidade: convert.toMoney(quantidade),
      conversao: convert.toMoney(conversao)
    })
  } else {
    res.render('cotacao', {
      error: "Valores inválidos"
    })
  }
})

app.listen(3000, err => {
  if (err) {
    console.log('não foi possivel inicar')
  } else {
    console.log('estamos online')
  }
})