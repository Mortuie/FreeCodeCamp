'use strict';

module.exports = {
    isLoggedIn: function(req, res, next) {
        console.log(req);
        console.log("user ", req.user);
        if (req.isAuthenticated()) return next();

        res.status(401);
        res.json({ status: "ERROR: Unauthorised" });
    },
}