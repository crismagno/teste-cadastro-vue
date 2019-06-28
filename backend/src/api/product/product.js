const restful = require('node-restful')
const mongoose = restful.mongoose

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    preco: { type: Number, required: true },
    cod: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
})

module.exports = restful.model('product', productSchema)