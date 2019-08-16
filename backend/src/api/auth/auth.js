const { authSecret } = require('../../../.env')
const { existsError, notExistsOrError, equalsOrError } = require('./validations')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')
const User = require('../user/user')

//método para encriptar a senha
const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

//método de login
const signIn = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send('Informe usuário e senha!')
    } 
    
    const user = await User.findOne({ email })

    if (!user) return res.status(404).send('Usuário não encontrado!')

    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) return res.status(400).send('Email/Senha inválidos!') 

    const now = Math.floor(Date.now() / 1000)

    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        // password: user.password, 
        iat: now,
        exp: now + (60 * 60 * 24 * 1)
    }

    res.json({
        ...payload,
        token: jwt.encode(payload, authSecret)
    })
}

//método de resgistrar
const signUp = async (req, res) => {
    const user = { ...req.body }
    // if (req.params.id) user.id = req.params.id

    try {
        existsError(user.name, 'Nome não informado!')
        existsError(user.email, 'E-mail não informado!')
        existsError(user.password, 'Senha não informada!')
        existsError(user.confirmPassword, 'Confirmação de Senha inválida!')
        equalsOrError(user.password, user.confirmPassword,
            'Senhas não conferem!')

        const userFromDB = await User.findOne({email: user.email})
        if (!user.id) {
            notExistsOrError(userFromDB, 'Usuário já cadastrado!')
        }
    } catch (msg) {
        return res.status(400).send(msg)
    }

    user.password = encryptPassword(user.password)
    delete user.confirmPassword

    const newUser = await User.create(user, err => {
        if (err) {
            return res.send(err)
        } else{
            res.status(200).send(`Usuário ${req.body.name} inserido com sucesso!!!`)
        }
    })
}

//método para validar token
const validateToken = async (req, res) => {
    const userData = req.body || null
    try {
        if (userData) {
            const token = jwt.decode(userData.token, authSecret)
            if (new Date(token.exp * 1000) > new Date()) {
                return res.send(true)
            }
        }
    } catch(e) {
        //problema com o token
    } 

    res.send(false)
}


module.exports = { signIn, signUp, validateToken }
