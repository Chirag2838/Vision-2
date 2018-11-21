require('./api/data/db');
require('./api/data/models/user.model');
require('./api/data/models/posts.model');

const express = require('express');
const path = require('path');
const routes = require('./api/routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const port = 5000;
app.set('port', port);

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
})

app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

app.use('/api', routes);

const server = app.listen(app.get('port'), (req, res) => {
    console.log("Server running on port no. " + server.address().port);
});