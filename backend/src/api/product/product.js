const restful = require('node-restful')
const mongoose = restful.mongoose

const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Nome é requerido!']},
    preco: { type: Number, required: [true, 'Preço é requerido!'] },
    desconto: { type: Number, min: 0, max: 100, default: 0 },
    cod: { type: String, required: [true, 'Código é requerido!'], unique: true, min: 0, max: 10000000 },
    quantity: { type: Number, min:0, max: 10000000, default: 0 },
    description: { type: String, max: 100, default: 'Nenhuma descrição.' },
    done: { type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now },
})

module.exports = restful.model('product', productSchema)
