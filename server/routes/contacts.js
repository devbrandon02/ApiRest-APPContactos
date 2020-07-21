const ContactosModel = require('../models/ContactosModel');

const express = require('express'),
      Router = express.Router();

const contactsControllers = require('../controllers/contactsControllers')


Router.get('/api/contacts/:id', contactsControllers.getContacts );

Router.post('/api/contacts', contactsControllers.saveContacts )



module.exports = Router


