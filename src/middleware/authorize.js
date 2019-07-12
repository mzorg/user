
 module.exports = (roles = []) => {
    // Roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authorize based on user role
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                let err = new Error('Not authorized');
                err.status = 401;
                next(err);
            }

            // authentication and authorization successful
            next();
        }
    ]

}