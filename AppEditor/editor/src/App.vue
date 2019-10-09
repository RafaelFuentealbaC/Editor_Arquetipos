<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="grey lighten-4"
    >
      <v-list dense class="grey lighten-4">

        <!-- <v-subheader>Arquetipos</v-subheader> -->
        
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
          <v-list-item-action>
            <v-icon large color="teal darken-2">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="link in linkfichas" :key="link.text" router :to="link.route">
          <v-list-item-action>
            <v-icon large color="teal darken-2">{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- <v-list-item >
          <v-list-item-action>
            <v-icon large color="teal darken-2">mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->

      </v-list>
    </v-navigation-drawer>
    

    <v-app-bar
      app
      clipped-left
      color="blue darken-3"
      dark
    >
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Editor</span>
      </v-toolbar-title>
     
      
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon large color="white" title="Iniciar Sesión">mdi-login</v-icon>
      </v-btn>
      
    </v-app-bar>

    <v-content fluid class="grey lighten-2 fill-height">
      <router-view></router-view>
    </v-content>

    <v-footer app>
      <span>&copy; Function Alpha, UCT 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      links: [
        { icon:'mdi-newspaper', text:'Nuevo', route:'/nuevo'},
        { icon:'mdi-upload', text:'Cargar', route:'/cargar'},
        { icon:'mdi-download', text:'Descargar', route:'/descargar'},
        { icon:'mdi-eye', text:'Vista', route:'/vista'},
        { icon:'mdi-import', text:'Importar', route:'/importar'},
        { icon:'mdi-export', text:'Exportar', route:'/exportar'},
      ],

      linkfichas: [
        { icon:'mdi-newspaper', text:'Fichas Clínicas', route:'/fichas' }
      ]
    }),
    created () {
      //this.$vuetify.theme.dark = false
    },
  }
</script>
