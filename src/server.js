const express = require('express')
const cors = require('cors')
const connectionToDatabase = require('./databases/connection')
const usersRouter = require('./routers/users.routes')
const tasksRouter = require('./routers/tasks.routes')
const morgan = require('morgan')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

connectionToDatabase()
    .then(() => {
        console.log('Database connected')
    })
    .catch((err) => {
        console.log('Database connection failed', err)
    })

app.use('/api/v1/users', usersRouter)
app.use('/api/v1/tasks', tasksRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
