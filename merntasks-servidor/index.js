const express = require('express');
const conectarDB = require('./config/db.js');
const cors = require('cors');

const app = express();
conectarDB();

const PORT = process.env.PORT || 9000;
 
app.use(cors());
app.use(express.json({ extended: true }))

// Middledwares de rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))

app.listen(PORT, () => {
  console.log(`conectado en el puerto ${PORT}`)
});
