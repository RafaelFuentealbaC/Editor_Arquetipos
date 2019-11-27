<template>
    <div class="card">
        <div class="card-header">
            Buscar Arquetipos Registrados:
            <button class="mdi mdi-window-minimize" style="padding-left:250px;" @click="ocultarBuscador"></button>
            <button class="mdi mdi-window-maximize" style="padding-left:5px;" @click="mostrarBuscador"></button>
        </div>
        <div class="card body" id="buscador">
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
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="arquetipo of aArquetipos" :key="arquetipo.id">
                            <td>{{ arquetipo['arquetipo'] }}</td>
                            <td>
                                <button type="button" @click="verArquetipo(arquetipo['id'])" class="btn btn-secondary" style="display:block; margin-left:auto; margin-right:auto;">
                                    <span class="mdi mdi-eye"></span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="container" id="test">
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
    name: 'BuscarArquetipo',
    props: {
        lista: Array
    },

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

        obtenerArquetipos() {
            fetch('http://localhost:3000/api/arquetipos')
                .then(res => res.json())
                .then(data => {
                    this.arquetipos = data // datos de arquetipo
                    
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

        verArquetipo(id) {
            this.$emit('list-added',id)
        },

        ocultarBuscador() {
            var buscador = document.getElementById('buscador');
            buscador.style.display = 'none';            
        },

        mostrarBuscador() {
            var buscador = document.getElementById('buscador');
            buscador.style.display = 'block';            
        }
    }
}
</script>