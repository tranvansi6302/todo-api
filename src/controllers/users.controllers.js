const jwt = require('jsonwebtoken')
const UserModels = require('../models/User.models')

const registerController = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        // check email exists
        const userExists = await UserModels.findOne({ email })
        if (userExists) {
            return res.status(400).json({ message: 'Email exists' })
        }
        const user = await UserModels.create({
            firstName,
            lastName,
            email,
            password
        })

        res.json({
            message: 'Register success',
            data: user
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModels.findOne({ email })
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Email or password is incorrect' })
        }
        // Gán user vào req.user để sử dụng ở middleware tiếp theo
        const token = jwt.sign(
            {
                id: user.id
            },
            'tranvansi',
            {
                // expiresIn 5 days
                expiresIn: '5d'
            }
        )

        res.json({
            message: 'Login success',
            data: user,
            token
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const getUserController = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await UserModels.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        res.json({
            message: 'Get user success',
            data: user
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const deleteUserController = async (req, res) => {
    try {
        const { userId } = req.params
        const user = await UserModels.findByIdAndDelete(userId)
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        res.json({
            message: 'Delete user success',
            data: user
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = {
    registerController,
    loginController,
    getUserController,
    deleteUserController
}
