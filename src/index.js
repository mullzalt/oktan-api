const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const { default: helmet } = require("helmet");
const cors = require('cors')
const path = require('path');

const { Socket } = require("./webSocket");
const apiRoutes = require("./routes");
const { httpException } = require("./exceptions/httpExceptions");

require('dotenv').config()

const app = express()

const port = process.env.PORT || 8000

app.use(helmet())
app.use(cookieParser())
app.use(cors())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/v2', apiRoutes)

app.use(httpException)

const server = require('http').createServer(app)
const webSocket = new Socket(server)

server.listen(port, () => {
    console.log('Server is running on port', port)
})
webSocket.listen()
