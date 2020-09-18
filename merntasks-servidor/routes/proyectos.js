const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const proyectoController = require('../controllers/proyectoController');

router.post('/',
    auth,
    proyectoController.crearProyecto
);

router.get('/',
    auth,
    proyectoController.crearProyecto,
);

module.exports = router;