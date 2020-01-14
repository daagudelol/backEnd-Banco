//Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//initialize variables
var app = express();

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 // parse application/json
app.use(bodyParser.json())

// routs import
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');


//mongodb://localhost:27017/bancoDB

mongoose.connection.openUri('mongodb+srv://*****:*****Accenture@accenturebank-6dgm4.mongodb.net/test?retryWrites=true&w=majority', (err,res) =>{
    if (err) throw err;
    console.log('Base de datos: \x1b[36m%s\x1b[0m', 'online');
})

// Routs
app.use('/usuario', usuarioRoutes);
app.use('/', appRoutes);

//listen to requests
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[36m%s\x1b[0m', 'online');
})


