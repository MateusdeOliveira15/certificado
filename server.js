const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const mongoose = require('mongoose')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')




mongoose.connect('mongodb+srv://admin:admin@cluster0-n9z3l.mongodb.net/certificado?retryWrites=true&w=majority', {useNewUrlParser : true});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const server = express()
server.use(cookieParser())
server.set('view engine', 'ejs')
server.use(expressLayouts)
server.use('/static',express.static('src'))
server.use(express.json())
server.use(bodyParser.urlencoded({extended: false}))
server.use(bodyParser.json())
server.use(routes)

server.listen(3000)
