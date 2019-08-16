const Anotacao = require('./anotacao')
const errorHandler = require('../../common/errorHandler')

Anotacao.methods(['get', 'post','put', 'delete' ])
Anotacao.updateOptions({ new: true, runValidators: true })
Anotacao.after('post', errorHandler).after('put', errorHandler)

Anotacao.route( 'count', (req, res, next) => {
    Anotacao.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

module.exports = Anotacao
