const restful = require('node-restful')
const mongoose = restful.mongoose

const statusVendaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    preco: { type: Number, required: true },
    cod: { type: Number, required: true, min: 0, max: 10000000 },
    quantity: { type: Number, min:0, max: 1000000, required: true },
    valorVenda: { type: Number, required: true},
    createdAt: { type: Date, default: Date.now },
})

module.exports = restful.model('statusVenda', statusVendaSchema)