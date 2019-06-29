//Requires
var express = require('express');
var mongoose = require('mongoose');

//initialize variables
var app = express();

//DB conection // DB  mongodb+srv://admin:<password>@bancodb-1ccnu.mongodb.net/test?retryWrites=true&w=majority


mongoose.connection.openUri('mongodb://localhost:27017/bancoDB', (err,res) =>{
    if (err) throw err;
    console.log('Base de datos: \x1b[36m%s\x1b[0m', 'online');
})

//Routs
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok:true,
        mensaje: 'Peticion realizada con exito'
    })
})


//listen to requests
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[36m%s\x1b[0m', 'online');
})


