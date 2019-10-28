const { Schema, model } = require('mongoose');
// permite definir los datos a guardar en mongodb, sus propiedades
const ArquetipoSchema = new Schema({
    organizacion: String,
    modelo: String,
    clase: String,
    concepto: String,
    subconcepto: String,
    version: String,
    data: String
});

// crea una tabla arquetipo con la estructura anterior
module.exports = model('arquetipo', ArquetipoSchema);