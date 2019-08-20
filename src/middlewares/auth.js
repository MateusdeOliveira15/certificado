const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.cookies.auth;


    if (!authHeader)
        return res.render('login', {msg: ''}) 
    // return res.status(401).send({ error: 'NOOOOPS token' })


    const token = authHeader

        // const parts = authHeader.split(' ')

    // if (!parts.length === 2)
    //     return res.status(401).send({
    //         error: 'token error'
    //     })
    
    //     const [scheme, token] = parts

    //     if (!/^Bearer$^/i.test(scheme))
    //         return res.status(401).send({ error: 'token malformatted'})

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) return res.render('login', {msg: ''})//return res.status(401).send({ error: 'token invalid'})

        res.cookie('userId',decoded.id)
        // req.userId = decoded.id
        return next()
    })


}