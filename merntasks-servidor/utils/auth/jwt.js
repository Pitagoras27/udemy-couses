const jwt = require('jsonwebtoken');

exports.jwt = (usuario, res) => {
    // Crear y firmar el JWT
    const payload = {
        usuario: {
            id: usuario.id,
        }
    };

    // firmar el JWT
    jwt.sign(payload, process.env.SECRETA, {
        expiresIn: 3600 // 1 hora
    }, (error, token) => {
        if(error) throw error;

        // Mensaje de confirmación
        return res.json({ token  });
    });
}