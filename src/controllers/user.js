const User = require('../models/user');
const bcrypt = require('bcrypt');

// =====================
// Authenticate user
// =====================
exports.authenticateUser = (req, res, next) => {
    let body = req.body; // parse body request
    let {email, pass} = body;
    User.find({email})
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
            const { password, ...userWithoutPassword } = userDB;
            return res.json({
                ok: true,
                data: {
                    ...userWithoutPassword,
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
