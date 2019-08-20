const express = require('express')
const PdfController = require('./src/controllers/PdfController')
const UserController = require('./src/controllers/UserController')
const LoteController = require('./src/controllers/LoteController')
const AlunoController = require('./src/controllers/AlunoController')
const authMiddleware = require('./src/middlewares/auth')

const routes = express.Router()

routes.options("/*", (req, res, next) => {
    res.header('access-control-allow-origin', '*');
    res.header('access-control-allow-methods', 'POST');
    res.header('access-control-allow-headers', ' Accept, access-control-allow-origin, Content-Type');
    res.sendStatus(204);
});


routes.post('/pdf', PdfController.CreatePdf)
routes.post('/cadastro', UserController.store)

// routes.get('/', authMiddleware, (req, res) => {
//     res.render('index')
// })
routes.get('/cadastro', (req, res)=>{
    res.render('cadastro', {msg: ''})
})

routes.get('/login', (req, res)=> {
    res.render('login', {msg: ''})
})

routes.post('/login', UserController.login)

routes.get('/logout', (req, res)=>{
    res.cookie('auth', undefined)
    res.cookie('userId', undefined)
    res.redirect('/login')
})

// =========================
routes.get('/', authMiddleware, LoteController.index)

routes.post('/', LoteController.store)
routes.get('/delete/:loteId', LoteController.delete)
routes.post('/update/:loteId', LoteController.update)

routes.get('/lote/:id', AlunoController.index)
routes.post('/lote/:id', AlunoController.store)

routes.get('/delete/aluno/:id', AlunoController.delete)
routes.post('/update/aluno/:id', AlunoController.update)


module.exports = routes
