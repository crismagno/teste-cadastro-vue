const Product = require('./product')

Product.methods(['get', 'post', 'update', 'delete'])
Product.updateOptions({ new: true, runValidators: true })

module.exports = Product