var express = require('express');
var app = express();
var mdAuth = require('../middlewares/autenticacion');
var ProyectoGrado = require('../models/proyectogrado');
var Estudiante = require('../models/estudiante');


app.get('/', mdAuth.VerificarToken, (req, res) => {

    // Buscamos todas las modalidades
    ProyectoGrado.find({}, (err, proyectoGrado) => {

        // Si hay un error...
        if (err) {
            res.status(500).json({

                ok: false,
                mensaje: 'Lo sentimos, hubo un error'
            });

        } else {

            // Si todo sale bien...
            res.status(200).json({

                ok: true,
                proyectos: proyectoGrado
            });

        }
    });
});

//======================================================
//                   POST-PROYECTO
//======================================================
app.post('/:idEstudiante', [mdAuth.VerificarToken, mdAuth.VerificarEstudiante], (req, res) => {

    var body = req.body;
    var idEstudiante = req.params.idEstudiante;

    var solicitud = new ProyectoGrado({
        estudiante: idEstudiante,
        modalidad: "5f122d89863096ba85a03585",
        nombreEst2: body.nombreEst2,
        codigoEst2: body.nombreEst2,
        identificacionEst2: body.nombreEst2,
        programaEst2: body.nombreEst2,
        correoEst2: body.nombreEst2,
        nombreEst3: body.nombreEst3,
        codigoEst3: body.nombreEst3,
        identificacionEst3: body.nombreEst3,
        programaEst3: body.nombreEst3,
        correoEst3: body.nombreEst3,
        titulo_proyecto: body.titulo_proyecto,
        linea_investigacion: body.linea_investigacion,
        director_proyecto: body.director_proyecto,
        formulacion_problema: body.formulacion_problema,
        alcance_limitaciones: body.alcance_limitaciones,
        metodologia: body.metodologia,
        estado: 'Enviada',
        fecha: Date.now()
    });

    solicitud.save((err, solicitudGuardada) => {

        if (err) {

            res.status(500).json({
                ok: false,
                mensaje: 'Lo sentimos, ha ocurrido un error',
                err: err
            });
        } else {

            Estudiante.findById(idEstudiante, (err, estudiante) => {

                estudiante.modalidad = solicitudGuardada._id;
                estudiante.save((err, estudianteActualizado) => {

                    res.status(200).json({
                        ok: true,
                        mensaje: 'Petición realizada correctamente',
                        solicitudGuardada: solicitudGuardada,
                        estudianteActualizado: estudianteActualizado
                    });
                });

            });
        }
    });
});

module.exports = app;