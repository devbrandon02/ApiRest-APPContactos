const ContactosModel = require("../models/ContactosModel");

const Contactos = require("../models/ContactosModel");

exports.getContacts = (req, res) => {
  let id = req.params.id;
  // console.log(req.headers.token)

  if (!id) {
    res.status(500).json({
      ok: false,
      err: "El id del usuario es obligatorio",
    });

  } else {
    ContactosModel.find({ Propietario: id })
      .populate("Propietario")
      .exec((err, ContactosDb) => {
        if (err) {
          res.json({
            err,
          });
        }

        if (!ContactosDb) {
          return res.status(404).json({
            ok: false,
            err: "No tiene Contactos Agregados",
          });
        }

        res.json({
          ContactosDb,
        });
      });
  }
};

exports.saveContacts = (req, res) => {
  let body = req.body;

  if (!body.id) {
    return res.status(500).json({
      ok: false,
      err: "El id del usuario es obligatorio",
    });
  }

  let Contacto = new ContactosModel({
    Propietario: body.id,
    Nombre: body.nombre,
    Email: body.email,
    Telefono: body.telefono,
  });

  Contacto.save((err, ContactosDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    res.status(200).json({
      ok: true,
      ContactosDB,
    });
  });
};
