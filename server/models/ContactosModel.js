const mongoose = require('mongoose'),
      Schema = mongoose.Schema;


const contactosSchema = new Schema({
  Propietario: [{
    type: Schema.Types.ObjectId,
    ref: 'Usuarios'
  }],
  
  Nombre:{
    type: String,
    required: true,
  },

  Email:{
    type: String,
    required: true,
    minlength: 5
  },

  Telefono:{
    type: Number,
    required: true,
    minlength: 10,
    maxlength: 15
  }

})

module.exports = mongoose.model('Contactos', contactosSchema );