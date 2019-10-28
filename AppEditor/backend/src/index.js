const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

// configuraciones
app.set('port', process.env.PORT || 3000);

require('./database'); // solicito la conexion a mongodb

// middleware's
app.use(cors()); //middleware de express que comunica este servidor con el servidor de desarrollo
app.use(morgan('dev')); // muestra peticiones realizadas al backend por consola
app.use(express.json()); // entiende información en formato json

// rutas
app.use('/api/arquetipos', require('./routes/arquetipos'));

// archivos estáticos que se envían al frontend
//app.use(express.static(__dirname + '/public'));

// inicia el servidor
app.listen(app.get('port'), () => {
    console.log('Server listen on port', app.get('port'));
})