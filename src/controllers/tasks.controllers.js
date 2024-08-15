const TaskModels = require('../models/Task.models')

const createTask = async (req, res) => {
    try {
        const { title, content, endTime } = req.body
        const { user } = req

        const task = await TaskModels.create({
            title,
            content,
            endTime,
            startTime: new Date(),
            userId: user.id
        })
        res.json({
            message: 'Create task success',
            data: task
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getTask = async (req, res) => {
    try {
        const { taskId } = req.params
        const tasks = await TaskModels.findById(taskId)
        res.json({
            message: 'Get tasks success',
            data: tasks
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getAllTask = async (req, res) => {
    try {
        const tasks = await TaskModels.find()
        res.json({
            message: 'Get tasks success',
            data: tasks
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getMyTask = async (req, res) => {
    try {
        const { user } = req
        const tasks = await TaskModels.find({
            userId: user.id
        })
        res.json({
            message: 'Get tasks success',
            data: tasks
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params
        const { title, content, endTime } = req.body
        const { user } = req

        const findByUser = await TaskModels.findOne({
            _id: taskId,
            userId: user.id
        })
        if (!findByUser) {
            return res.status(404).json({
                message: 'Task not found'
            })
        }

        const task = await TaskModels.findByIdAndUpdate(taskId, {
            $set: {
                title,
                content,
                endTime
            }
        })
        return res.json({
            message: 'Update task success',
            data: task
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { user } = req
        const { taskId } = req.params

        const findByUser = await TaskModels.findOne({
            _id: taskId,
            userId: user.id
        })

        if (!findByUser) {
            return res.status(404).json({
                message: 'Task not found'
            })
        }

        const task = await TaskModels.findByIdAndDelete(taskId)
        if (!task) {
            return res.status(404).json({
                message: 'Task not found'
            })
        }
        res.json({
            message: 'Delete task success',
            data: task
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    createTask,
    getTask,
    getAllTask,
    getMyTask,
    updateTask,
    deleteTask
}
