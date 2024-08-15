const { Router } = require('express')
const {
    registerController,
    loginController,
    getUserController,
    deleteUserController
} = require('../controllers/users.controllers')

const usersRouter = Router()
usersRouter.post('/register', registerController)
usersRouter.post('/login', loginController)
usersRouter.get('/:userId', getUserController)
usersRouter.delete('/:userId', deleteUserController)

module.exports = usersRouter
