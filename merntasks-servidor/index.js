const express = require('express');
const conectarDB = require('./config/db.js');

const app = express();
conectarDB()

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`conectado en el puertso ${PORT}`)
});
