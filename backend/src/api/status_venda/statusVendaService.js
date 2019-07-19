const StatusVenda = require('./statusVenda')

StatusVenda.methods(['get', 'post', 'put', 'delete'])
StatusVenda.updateOptions({ new: true, runValidators: true })

StatusVenda.route('count', (req, res, next) => {
    StatusVenda.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error]})
        } else {
            res.json({ value })
        }
    })
})

module.exports = StatusVenda