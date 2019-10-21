<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <div class="card">
                        <div class="card-header">
                            <h6>Registro:</h6>
                        </div>
                        <div class="card-body">
                            <form @submit.prevent="enviarArquetipo">
                                <div class="form-group">
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
                                        <template v-if="edit==false">
                                            <button class="btn btn-primary btn-block">Guardar</button>
                                        </template>
                                        <template v-else>
                                            <button class="btn btn-info btn-block">Actualizar</button>
                                        </template>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-md-9">
                    <div class="card">
                        <div class="card-header">
                            <h6>Agregado:</h6>
                        </div>
                        <div class="card-body">
                            <table class="table table-bordered">
                                <thead class="table-success">
                                    <tr>
                                        <th scope="col">Organización</th>
                                        <th scope="col">Modelo</th>
                                        <th scope="col">Clase</th>
                                        <th scope="col">Concepto</th>
                                        <th scope="col">Subconcepto</th>
                                        <th scope="col">Lenguaje</th>
                                        <th scope="col">Versión</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="arquetipo of arquetipos" :key="arquetipo.id">
                                        <td>{{ arquetipo.organizacion }}</td>
                                        <td>{{ arquetipo.modelo }}</td>
                                        <td>{{ arquetipo.clase }}</td>
                                        <td>{{ arquetipo.concepto }}</td>
                                        <td>{{ arquetipo.subconcepto }}</td>
                                        <td>{{ arquetipo.lenguaje }}</td>
                                        <td>{{ arquetipo.version }}</td>
                                        <td>
                                            <button type="button" @click="actualizarArquetipo(arquetipo._id)" class="btn btn-secondary" style="margin-right:10px;">
                                                <span class="mdi mdi-border-color"></span>
                                            </button>
                                            <button type="button" @click="eliminarArquetipo(arquetipo._id)" class="btn btn-danger">
                                                <span class="mdi mdi-delete"></span>
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
            arquetipo: new Arquetipo(),
            arquetipos: [], // se llena con datos de nuevo arquetipo
            edit: false, // verifica si está guardando o actualizando
            arquetipoAEditar: '' // id de tarea a actualizar
        }
    },

    created() {
        this.obtenerArquetipos();
    },

    methods: {
        obtenerArquetipos(){
            fetch('http://localhost:3000/api/arquetipos/nuevo')
                .then(res => res.json())
                .then(data => {
                    this.arquetipos = data // datos de nuevo arquetipo
                    //console.log(this.arquetipos)
                });
        },

        enviarArquetipo() {
            if(this.edit === false) {
                fetch('http://localhost:3000/api/arquetipos', {
                    method: 'POST',
                    body: JSON.stringify(this.arquetipo),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.obtenerArquetipos();
                })
            } else {
                fetch('http://localhost:3000/api/arquetipos/'+this.arquetipoAEditar, {
                    method: 'PUT',
                    body: JSON.stringify(this.arquetipo),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.obtenerArquetipos();
                    this.edit = false;
                });
            }
            this.arquetipo = new Arquetipo();
        },

        actualizarArquetipo(id) {
            fetch('http://localhost:3000/api/arquetipos/'+id)
                .then(res => res.json())
                .then(data => {
                    this.arquetipo = new Arquetipo(data.organizacion, data.modelo, data.clase, data.concepto, data.subconcepto, data.lenguaje, data.version);
                    this.arquetipoAEditar = data._id;
                    this.edit = true;
                });
        },

        eliminarArquetipo(id) {
            fetch('http://localhost:3000/api/arquetipos/'+id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                this.obtenerArquetipos();
            }) 
        }
    }
}
</script>