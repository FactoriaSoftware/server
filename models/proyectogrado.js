var mongoose = require('mongoose');


var Schema = mongoose.Schema;


// Creamos el esquema de la colección estudiantes para guardar en mongo
var proyectoSchema = new Schema({

    estudiante: { type: Schema.Types.ObjectId, required: true, ref: 'Estudiante' },
    modalidad: { type: Schema.Types.ObjectId, required: true, ref: 'Modalidad' },
    tutor: { type: Schema.Types.ObjectId, required: false, ref: 'Administrativo' },

    nombreEst2: { type: String, required: true },
    codigoEst2: { type: String, required: true },
    identificacionEst2: { type: String, required: true },
    programaEst2: { type: String, required: true },
    correoEst2: { type: String, required: true },

    nombreEst3: { type: String, required: true },
    codigoEst3: { type: String, required: true },
    identificacionEst3: { type: String, required: true },
    programaEst3: { type: String, required: true },
    correoEst3: { type: String, required: true },

    titulo_proyecto: { type: String, required: true },
    linea_investigacion: { type: String, required: true },
    director_proyecto: { type: String, required: true },
    formulacion_problema: { type: String, required: true },
    alcance_limitaciones: { type: String, required: true },
    metodologia: { type: String, required: true },

    anteproyecto: { type: String, required: false },
    estado_anteproyecto: { type: String, required: false },
    notaAnteproyecto: { type: String, required: false },

    proyecto: { type: String, required: false },
    estado_proyecto: { type: String, required: false },
    notaProyecto: { type: String, required: false },

    documento_final: { type: String, required: false },
    estado_documento_final: { type: String, required: false },
    notaDocumentoFinal: { type: String, required: false },

    notas: { type: String, required: false },
    estado: { type: String, required: true },
    fecha: { type: Date, required: false }

}, { collection: 'proyectogrado' });

// Exportamos el modelo
module.exports = mongoose.model('ProyectoGrado', proyectoSchema);