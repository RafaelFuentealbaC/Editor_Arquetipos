<template>
    <div class="vista">
        <h1> Buscar arquetipo</h1>
         <v-text-field
        flat
        solo-inverted
        hide-details
        label="Ingrese nombre arquetipo"
        class="hidden-sm-and-down"
      ></v-text-field>
      <div class="card-body">
      <div class="card bg-info text-white">
      <div class="card-body" v-for="data of myJson">Nombre: {{ data.archetype_id.value}} </div> 
      </div>
      <div class="card bg-primary text-white">
      <div class="card-body" v-for="data of myJson">Autor: {{ data.description.original_author[1].$t }} </div> 
      </div>
      <div class="card bg-info text-white">
      <div class="card-body" v-for="data of myJson">Proposito: {{ data.description.details[3].purpose }} </div> 
      </div>
      <div class="card bg-primary text-white">
      <div class="card-body" v-for="data of myJson">Como utilizar: {{ data.description.details[3].use }} </div> 
      </div>
      <div class="card bg-info text-white">
      <div class="card-body" v-for="data of myJson">Como no utilizar: {{ data.description.details[3].misuse }} </div> 
      </div>
      </div>
    </div>

</template>

<script>
import json from './data.json'
      export default{
          data(){
              return{
                  myJson: json
              }
          }
      }
</script>


