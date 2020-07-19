const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      unique = require('mongoose-unique-validator');


const usuarioSchema = new Schema({
  Nombre:{
    type: String,
    required: true
  },

  Apellido:{
    type: String,
    required: true
  },

  Email:{
    type: String,
    required: true,
    minlength: 5,
    unique: true
  },

  Password: {
    type: String,
    required: true,
    minlength: 6
  },

  Image: {
    type: String,
  },

  estado: {
    default: true,
    type: Boolean
  },
})

usuarioSchema.plugin(unique, {err: 'EL campo {PATH} debe ser Unico.'});

module.exports = mongoose.model('Usuarios', usuarioSchema)

