const { Router } = require('express')
const {
    createTask,
    getTask,
    updateTask,
    deleteTask,
    getMyTask,
    getAllTask
} = require('../controllers/tasks.controllers')
const jwtAuthMiddleware = require('../middlewares/users.middlewares')

const tasksRouter = Router()
tasksRouter.post('/', jwtAuthMiddleware, createTask)
tasksRouter.get('/:taskId', getTask)
tasksRouter.get('/', getAllTask)
tasksRouter.get('/users/me', jwtAuthMiddleware, getMyTask)
tasksRouter.put('/:taskId', jwtAuthMiddleware, updateTask)
tasksRouter.delete('/:taskId', jwtAuthMiddleware, deleteTask)

module.exports = tasksRouter
