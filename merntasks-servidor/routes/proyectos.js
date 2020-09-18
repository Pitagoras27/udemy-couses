const express = require('express');
const { check } = require('express-validator');

const auth = require('../middleware/auth');

const router = express.Router();

const proyectoController = require('../controllers/proyectoController');

router.post('/',
    auth,
    [
      check('nombre', 'El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

router.get('/',
    auth,
    proyectoController.obtenerProyectos,
);

// Actualizar proyecto via ID
router.put('/:id',
    auth,
    [
      check('nombre', 'El nombre del proyecto es obligatoio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

module.exports = router;