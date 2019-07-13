const User = require('../models/user');
const Role = require('../models/role');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// =====================
// Authenticate user
// =====================
exports.authenticateUser = (req, res, next) => {
    let body = req.body; // parse body request
    let {email, pass} = body;
    User.findOne({email})
        .populate('role')
        .then(userDB => {
            // Check if user exists
            if (!userDB) {
                let err = new Error("User or password incorrect");
                err.status = 401;
                next(err);
            }
            // Check if password is correct
            if (!bcrypt.compareSync(userDB.password, pass)) {
                let err = new Error("User or password incorrect");
                err.status = 401;
                next(err);
            }
            // Return user
            const token = jwt.sign({
                id: userDB.id,
                email: userDB.email,
                role: userDB.role.name
            }, process.env.SEED, { expiresIn: process.env.TOKEN_EXPIRATION });
            userDB = userDB.toObject(); // mongoose object to json
            delete userDB.password; // hide password from response
            return res.json({
                ok: true,
                data: {
                    user: userDB,
                    token
                }
            });
        })
        .catch(err => {
            // Return error response
            err.status = 500;
            next(err);
        });
};

// =====================
// Get all users
// =====================
exports.getUsers = (req, res, next) => {
    User.find({}, 'email')
        .then(users => {
            // Return users
            return res.json({
                ok: true,
                data: users
            });
        })
        .catch(err => {
            // Return error response
            err.status = 500;
            next(err);
        });
};
