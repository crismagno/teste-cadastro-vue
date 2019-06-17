const { authSecret } = require('../../../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')
const User = require('../user/user')

const signIn = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).send('Informe usuário e senha!')
    } 
    
    const user = await User.findOne({ email })
    // console.log(user.email)

    if (!user) return res.status(400).send('Usuário não encontrado!')

    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) return res.status(401).send('Email/Senha inválidos!') 
    
    // if (!(password === user.password)) {
    //     return res.status(401).send('Email/Senha inválidos!') 
    // } 

    const now = Math.floor(Date.now() / 1000)

    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        iat: now,
        exp: now + (60 * 60 * 24 * 3)
    }

    res.json({
        ...payload,
        token: jwt.encode(payload, authSecret)
    })
}

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

module.exports = { signIn, validateToken }