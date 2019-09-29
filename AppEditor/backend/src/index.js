const express = require('express');
const app = express();
const cors = require('cors'); // middleware de express que comunica este servidor con el servidor de desarrollo

require('./database'); // realizo la conexion a mongodb

// cuando la aplicación inicie, antes de llegar a las rutas, se procesa datos con cors
// esto para poder enviar datos entre servidores
app.use(cors());

app.use('/', require('./routes/index'));

app.listen(3000, () => {
    console.log('Server listen on port 3000');
})