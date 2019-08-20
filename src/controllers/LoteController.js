const User = require('../models/User')
const Lote = require('../models/Lotes')
const authConfig = require('../config/auth')


module.exports = {
    async store(req, res) {
        const lote = await Lote.create({...req.body, user : req.cookies.userId})

        res.redirect('/')
    },

    async update(req, res) {
        const {nome_lote, titulo, data_realizacao, carga_horaria} = req.body

        const lote = await Lote.findByIdAndUpdate(req.params.loteId, {
            nome: nome_lote,
            titulo,
            data_realizacao,
            carga_horaria
        }, {new: true})

        res.redirect('/')
    },

    async index(req, res) {
        const {page = 1} = req.query
        let next = parseInt(page)+1
        let prev = parseInt(page)-1 

        const lotes = await Lote.paginate({user: req.cookies.userId}, {page, limit: 5})
        let quant = await Lote.find({user: req.cookies.userId}).populate('alunos')
        
        const url = req.originalUrl
        console.log(url)
        

        res.render('index', {lotes:lotes.docs, next, prev, limit: lotes.totalPages, atual: page, url})
    },

    async delete(req, res) {
        await Lote.findByIdAndRemove(req.params.loteId)
        
        res.redirect('/')
    }
}