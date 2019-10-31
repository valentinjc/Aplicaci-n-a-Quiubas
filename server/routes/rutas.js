const express = require('express');
const length = require('length');
const app = express();
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const unirest = require("unirest");
const req = unirest("POST", "https://api.quiubas.com/sms");

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

app.post('/sms', function(rec, res) {
    let numero = rec.body.to_number;
    let mensaje = rec.body.message;

    if (numero.length === 12) {
        var req = unirest("POST", "https://api.quiubas.com/sms");
        req.headers({
            "Cache-Control": "no-cache",
            "Authorization": "Basic MGJjZmY3NWE3MzI2YzYwZWZlNmI3OTE4ODMzMzY0MDI1NWExMjc3Yjo1ZTA5YzJjYTNhNTBjNmQyZTBjMmQyN2JlZjRmZjMzM2U5MzFlOWE5",
            "Content-Type": "application/json,application/json"
        });
        req.type("json");
        req.send({ to_number: numero, message: mensaje });

        req.end(function(resp) {
            if (resp.error) throw new Error(resp.error);

            //console.log(res.body);
            res.json({
                ok: true,
                mensaje: `Mensaje enviado a ${numero} ${mensaje}`

            })
        });
    } else {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'El número no está a 12 dígitos'
            }
        })
    }

});

app.get('/balance', function(rec, res) {

    const req = unirest("GET", "https://api.quiubas.com/balance");

    req.headers({
        "Cache-Control": "no-cache",
        "Authorization": "Basic MGJjZmY3NWE3MzI2YzYwZWZlNmI3OTE4ODMzMzY0MDI1NWExMjc3Yjo1ZTA5YzJjYTNhNTBjNmQyZTBjMmQyN2JlZjRmZjMzM2U5MzFlOWE5",
        "Content-Type": "application/json,application/json"
    });

    req.end(function(resp) {
        if (resp.error) throw new Error(resp.error);
        res.json({
                ok: true,
                mensaje: `El balance es de ${resp.body.balance} ${resp.body.currency}`

            })
            //console.log(`El balance es de ${resp.body.balance} ${resp.body.currency}`);
    });
});

module.exports = app;