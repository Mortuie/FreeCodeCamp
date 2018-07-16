'use strict';

module.exports = {
    isLoggedIn: function(req, res, next) {
        if (req.isAuthenticated()) return next();
        res.sendStatus(401);
    },
}