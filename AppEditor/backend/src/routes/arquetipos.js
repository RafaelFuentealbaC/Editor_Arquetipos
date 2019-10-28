// contiene las rutas del servidor
const{ Router } = require('express');
const router = Router();

// enlazo el modelo arquetipos para guardar datos
const Arquetipo = require('../models/arquetipo');

// definimos las rutas

router.get('/create', async(req, res) => {
  fs = require('fs');
  var parser = require('xml2json');

  fs.readFile('src/test.xml', function(err, data) {
      var json = parser.toJson(data);
      console.log(json);
   });
});

router.post('/converxml', async(req, res) => {  
  const arquetipo_data = new Arquetipo(req.body);
  const arquetipo = new Arquetipo();

  const fs = require('fs');
  if(arquetipo_data.data!='') {
    fs.writeFile('src/tmp.xml', arquetipo_data.data, function(err) {
      if(err) { return console.log(err); }
      console.log('Archivo guardado!');
    });
  }

  var parser = require('xml2json');

  fs.readFile('src/tmp.xml', function(err, data) {
    var json = parser.toJson(data);
    arquetipo.data = json;
    var myjson = JSON.parse(arquetipo.data);
    res.json({
      data: arquetipo.data,
      identificador: myjson["archetype"]["archetype_id"].value
    });
    //arquetipo.save();
  });
});

// obtiene todos los arquetipos
router.get('/', async(req, res) => {
  const arquetipo = await Arquetipo.find();
  res.json(arquetipo);
});

router.post('/', async(req, res) => {
  const arquetipo = new Arquetipo(req.body);
  await arquetipo.save();
  res.json({
    status: 'Arquetipo guardado'
  });
});

router.put('/:id', async(req, res) => {
  await Arquetipo.findByIdAndUpdate(req.params.id, req.body); //busca por id y actualiza
  res.json({
    status: 'Arquetipo actualizado'
  });
});

router.delete('/:id', async(req, res) => {
  await Arquetipo.findByIdAndRemove(req.params.id);
  res.json({
    status: 'Arquetipo eliminado'
  });
});

router.get('/nuevo', async(req, res) => {
  const arquetipo = await Arquetipo.find().sort({$natural:-1}).limit(1);
  res.json(arquetipo);
});

// obtiene un arquetipo según su id
router.get('/:id', async(req, res) => {
  const arquetipo = await Arquetipo.findById(req.params.id);
  res.json(arquetipo);
});

router.get('/arquetipo', async(req, res) => {
    const arquetipos = await Arquetipo.find() // devuelve en arreglo js
    res.json(arquetipos);
});

// estas rutas se utilizan en index.js de src
module.exports = router;