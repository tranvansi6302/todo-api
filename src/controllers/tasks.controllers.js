const TaskModels = require('../models/Task.models')

const createTask = async (req, res) => {
    try {
        const { title } = req.body
        const task = await TaskModels.create({
            title
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
const getMyTask = async (req, res) => {
    try {
        const tasks = await TaskModels.find({})
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
        const { title, startTime, endTime, reminderPeriod } = req.body
        const task = await TaskModels.findByIdAndUpdate(taskId, {
            $set: {
                title,
                startTime,
                endTime,
                reminderPeriod
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
        const { taskId } = req.params
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
    getMyTask,
    updateTask,
    deleteTask
}
