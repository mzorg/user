const User = require('../models/user');
let conf = require('../config/config');

// =====================
// Check credit
// =====================
exports.authenticateUser = (req, res, next) => {
    let body = req.body; // parse body request
    let {email, password} = body;
    User.find(email)
        .then(user => {
            // Check if user exists
            if (!user) {
                let err = new Error("User or password incorrect");
                err.status = 401;
                next(err);
            }
            // Check if password is correct
            if (user.password !== password) {
                let err = new Error("User or password incorrect");
                err.status = 401;
                next(err);
            }
            // Return user
            const token = jwt.sign({ id: user.id, email: user.email, role: user.role.name }, process.env.SEED);
            const { password, ...userWithoutPassword } = user;
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
