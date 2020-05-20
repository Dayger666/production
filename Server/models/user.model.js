const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

let userSchema = new Schema({
    userName: {
        type: String,
    },
    login: {
        type: String,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        minlength: [4, "слишком короткий пароль"]
    },
    role: {
        type: String,
        enum: ["технолог", "диспетчер", "мастер цеха"]
    },
    saltSecret: String
});

userSchema.pre('save', function (next) {
    // if (this.method !== 'local') next();
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function (method) {
    return jwt.sign({_id: this._id},
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXP
        });
};

mongoose.model('User', userSchema, 'users');

