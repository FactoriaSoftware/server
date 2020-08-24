var express = require('express');
var app = express();

// Importamos el modelo de los programas
var Programa = require('../models/programa');


app.get('/:id', (req, res) => {

    // Obtenemos el id enviado por la url
    var id = req.params.id;

    // Buscamos el programa por id
    Programa.findById(id, (err, programa) => {

        // Si hay un error...
        if (err) {
            res.status(500).json({

                ok: false,
                mensaje: 'Lo sentimos, hubo un error',
                error: err
            });

        } else {

            // Si todo sale bien, retornamos lo que encontró
            res.status(200).json({
                ok: true,
                programa: programa
            });
        }
    });
});

app.post('/', (req, res) => {

    // Obtenemos el id enviado por la url
    var body = req.body;
    var programa = new Programa({
        nombre: body.nombre,
        creditos_totales: body.creditos_totales
    });

    programa.save((err, programa_guardado) => {
        if (err) {
            res.status(500).json({

                ok: false,
                mensaje: 'Lo sentimos, hubo un error',
                error: err
            });

        } else {

            // Si todo sale bien, retornamos lo que encontró
            res.status(200).json({
                ok: true,
                programa_guardado: programa_guardado
            });
        }

    });

});

module.exports = app;