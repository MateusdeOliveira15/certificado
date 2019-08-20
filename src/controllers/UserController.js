const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')


function generateToken(params = {}) {
    return jwt.sign( params, authConfig.secret, {
        expiresIn: 86400,
    })
}

module.exports = {
    async store(req, res) {
        const {usuario, senha} = req.body

        const userExists = await User.findOne({user: usuario})

        if (userExists) {
            res.render('cadastro', {msg: "Usuário já existe"})
        }else {
            const user = await User.create({
                user: usuario,
                pass: senha
            })
            
            token = generateToken({id: user.id})
            res.cookie('userId', user.id)
            res.cookie('auth',token)
            res.redirect('/') 
        }
    },

    async login(req, res) {
        const {usuario, senha} = req.body

        const user = await User.findOne({user: usuario})

        if (!user) {
            res.render('login', {msg: "Usuário não encontrado"})
        }
        if (! await bcrypt.compare(senha, user.pass)) {   
            res.render('login', {msg: "Senha incorreta"})
        }

        
        
        token = generateToken({id: user.id})
        res.cookie('auth',token)
        res.cookie('userId', user.id)
        res.redirect('/')

    }
}


