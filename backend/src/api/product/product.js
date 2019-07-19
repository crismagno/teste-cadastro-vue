const restful = require('node-restful')
const mongoose = restful.mongoose

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    preco: { type: Number, required: true },
    cod: { type: Number, required: true, min: 0, max: 10000000 },
    quantity: { type: Number, min:0, max: 10000, required: true },
    description: { type: String, max: 100, default: 'Nenhuma descrição.' },
    done: { type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now },
    // image: { type: String, required: true}
})

module.exports = restful.model('product', productSchema)