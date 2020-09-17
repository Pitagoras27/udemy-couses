const express = require('express');
const conectarDB = require('./config/db.js');

const app = express();
conectarDB()

const PORT = process.env.PORT || 4000;

app.use(express.json({ extended: true }))

// Middledwares de rutas
app.use('/api/usuarios', require('./routes/usuarios'))

app.listen(PORT, () => {
  console.log(`conectado en el puertso ${PORT}`)
});
