const restful = require('node-restful')
const mongoose = restful.mongoose

const AnotacaoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Nome da anotacão requerido!']
    },

    description: {
        type: String,
        default: 'Nenhuma descrição!'
    },

    done: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    vencimento: {
        type: Date,
        required: [true, 'Insira a data de vencimento!'],

    }

})

module.exports = restful.model('Anotacao', AnotacaoSchema)