var express = require('express');

var app = express();

// link to usuario model
var Usuario = require('../models/usuario');

// ===================================================
//           Obtener Usuarios
// ===================================================
app.get('/', (req, res, next) => {

    Usuario.find({ }, 'identificacion nombre fechaNacimiento')
        .exec(
            (err, usuarios )=> {
                if( err){
                    return res.status(500).json({
                            ok:false,
                            mensaje: 'Error cargando usuarios',
                            errors: err
                        });
                }

                res.status(200).json({
                    ok:true,
                    usuarios: usuarios
                });

            });
        
    
});

// ===================================================
//           Actualizar usuario
// ===================================================
app.put('/:id', (req, res) => {
     var id = req.params.id;
     var body = req.body;

     Usuario.findById( id, (err, usuario) =>{
        
        if( err){
            return res.status(500).json({
                ok:false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if( !usuario ){
            return res.status(400).json({
                ok:false,
                mensaje: 'El usuario con el id:' + id + 'no existe',
                errors: { message: 'No existe el usuario con ese ID'}
            });
        }

        usuario.nombre = body.nombre;
        usuario.identificacion = body.identificacion;
        usuario.fechaNacimiento = body.fechaNacimiento;

        usuario.save( (err, usuarioGuardado) =>{
            if( err){
                return res.status(400).json({
                    ok:false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            res.status(200).json({
                ok:true,
                usuario: usuarioGuardado
            });
        });

     });

});

// ===================================================
//           Crear nuevo usuario
// ===================================================
app.post('/', (req,res)=>{

    var body = req.body;

    var usuario = new Usuario({
        identificacion: body.identificacion,
        nombre: body.nombre,
        fechaNacimiento: body.fechaNacimiento
    });

    usuario.save((err, usuarioGuardado) =>{
        if( err){
            return res.status(400).json({
                    ok:false,
                    mensaje: 'Error al crear usuario',
                    errors: err
                });
        }

        res.status(201).json({
            ok:true,
            usuario: usuarioGuardado
        });


    }); 

});


// ===================================================
//           Borrar usuario por id
// ===================================================

app.delete('/:id', (req, res)=>{

    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado)=>{
        if( err){
            return res.status(500).json({
                    ok:false,
                    mensaje: 'Error al borrar usuario',
                    errors: err
                });
        }

        res.status(200).json({
            ok:true,
            usuario: usuarioBorrado
        });
    })

});



module.exports = app;