// contiene las rutas del servidor
const{ Router } = require('express');
const router = Router();

// modulo faker para extraer datos de prueba
const faker = require('faker');

// enlazo el modelo arquetipos para guardar datos
const Arquetipo = require('../models/arquetipos');

// definimos las rutas
router.get('/create', async(req, res) => {
    //res.send('Crear arquetipos');
    for(let i=0; i<100; i++){
        // crea un nuevo dato dentro de la base de datos
        await Arquetipo.create({
            title: faker.name.title(),
            imageURL: faker.image.imageUrl(),
            description: faker.lorem.paragraph()
        })
    }
    res.send('100 registros creados');
});

router.get('/arquetipos', async(req, res) => {
    const arquetipos = await Arquetipo.find() // devuelve en arreglo js
    res.json(arquetipos);
});

// estas rutas se utilizan en index.js de src
module.exports = router;