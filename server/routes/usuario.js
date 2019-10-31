const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

app.post('/usuario', function(req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                OK: 'False',
                err
            })
        }
        //usuarioDB.password = null;

        res.json({
            Ok: true,
            usuario: usuarioDB
        })
    });
});

module.exports = app;