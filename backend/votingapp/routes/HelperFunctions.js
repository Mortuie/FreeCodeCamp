'use strict';

module.exports = {
    isLoggedIn: function(req, res, next) {
        if (req.isAuthenticated()) return next();

        res.status(401);
        res.json({ status: "ERROR: Unauthorised" });
    },
}