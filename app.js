//Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//initialize variables
var app = express();

//Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 // parse application/json
app.use(bodyParser.json())

// routs import
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');


//DB conection // DB  mongodb+srv://admin:<password>@bancoaccenturedb-aixfv.mongodb.net/test?retryWrites=true&w=majority
//mongodb://localhost:27017/bancoDB

mongoose.connection.openUri('mongodb+srv://admin:adminAccenture@bancodb-1ccnu.mongodb.net/test?retryWrites=true&w=majority', (err,res) =>{
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


