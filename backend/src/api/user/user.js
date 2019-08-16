const restful = require('node-restful')
const mongoose = restful.mongoose

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Nome é requerido!' ] },
    email: { type: String, required: [true, 'E-mail é requerido!'], unique: true },
    password: { type: String, min: 6, max: 12, required: [true, 'Password é requerido!'] },
    createdAt: { type: Date, default: Date.now }
})

module.exports = restful.model('User', userSchema)