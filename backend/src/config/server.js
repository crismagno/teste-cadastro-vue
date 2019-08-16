const port = 3005

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const allowCors = require('./cors')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(allowCors)

app.listen(port, () => 
    console.log(`O servidor está rodando na porta ${port}`)
)

module.exports = app