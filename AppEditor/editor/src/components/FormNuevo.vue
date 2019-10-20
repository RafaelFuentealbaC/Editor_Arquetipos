<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="agregarArquetipo">
                                <div class="form-group">
                                    <div class="form-group">
                                        <label for="inputAddress">Registro:</label>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" v-model="arquetipo.organizacion" placeholder="Organización" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <input type="text" v-model="arquetipo.modelo" placeholder="Modelo" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <select class="form-control custom-select" v-model="arquetipo.clase">
                                            <option selected>Seleccionar Clase</option>
                                            <option>Cluster</option>
                                            <option>Composition</option>
                                            <option>Element</option>
                                            <option>Entry</option>
                                            <option>Folder</option>
                                            <option>Section</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" v-model="arquetipo.concepto" placeholder="Concepto" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <input type="text" v-model="arquetipo.subconcepto" placeholder="Sub concepto" class="form-control">
                                    </div>
                                    <div class="form-group">
                                        <input type="text" v-model="arquetipo.lenguaje" placeholder="Lenguaje" class="form-control">
                                    </div>
                                    <fieldset disabled>
                                        <div class="form-group">
                                            <input type="text" v-model="arquetipo.version" id="disabledTextInput" class="form-control" placeholder="Versión 1">
                                        </div>
                                    </fieldset>
                                    <div class="form-group">
                                        <button class="btn btn-primary btn-block">Guardar</button>
                                    </div>
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
    constructor(organizacion, modelo, clase, concepto, subconcepto, lenguaje) {
        this.organizacion = organizacion;
        this.modelo = modelo;
        this.clase = clase;
        this.concepto = concepto;
        this.subconcepto = subconcepto;
        this.lenguaje = lenguaje;
        this.version = 'v1';
    }
}
export default {
    data() {
        return {
            arquetipo: new Arquetipo()
        }
    },

    created() {
        this.obtenerArquetipos();
    },

    methods: {
        obtenerArquetipos(){
            fetch('http://localhost:3000/api/arquetipos')
                .then(res => res.json())
                .then(data => console.log(data))
        },

        agregarArquetipo() {
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
            this.arquetipo = new Arquetipo();
        }
    }
}
</script>