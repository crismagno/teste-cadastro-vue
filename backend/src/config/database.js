const mongoose = require('mongoose')
const { name, password} = require('../../.env')

mongoose.Promise = global.Promise
module.exports = mongoose.connect(`mongodb://${name}:${password}@ds225624.mlab.com:25624/meu_react`)
// module.exports = mongoose.connect(`mongodb://localhost:3005`)