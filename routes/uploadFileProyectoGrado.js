var express = require('express');
var fileUpload = require('express-fileupload');
var fileSystem = require('fs');
var Proyecto = require('../models/proyectogrado');
var mdAuth = require('../middlewares/autenticacion');

var app = express();
app.use(fileUpload());

app.put('/:idEstudiante', [mdAuth.VerificarToken], (req, res) => {

    var id_estudiante = req.params.idEstudiante;

    if (!req.files.anteproyecto) {
        console.log("")
    } else {
        var anteproyecto = req.files.anteproyecto;
        var anteProyecto = setDocumento(anteproyecto, "anteproyecto", id_estudiante, res);
        Proyecto.findOneAndUpdate({ estudiante: id_estudiante }, { anteproyecto: anteProyecto, estado_anteproyecto: 'Enviada' }, (err, proyectoAct) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: "Lo sentimos, hubo un error al almacenar el documento",
                    error: err
                });
            } else {
                res.status(200).json({
                    ok: true,
                    proyecto: proyectoAct
                });
            }
        });
    }

    if (!req.files.proyecto) {
        console.log("")
    } else {
        var proyecto = req.files.proyecto;
        var Proyectodoc = setDocumento(proyecto, "proyecto", id_estudiante, res);
        Proyecto.findOneAndUpdate({ estudiante: id_estudiante }, { proyecto: Proyectodoc, estado_proyecto: 'Enviada' }, (err, proyectoAct) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: "Lo sentimos, hubo un error al almacenar el documento",
                    error: err
                });
            } else {
                res.status(200).json({
                    ok: true,
                    proyecto: proyectoAct
                });
            }
        });
    }



    if (!req.files.documento_final) {
        console.log("")
    } else {
        var documento_final = req.files.documento_final;
        var documento_Final = setDocumento(documento_final, "documento_final", id_estudiante, res);
        Proyecto.findOneAndUpdate({ estudiante: id_estudiante }, { documento_final: documento_Final, estado_documento_final: 'Enviada' }, (err, proyectoAct) => {
            if (err) {
                res.status(500).json({
                    ok: false,
                    mensaje: "Lo sentimos, hubo un error al almacenar el documento",
                    error: err
                });
            } else {
                res.status(200).json({
                    ok: true,
                    proyecto: proyectoAct
                });
            }
        });
    }
});





function setDocumento(documento, tipoDocumeto, id_estudiante, res) {

    var nombreCortado = documento.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Hacemos una lista de las extensiones permitidas
    var extensionesValidas = ['pdf', 'PDF'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {

        return res.status(400).json({
            ok: false,
            mensaje: "Tipo de archivo no permitido",
        });

    } else {

        var nombreGuardar = `${id_estudiante}-${tipoDocumeto}.${extensionArchivo}`;

        // Movemos el archivo a una carpeta del servidor
        var pathCrear = `./uploads/documents/proyecto/${id_estudiante}`;
        var path = `./uploads/documents/proyecto/${id_estudiante}/${nombreGuardar}`;

        if (!fileSystem.existsSync(pathCrear)) {
            fileSystem.mkdirSync(pathCrear);
        }

        if (fileSystem.existsSync(path)) {
            fileSystem.unlinkSync(path);
        }

        documento.mv(path, err => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: "Error al mover el archivo",
                    error: err

                });
            }

        });

        return nombreGuardar;
    }
}


module.exports = app;