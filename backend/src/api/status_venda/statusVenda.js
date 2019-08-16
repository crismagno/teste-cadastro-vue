const restful = require('node-restful')
const mongoose = restful.mongoose

const statusVendaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    preco: { type: Number, required: true },
    desconto: { type: Number },
    cod: { type: String, required: true, min: 0, max: 10000000 },
    quantity: { type: Number, min:0, max: 1000000, required: true },
    valorVenda: { type: Number, required: true},
    description: { type: String, max: 200, default: 'Nenhuma descrição da venda.' },
    createdAt: { type: Date, default: Date.now },
})

module.exports = restful.model('statusVenda', statusVendaSchema)