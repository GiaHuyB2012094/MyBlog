const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
var uniqueValidator = require('mongoose-unique-validator');
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true,'Please provide username'],
        unique: true,
    },
    password: {
        type: String,
        required:  [true,'Please provide password'],
    },
    confirmPassword: {
        type: String,
        required:  [true,'Please provide confirm password'],
    }
});
UserSchema.plugin(uniqueValidator)
// encrypt password
UserSchema.pre('save', function(next){
    const user = this;
    bcrypt.hash(user.password,10,(error,hash) => {
        user.password = hash;
        next();
    })
})
// encrypt confirm password
UserSchema.pre('save', function(next){
    const user = this;
    bcrypt.hash(user.confirmPassword,10,(error,hash) => {
        user.confirmPassword = hash;
        next();
    })
})

const User = mongoose.model('User',UserSchema)

module.exports = User
