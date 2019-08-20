const  { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs')
const mongoosePaginate = require('mongoose-paginate-v2')


let data = new Date()
let dia = data.getDate()
let meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
let mes = ''
let ano = data.getFullYear()
if (data.getMonth()+1 == 12) {
    let mes = meses[data.getMonth() -1]
} else if(data.getMonth()+1 == 0) {
    let mes = meses[data.getMonth() +1]
} else {
    mes = meses[data.getMonth()]
}

const texto = `${dia} de ${mes} de ${ano}`


const LoteSchema = new Schema({
    nome : {
        type: String,
        require: true,
    },
    titulo : {
        type: String,
        require: true,
    },
    data_realizacao : {
        type: String,
        require: true,
    },
    carga_horaria : {
        type: String,
        require: true,
    },

    createdAt: {
        type: String,
        default: texto,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },

    alunos: [{
        type: Schema.Types.ObjectId,
        ref: 'Alunos'
        
    }]
})

LoteSchema.plugin(mongoosePaginate)

module.exports = model('Lote', LoteSchema)