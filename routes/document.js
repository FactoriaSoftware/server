// Iniciamos el servidor express
var express = require('express');
var mongoose = require('mongoose');


//const express = require('express');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');


const app = express();

const multiPartMiddleware = multipart({
    uploadDir: './documentos'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//EndPoint to upload files

app.post('/api/subir', multiPartMiddleware, (req, res) => {
    res.json({
        'message': 'fichero subido correctamente!'
    });

});



// Exportamos app
module.exports = app;


//app.listen(3000, () => console.log(`app running on port:3000`));