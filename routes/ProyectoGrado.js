var express = require('express');
var app = express();
var mdAuth = require('../middlewares/autenticacion');
var ProyectoGrado = require('../models/proyectogrado');
var Estudiante = require('../models/estudiante');
const proyectogrado = require('../models/proyectogrado');



//======================================================
//                   GET-PROYECTO
//======================================================
app.get('/', [mdAuth.VerificarToken, mdAuth.VerificarJefePrograma], (req, res) => {

    proyectogrado.find({})
        .populate('estudiante')
        .populate('modalidad')
        //.populate('empresa')
        //.populate('vacante')
        .populate('tutor')
        .exec((err, proyectogrados) => {

            if (err) {

                res.status(500).json({
                    ok: false,
                    mensaje: 'Lo sentimos, ha ocurrido un error'
                });
            } else {

                res.status(200).json({
                    ok: true,
                    mensaje: 'Petición realizada correctamente',
                    proyectogrados: proyectogrados
                });
            }
        });
});


//=====================================================
//                   GET-PASANTIA POR ID
//=====================================================
app.get('/:id', [mdAuth.VerificarToken], (req, res) => {

    var id = req.params.id;

    proyectogrado.findById(id)
        .populate('estudiante')
        //.populate('empresa')
        .populate('vacante')
        .populate('tutor')
        .exec((err, proyectogrado) => {

            if (err) {

                res.status(500).json({
                    ok: false,
                    mensaje: 'Lo sentimos, ha ocurrido un error'
                });

            } else if (!proyectogrado) {

                res.status(500).json({
                    ok: false,
                    mensaje: 'Lo sentimos, no se encontró su solicitud'
                });

            } else {

                res.status(200).json({
                    ok: true,
                    mensaje: 'Petición realizada correctamente',
                    proyectogrado: proyectogrado
                });
            }
        });
});



//======================================================
//                   
//======================================================
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
        tutor: body.tutor,
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

/* ====================================================
                    PUT PROYECTO
=======================================================*/
app.put('/:id', [mdAuth.VerificarToken], (req, res) => {

    var body = req.body;
    var id = req.params.id;

    proyectogrado.findById(id, (err, proyectogrado) => {

        if (err) {
            res.status(500).json({

                ok: false,
                mensaje: 'Lo sentimos, ocurrió un error',
                err: err
            });

        } else if (!proyectogrado) {

            res.status(400).json({

                ok: false,
                mensaje: 'No se encontró ninguna solicitud',
                err: err
            });

        } else {


            proyectogrado.notas = body.notas;

            proyectogrado.estado_anteproyecto = body.estado_anteproyecto;
            proyectogrado.notaAnteproyecto = body.notasAnteproyecto;

            proyectogrado.estado_proyecto = body.estado_proyecto;
            proyectogrado.notasProyecto = body.notasProyecto;

            proyectogrado.estado_documento_final = body.estado_documento_final;
            proyectogrado.notaDocumentoFinal = body.notaDocumentoFinal;

            proyectogrado.tutor = body.tutor;
            proyectogrado.notas = body.notas;
            proyectogrado.estado = body.estado;

            proyectogrado.save((err, proyectogradoActualizada) => {

                if (err) {
                    res.status(500).json({

                        ok: false,
                        mensaje: 'Lo sentimos, ocurrió un error',
                        err: err
                    });

                } else {

                    res.status(200).json({

                        ok: true,
                        mensaje: 'Petición realizada correctamente',
                        proyectogradoActualizada: proyectogradoActualizada
                    });
                }
            });
        }
    });

});

module.exports = app;