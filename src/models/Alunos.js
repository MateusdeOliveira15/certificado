const  { Schema, model } = require("mongoose")
const mongoosePaginate = require('mongoose-paginate')

const AlunosSchema = new Schema({
    nome : {
        type: String,
        require: true,
    },
    
    lote: {
        type: Schema.Types.ObjectId,
        ref: 'Lote',
        require: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
})



AlunosSchema.plugin(mongoosePaginate)

module.exports = model('Alunos', AlunosSchema)