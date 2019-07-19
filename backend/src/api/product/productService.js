const Product = require('./product')

Product.methods(['get', 'post', 'put', 'delete'])
Product.updateOptions({ new: true, runValidators: true })

Product.route('count', (req, res, next) => {
    Product.count((error, value) => {
        if (error) {
            res.status(500).json({ errors: [error]})
        } else {
            res.json({ value })
        }
    })
})







//===========================================
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './upload')
    },

    filename: function(req, file, callback){
        callback(null, `${Date.now()}_IMG`)
    }
})

const upload = multer({ storage }).single('arquivo')

Product.route('imagem',(req, res, next)=> {
    upload((req, res, err) => {
        if (err) {
            return res.end('Ocorreu um erro!')
        }
    })
    res.end('Deu certo!')})

module.exports = Product