// contiene las rutas del servidor
const{ Router } = require('express');
const router = Router();

// modulo faker para extraer datos de prueba, biblioteca de node
const faker = require('faker');

// enlazo el modelo arquetipos para guardar datos
const Arquetipo = require('../models/arquetipos');

// definimos las rutas
router.get('/create', async(req, res) => {
    fs = require('fs');
    var parser = require('xml2json');

    fs.readFile( 'src/test.xml', function(err, data) {
        var json = parser.toJson(data);
        console.log(json);
     });
});

router.get('/nuevo', async(req, res) => {
  res.render('nuevo');
});

router.get('/arquetipos', async(req, res) => {
    const arquetipos = await Arquetipo.find() // devuelve en arreglo js
    res.json(arquetipos);
});

// estas rutas se utilizan en index.js de src
module.exports = router;