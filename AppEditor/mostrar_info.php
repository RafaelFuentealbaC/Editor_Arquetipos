<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <!-- Importa bootstrap, se usa ordenar los elementos -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

  <!-- Axios se usa para cargar la data json VueJS -->
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>

  <!-- VueJS se usa para mostrar la informacion -->
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
  <div class="container mt-4" id="app">
  <div class="row info-pannel">
   
<!-- Informacion basica -->
    <div id="pac" class="col-sm-4">
      <h1 v-for="user of users">{{  }}</h1>
      <p v-for="user of users">Nombre: {{ user.archetype_id.value}} </p> 
      <p v-for="user of users">Autor: {{ user.description.original_author[1].$t }} </p> 
      <p v-for="user of users">Proposito: {{ user.description.details[3].purpose }} </p> 
      <p v-for="user of users">Como utilizar: {{ user.description.details[3].use }} </p> 
      <p v-for="user of users">Como no utilizar: {{ user.description.details[3].misuse }} </p> 
    </div>

  </div>

  </div>
  <script>
    var app = new Vue({
      el: '#app', //Elemento de id app
      data: {
        users: [] //Se crea un arreglo con los datos recibidos de la estructura json
      },
      mounted: function() {
        axios.get('data.json') //Busca una estructura json en el servidor
            .then(response => {
              this.users = response.data;
              console.log(response);
            })
            .catch(error => { //Muestra error si la estructura no pudo cargarse
              console.log(error);
            });
      }
    })
  </script>
</body>
</html>