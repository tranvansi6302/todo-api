const { mongoose } = require('mongoose')

const connectionToDatabase = async () => {
    await mongoose.connect(
        'mongodb+srv://sitranvan:tranvansi@stvcluster.hezg5zc.mongodb.net/todo-api?retryWrites=true&w=majority&appName=STVCluster'
    )
}

module.exports = connectionToDatabase
