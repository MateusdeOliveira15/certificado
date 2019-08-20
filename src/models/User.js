const  { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs')


const UserSchema = new Schema({
    user : {
        type: String,
        unique: true,
        require: true,
    },
    pass : {
        type: String,
        require: true,
    },

})

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.pass, 10)

    this.pass = hash

    next()
})

module.exports = model('User', UserSchema)