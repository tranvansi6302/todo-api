const { default: mongoose } = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    // Chưa hoàn thành -> pending, Đã hoàn thành -> completed
    status: {
        type: String,
        default: 'pending'
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Task', TaskSchema)
