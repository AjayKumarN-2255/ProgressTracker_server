const { app, Loader } = require('./app');

(() => {
    Loader();

    const PORT = process.env.PORT || 4000;

    app.listen(PORT, () => {
        console.log("Server running successfully on port", PORT);
    });
})();