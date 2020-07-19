const express = require("express"),
  mongoose = require("mongoose"),
  body = require("body-parser"),
  app = express(),
  cors = require("cors");
port = 4000;

// CONFIGURAMOS BODY PARSER
app.use(body.urlencoded({ extended: false }));
app.use(body.json());

app.use(cors());

// COnfiguracion base de datos
mongoose
  .connect("mongodb://localhost/agendaContactos", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexion a base de datos Exitosa"))
  .catch((err) => console.log("Error al conextar con la base de datos" + err));

// Requerimos el archivo de las rutas
app.use(require("./routes/contacts"));
app.use(require("./routes/auth"));


// Escucha del servidor
app.listen(port, () => {
  console.log("Servidor corriendo en el puerto: " + port);
});
