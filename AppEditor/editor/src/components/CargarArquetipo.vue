<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            <h6>Arquetipo:</h6>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="enviarArquetipo">
                                <div class="form-group">
                                    <div class="alert alert-info" role="alert">
                                        Sólo se aceptan archivos XML & JSON
                                    </div>
                                </div>
                                <div class="form-group">          
                                    <input type="file" name="file" id="archivo" class="form-control-file" accept=".xml, .json" required>
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-primary btn-block">Guardar</button>
                                </div>
                                <div id="test">
                                </div>
                            </form>
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

class ArquetipoData {
    constructor(data) {
        this.data = data;
    }
}

export default {
    data() {
        return {
            arquetipo_data: new ArquetipoData(),
            arquetipo: new Arquetipo(),
            edit: false
        }
    },

    methods: {
        enviarArquetipo() {
            var miArchivo = document.getElementById('archivo').files[0];
            var archivo = miArchivo.name;
            //this.arquetipo.data = miArchivo.name;

            if(archivo.includes('.xml') || archivo.includes('.json')) {
                if(archivo.includes('.xml')) {
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var output = document.getElementById('test');
                        output.textContent = e.target.result;
                    }
                    reader.readAsText(miArchivo);
                    var info = document.getElementById('test').textContent;
                    this.arquetipo_data.data = info;
                    fetch('http://localhost:3000/api/arquetipos/converxml', {
                        method: 'POST',
                        body: JSON.stringify(this.arquetipo_data),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data =>{
                        var split1 = data.identificador.split('-')
                        if(split1.length==3) {
                            this.arquetipo.organizacion = split1[0]
                            this.arquetipo.modelo = split1[1]
                            var split2 = split1[2].split('.')
                            this.arquetipo.clase = split2[0]
                            this.arquetipo.concepto = split2[1] 
                            this.arquetipo.version = split2[2]
                            this.arquetipo.data = data.data
                            this.arquetipo.subconcepto = ''
                            //console.log(this.arquetipo)
                            fetch('http://localhost:3000/api/arquetipos', {
                                method: 'POST',
                                body: JSON.stringify(this.arquetipo),
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-type': 'application/json'
                                }
                            })
                            .then(res => res.json())
                            .then(data => console.log(data))
                        }
                        
                        if(split1.length==4) { 
                            this.arquetipo.organizacion = split1[0]
                            this.arquetipo.modelo = split1[1]
                            var split2 = split1[2].split('.')
                            this.arquetipo.clase = split2[0]
                            this.arquetipo.concepto = split2[1]
                            var split3 = split1[3].split('.')
                            this.arquetipo.subconcepto = split3[0]
                            this.arquetipo.version = split3[1]
                            this.arquetipo.data = data.data
                            //console.log(this.arquetipo)
                            fetch('http://localhost:3000/api/arquetipos', {
                                method: 'POST',
                                body: JSON.stringify(this.arquetipo),
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-type': 'application/json'
                                }
                            })
                            .then(res => res.json())
                            .then(data => console.log(data))
                        }
                    })
                }
                if(archivo.includes('.json')) {
                    console.log('archivo de tipo json');
                }
            }
        }
    }
}
</script>