const { Router } = require('express')
const { createTask, getTask, updateTask, deleteTask, getMyTask } = require('../controllers/tasks.controllers')
const jwtAuthMiddleware = require('../middlewares/users.middlewares')

const tasksRouter = Router()
tasksRouter.post('/create', createTask)
tasksRouter.get('/:taskId', getTask)
tasksRouter.get('/', getMyTask)
tasksRouter.put('/:taskId', updateTask)
tasksRouter.delete('/:taskId', deleteTask)

module.exports = tasksRouter
