const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const createJWT = require('../utils/auth/jwt');

exports.autenticarUsuario = async (req, res) => {

    // revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    const { email, password } = req.body;

    // Verificar si el usuario existe con su correo electrónico
    const usuario = await Usuario.findOne({ email })
    if(!usuario) {
      return res.status(400).json({ msg: 'El usuario no existe' });
    }

    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: 'Password incorrecto'});
    }

    // generar token
    createJWT.jwt(usuario, res);

}

exports.usuarioAutenticado = async (req, res) => {
  try {
      const usuario = await Usuario.findById(req.usuario.id);
      res.json({usuario});
  } catch (error) {
      console.log(error);
      res.status(500).json({msg: 'Hubo un error'});
  }
}