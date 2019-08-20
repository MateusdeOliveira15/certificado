const User = require('../models/User')
const Lote = require('../models/Lotes')
const Aluno = require('../models/Alunos')
const authConfig = require('../config/auth')


module.exports = {
    async store(req, res) {
        const {aluno} = req.body
        
        const aux = await Aluno.create({nome:aluno, lote:req.params.id ,user : req.cookies.userId})
        

        const lote = await Lote.findByIdAndUpdate(req.params.id, 
        { $push: { "alunos": aux.id }, new: true })

        
        res.redirect(req.url)
        
    },
    async index(req, res) {
        
        const {page = 1} = req.query
        let next = parseInt(page) + 1
        let prev = parseInt(page) - 1 
        
        const alunos = await Aluno.paginate({lote: req.params.id }, {page, limit: 8})
        
        const alunos_list = alunos.docs
        
        

        res.render('alunos', {alunos:alunos_list, next, prev, limit: alunos.pages, atual: page, url:req.url})
    },

    async delete(req, res) {

        const aluno = await Aluno.findByIdAndRemove(req.params.id)
        const lote = await Lote.findByIdAndUpdate(aluno.lote, 
            { $pull: { "alunos": aluno.id }, new: true })

        res.redirect('/lote/'+aluno.lote)
    },

    async update(req, res) {
        
        const {nome} = req.body

        const aluno = await Aluno.findByIdAndUpdate(req.params.id, {
            nome
        }, {new: true})

        

        res.redirect('/'+aluno.lote)
     }

}