const express = require('express')
const app = express()
const configDB = require('./config/database')
configDB()
const router = require('./config/routes')
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(PORT, () => {
    console.log('listening on port', PORT)
})