const express = require('express');
const bodyParser = require('body-parser');
const characterRoutes = require('./api/routes/characters');
const seriesRoutes = require('./api/routes/series');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', characterRoutes);
app.use('/', seriesRoutes);

app.use((req, res, next) => {
    const error = {
        message: 'Not found',
        status: 404
    };
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});  


module.exports = app;