const mongoose = require('mongoose');
const passport = require('passport');
// const _ = require('lodash');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

async function findUser(login){
    let exists = await User.findOne({'login': login});
    return !!exists;
}

module.exports = {
    register: async (req, res, next) => {
        const {name, login, password, role } = req.body;
        if(await findUser(login)) {
            return res.status(422).send(['This email already exists']);
        }
        let user = new User({
            'userName': name,
            'login': login,
            'password': password,
            'role': role,
        });

        await user.save((err, doc) => {
                if(!err) return res.send({
                        resultCode: 0,
                        userName: doc.userName,
                        login: doc.login,
                        role: doc.login,
                    });
                else return next(err);
            }
        );
    },

    authenticate: async (req, res, next) => {
        await passport.authenticate('local', (err, user, info) => {
            if(err) return res.status(400).json(err);

            else if (user) return res.status(200).json({
                "token": user.generateJwt('local'),
                "resultCode": 0,
                "userName": user.userName,
                "login": user.login,
                "role": user.role,
                });

            else return res.status(404).json(info);
        })(req, res);;
    },


};
