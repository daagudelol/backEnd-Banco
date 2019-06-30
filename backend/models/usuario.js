var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var validRoles = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message: '{VALUE} no es un rol permitido'
    
}

var usuarioSchema = new Schema({
    identificacion: { type: Number, unique:true, required: [true, 'El número de cédula es necesario']},
    nombre:{ type: String, required:[true, 'El nombre se debe ingresar']},
    fechaNacimiento: {type:Date, required:[true, 'Debe agregar la fecha']},
    role: { type: String, required:true, default:'USER_ROLE', enum: validRoles}
});

usuarioSchema.plugin( uniqueValidator, { message: 'El documento ya se encuentra registrado'})

module.exports = mongoose.model('Usuario', usuarioSchema);