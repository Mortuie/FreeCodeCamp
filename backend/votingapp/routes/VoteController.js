module.exports = app => {
    app.get('/vote', (req, res) => {
        res.send("BANTER");
    });
};