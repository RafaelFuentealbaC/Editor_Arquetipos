const express = require('express');
const app = express();

// middleware's
const cors = require('cors'); // middleware de express que comunica este servidor con el servidor de desarrollo

require('./database'); // solicito la conexion a mongodb

// modulo cors
// cuando la aplicación inicie, antes de llegar a las rutas, se procesa datos con cors
// esto para poder enviar datos entre servidores
app.use(cors());
app.use('/', require('./routes/index'));

// inicia el servidor
app.listen(3000, () => {
    console.log('Server listen on port 3000');
})