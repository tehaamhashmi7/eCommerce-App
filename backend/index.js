const express = require('express')
const mongoServer = require('./db')
const cors = require('cors')

const app = express()
app.use(express.json())

app.use(cors())

mongoServer()

app.use('/api/user', require('./routes/user'))
app.use('/api/product', require('./routes/product'))

app.listen(500, console.log('Application started on port 500'))