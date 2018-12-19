module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) return next();

    return res.status(401).json({
      error: true,
      message: 'User is not authorised to view this route.'
    });
  }
};
