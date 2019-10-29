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
                            <table class="table table-bordered">
                                <thead class="table-success">
                                    <tr>
                                        <th scope="col">ID Arquetipo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="arquetipo of aArquetipos" :key="arquetipo.id">
                                        <td>{{ arquetipo }}</td>
                                        <td>
                                            <button type="button" @click="descargarArquetipo(arquetipo._id)" class="btn btn-secondary" style="margin-right:10px;">
                                                <span class="mdi mdi-cloud-download"></span>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
            aArquetipos: []
        }
    },

    created() {
        this.obtenerArquetipos();
    },

    methods: {
        obtenerArquetipos(){
            fetch('http://localhost:3000/api/arquetipos')
                .then(res => res.json())
                .then(data => {
                    this.arquetipos = data // datos de nuevo arquetipo
                    for(var x=0; x<this.arquetipos.length; x++) {
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
                            this.aArquetipos.push(idArquetipo)
                        } else {
                            idArquetipo = this.arquetipo.organizacion.concat('-', this.arquetipo.modelo, '-', this.arquetipo.clase, '.', this.arquetipo.concepto, '.', this.arquetipo.version)
                            this.aArquetipos.push(idArquetipo)
                        }
                    }
            });
        }
    }    
}
</script>