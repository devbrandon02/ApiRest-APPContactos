const usuarioModel = require('../models/UsuarioModel'),
      jwt = require('jsonwebtoken'),
      bcryp = require('bcrypt');

//CONTROLADOR DEL REGISTRO DE USUARIOS
exports.registerUser = (req, res) => {
  let body  = req.body,
      passwordHash = bcryp.hashSync(body.password, 5);

  Usuario = new usuarioModel({
    Nombre: body.nombre,
    Apellido: body.apellido,
    Email: body.email,
    Password: passwordHash,
    Image: body.image,
    Estado: body.estado,
  });

  Usuario.save((err, UsuarioDB) => {
    if(err){
      return res.status(500).json({
        ok: false,
        err,
        message: 'Error al intentar registrar al usuario'
      })
    }

    res.status(200).json({
      ok: true,
      mensaje: 'Usuario Registrado Correctamente',
      data:{
        Usuario: UsuarioDB
      }
    })
  })
}

// CONTROLADOR PARA EL LOGIN
exports.auth = (req, res) => {
  let password = req.body.password,
      email = req.body.email;

  usuarioModel.findOne({Email: email}, (err, usuarioDB) => {
    if(err)
      return res.status(500).json({
        ok: false,
        err
      })

    if(!usuarioDB)
      return res.status(404).json({
        ok: false,
        err: 'Este usuario No se encuentra Registrado! :('
      })


    bcryp.compare(password, usuarioDB.Password, (err, result) => {
      if(err){
        return res.status(401).json({
          ok: false,
          err
        })
      }
      if(!result){
        return res.status(401).json({
          ok: false,
          mensaje: 'Usuario o Contraseña Incorrectas'
        })
      }
      // CREAMOS EL TOKEN PARA EL USUARIO
      let token = jwt.sign({
        usuario: usuarioDB
      }, 'itachi-es-un-dios', {expiresIn: '12h'})


      usuarioDB.Password = ':)'
      return res.status(200).json({
        ok: true,
        mensaje: 'inicio de sesion exitoso',
        usuarioDB,
        auth:{
          token
        }
      })
    })
  })
}
