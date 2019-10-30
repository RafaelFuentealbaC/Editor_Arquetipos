<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            Arquetipos Registrados:
                        </div>
                        <div class="card body">
                            <div class="container">
                                <div class="col-md-5">
                                <select class="custom-select mr-sm-2" id="inlineFormCustomSelect" v-on:change="obtenerClase">
                                    <option selected>Seleccionar Clase</option>
                                    <option value="CLUSTER">CLUSTER</option>
                                    <option value="COMPOSITION">COMPOSITION</option>
                                    <option value="ELEMENT">ELEMENT</option>
                                    <option value="ENTRY">ENTRY</option>
                                    <option value="EVALUATION">EVALUATION</option>
                                    <option value="FOLDER">FOLDER</option>
                                    <option value="SECTION">SECTION</option>
                                </select>
                                </div>
                            </div>
                            <div class="container">
                                <table class="table table-bordered">
                                    <thead class="table-success">
                                        <tr>
                                            <th scope="col">ID Arquetipo</th>
                                            <th scope="col">xml</th>
                                            <th scope="col">json</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="arquetipo of aArquetipos" :key="arquetipo.id">
                                            <td>{{ arquetipo['arquetipo'] }}</td>
                                            <td>
                                                <button type="button" @click="descargarXML(arquetipo['id'])" class="btn btn-secondary">
                                                    <span class="mdi mdi-file-code"></span>
                                                </button>
                                            </td>
                                            <td>
                                                <button type="button" @click="descargarJSON(arquetipo['id'])" class="btn btn-secondary">
                                                    <span class="mdi mdi-file-document-box"></span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="container" id="test">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
class Arquetipo {
    constructor(organizacion, modelo, clase, concepto, subconcepto, version, data) {
        this.organizacion = organizacion;
        this.modelo = modelo;
        this.clase = clase;
        this.concepto = concepto;
        this.subconcepto = subconcepto;
        this.version = version;
        this.data = data;
    }
}

export default {
    data() {
        return {
            arquetipo: new Arquetipo(),
            arquetipos: [], // se llena con datos de nuevo arquetipo
            aArquetipos: [],
            clase: ''
        }
    },

    methods: {
        obtenerClase: function(e) {
            this.clase = e.target.value;
            while(this.aArquetipos.length>0) this.aArquetipos.pop();
            this.obtenerArquetipos();      
        },

        descargarArchivo(contenidoEnBlob, nombreArchivo) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var save = document.createElement('a');
                save.href = event.target.result;
                save.target = '_blank';
                save.download = nombreArchivo || 'archivo.dat';
                var clicEvent = new MouseEvent('click', {
                    'view': window,
                        'bubbles': true,
                        'cancelable': true
                });
                save.dispatchEvent(clicEvent);
                (window.URL || window.webkitURL).revokeObjectURL(save.href);
            };
            reader.readAsDataURL(contenidoEnBlob);
        },

        obtenerDatos() {
            return {
                nombre: document.getElementById('inlineFormCustomSelect').value
            };
        },

        generarTexto(datos) {
            var texto = [];
            texto.push(datos);
            //El contructor de Blob requiere un Array en el primer parámetro, y el segundo parámetro
            //es el tipo MIME del archivo
            return new Blob(texto, {
                type: 'text/plain'
            });
        },

        obtenerArquetipos() {
            fetch('http://localhost:3000/api/arquetipos')
                .then(res => res.json())
                .then(data => {
                    this.arquetipos = data // datos de nuevo arquetipo
                    
                    for(var x=0; x<this.arquetipos.length; x++) {
                        if(this.clase==this.arquetipos[x].clase) {
                            this.arquetipo.organizacion = this.arquetipos[x].organizacion
                            this.arquetipo.modelo =  this.arquetipos[x].modelo
                            this.arquetipo.clase = this.arquetipos[x].clase
                            this.arquetipo.concepto = this.arquetipos[x].concepto
                            this.arquetipo.subconcepto = this.arquetipos[x].subconcepto
                            this.arquetipo.version = this.arquetipos[x].version
                            this.arquetipo.data = this.arquetipos[x].data
                            var idArquetipo = ''
                            if(this.arquetipo.subconcepto != '') {
                                idArquetipo = this.arquetipo.organizacion.concat('-', this.arquetipo.modelo, '-', this.arquetipo.clase, '.', this.arquetipo.concepto, '-', this.arquetipo.subconcepto, '.', this.arquetipo.version)
                                this.aArquetipos.push({ id: this.arquetipos[x]._id, arquetipo: idArquetipo })
                            } else {
                                idArquetipo = this.arquetipo.organizacion.concat('-', this.arquetipo.modelo, '-', this.arquetipo.clase, '.', this.arquetipo.concepto, '.', this.arquetipo.version)
                                this.aArquetipos.push({ id: this.arquetipos[x]._id, arquetipo: idArquetipo })
                            }
                        }
                    }
            });
        },

        descargarJSON(id) {
            fetch('http://localhost:3000/api/arquetipos/'+id)
                .then(res => res.json())
                .then(data => {
                    this.arquetipo = new Arquetipo(data.organizacion, data.modelo, data.clase, data.concepto, data.subconcepto, data.version, data.data)
                    var datos = this.arquetipo.data
                    var id = '' 
                    if(this.arquetipo.subconcepto != '') {
                        this.id = this.arquetipo.organizacion.concat('-', this.arquetipo.modelo, '-', this.arquetipo.clase, '.', this.arquetipo.concepto, '-', this.arquetipo.subconcepto, '.', this.arquetipo.version)
                        this.descargarArchivo(this.generarTexto(datos), this.id.concat('.json'))
                    } else {
                        this.id = this.arquetipo.organizacion.concat('-', this.arquetipo.modelo, '-', this.arquetipo.clase, '.', this.arquetipo.concepto, '.', this.arquetipo.version)
                        this.descargarArchivo(this.generarTexto(datos), this.id.concat('.json'))
                    }
                });
            this.arquetipo = '';
        },

        descargarXML(id) {
            fetch('http://localhost:3000/api/arquetipos/converxml/'+id)
                .then(res => res.json())
                .then(data => {
                    this.arquetipo = new Arquetipo(data.organizacion, data.modelo, data.clase, data.concepto, data.subconcepto, data.version, data.data)
                    //var datos = this.arquetipo.data
                });

            fetch('http://localhost:3000/api/arquetipos/recuperajson')
                .then(res => res.json())
                .then(data => {
                    var datos = data
                    var id = '' 
                    if(this.arquetipo.subconcepto != '') {
                        this.id = this.arquetipo.organizacion.concat('-', this.arquetipo.modelo, '-', this.arquetipo.clase, '.', this.arquetipo.concepto, '-', this.arquetipo.subconcepto, '.', this.arquetipo.version)
                        this.descargarArchivo(this.generarTexto(datos), this.id.concat('.xml'))
                    } else {
                        this.id = this.arquetipo.organizacion.concat('-', this.arquetipo.modelo, '-', this.arquetipo.clase, '.', this.arquetipo.concepto, '.', this.arquetipo.version)
                        this.descargarArchivo(this.generarTexto(datos), this.id.concat('.xml'))
                    }
                });
            //this.arquetipo = '';
        }
    }    
}
</script>