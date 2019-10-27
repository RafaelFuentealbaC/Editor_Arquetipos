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
    constructor(data) {
        this.data = data;
    }
}

export default {
    data() {
        return {
            arquetipo: new Arquetipo()
        }
    },

    methods: {
        validarTipo() {
            var miArchivo = document.getElementById('archivo').files[0];
            var nombre = miArchivo.name.split('.')[0];
            var tipo = miArchivo.name.split('.')[1];
            //this.arquetipo.data = miArchivo.name;

            if(tipo=="xml") {
                var reader = new FileReader();
                reader.onload = function(e) {
                    var output = document.getElementById('test');
                    output.textContent = e.target.result;
                }
                reader.readAsText(miArchivo);
                var info = document.getElementById('test').textContent;
                this.arquetipo.data = info;
                fetch('http://localhost:3000/api/arquetipos/cargar', {
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
        },

        enviarArquetipo() {
            const tipoArchivo = this.validarTipo();
            console.log(tipoArchivo);
            //fetch('http://localhost:3000/api/arquetipos/cargar')
                //.then(res => res.json())
                //.then(data => console.log(data));
        }
    }
}
</script>