'use strict';

module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) return next();
        return res.status(401).json({ status: "ERROR: Unauthorised" });
    },
}