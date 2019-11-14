<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            Buscar Arquetipos Registrados:
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
                </div>

                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header">
                            Árbol de Arquetipo
                        </div>
                        <div class="card body">
                            <div>
                                <button @click="addNode">Add Node</button>
                                <vue-tree-list
                                @click="onClick"
                                @change-name="onChangeName"
                                @delete-node="onDel"
                                @add-node="onAddNode"
                                :model="data"
                                default-tree-node-name="new node"
                                default-leaf-node-name="new leaf"
                                v-bind:default-expanded="false">
                                <span class="icon" slot="addTreeNode">addTreeNode</span>
                                <span class="icon" slot="addLeafNode">addLeafNode</span>
                                <span class="icon" slot="editNode">editNode</span>
                                <span class="icon" slot="delNode">delNode</span>
                                </vue-tree-list>
                                <button @click="getNewTree">Get new tree</button>
                                <pre>
                                {{newTree}}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { VueTreeList, Tree, TreeNode } from 'vue-tree-list';

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
    components: {
        VueTreeList
    },

    data() {
        return {
            arquetipo: new Arquetipo(),
            arquetipos: [], // se llena con datos de nuevo arquetipo
            aArquetipos: [],
            clase: '',
            newTree: {},
            data: new Tree([
            {
                name: 'Node 1',
                id: 1,
                pid: 0,
                dragDisabled: true,
                addTreeNodeDisabled: true,
                addLeafNodeDisabled: true,
                editNodeDisabled: true,
                delNodeDisabled: true,
                children: [
                {
                    name: 'Node 1-2',
                    id: 2,
                    isLeaf: true,
                    pid: 1
                }
                ]
            },
            {
                name: 'Node 2',
                id: 3,
                pid: 0,
                disabled: true
            },
            {
                name: 'Node 3',
                id: 4,
                pid: 0
            }
            ])
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

        verArquetipo() {
            //console.log('hola');
            var dato = document.getElementById('tree');
            dato.mdbTreeView();
        },

        onDel (node) {
            console.log(node)
            node.remove()
        },
    
        onChangeName (params) {
            console.log(params)
        },
    
        onAddNode (params) {
            console.log(params)
        },
    
        onClick (params) {
            console.log(params)
        },
    
        addNode () {
            var node = new TreeNode({ name: 'new node', isLeaf: false })
            if (!this.data.children) this.data.children = []
            this.data.addChildren(node)
        },
    
        getNewTree () {
            var vm = this
            function _dfs (oldNode) {
            var newNode = {}
    
            for (var k in oldNode) {
                if (k !== 'children' && k !== 'parent') {
                newNode[k] = oldNode[k]
                }
            }
    
            if (oldNode.children && oldNode.children.length > 0) {
                newNode.children = []
                for (var i = 0, len = oldNode.children.length; i < len; i++) {
                newNode.children.push(_dfs(oldNode.children[i]))
                }
            }
            return newNode
            }
    
            vm.newTree = _dfs(vm.data)
        }
    }
}
</script>