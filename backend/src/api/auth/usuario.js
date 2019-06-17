const bcrypt = require('bcrypt')
const { existsError, notExistsOrError, equalsOrError } = require('./validations')
const User = require('../user/user')

const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

const save = async (req, res) => {
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
            res.status(200).send('Usuário inserido com sucesso!!!')
        }
    })
}

module.exports = { save }