const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    email: {type:String},
    password: {type: String, required: true},
    role: {type: String,
        enum:
        ['student','admin','librarian', 'faculty', 'staff', 'executive','hr'],
        required: true
    },
    avatar: String,
}, {timestamps: true})
userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.matchPassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
}
module.exports = mongoose.model('User', userSchema)