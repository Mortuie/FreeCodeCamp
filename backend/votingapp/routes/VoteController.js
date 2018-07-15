module.exports = app => {
    app.get('/vote', (req, res) => {
        res.send("This seems to be working!");
    });
};