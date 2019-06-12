const express = require('express')

module.exports = function(app) {
    const router = express.Router()
    app.use('/api', router)

    const todoService   = require('../api/todo/userService')
    todoService.register(router, '/users')
}