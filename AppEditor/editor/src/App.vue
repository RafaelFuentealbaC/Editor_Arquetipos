<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      color="grey lighten-4"
    >
      <v-list dense class="grey lighten-4">

        <v-subheader>Arquetipos</v-subheader>
        
        <v-list-item @click="v-on">
          <v-list-item-action>
            <v-icon large color="teal darken-2">mdi-newspaper</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Nuevo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="v-on">
          <v-list-item-action>
            <v-icon large color="teal darken-2">mdi-upload</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cargar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="v-on">
          <v-list-item-action>
            <v-icon large color="teal darken-2">mdi-download</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Descargar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="v-on">
          <v-list-item-action>
            <v-icon large color="teal darken-2">mdi-eye</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Vista</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="v-on">
          <v-list-item-action>
            <v-icon large color="teal darken-2">mdi-import</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Importar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="v-on">
          <v-list-item-action>
            <v-icon large color="teal darken-2">mdi-export</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Exportar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider :inset="inset"></v-divider>

        <v-list-item @click="v-on">
          <v-list-item-action>
            <v-icon large color="teal darken-2">mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Salir</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

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
      <v-text-field
        flat
        solo-inverted
        hide-details
        label="Buscar"
        class="hidden-sm-and-down"
      ></v-text-field>
      
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon large color="white" title="Iniciar Sesión">mdi-login</v-icon>
      </v-btn>
      
    </v-app-bar>

    <v-content fluid class="grey lighten-2 fill-height">
      
    </v-content>

    <v-footer app>
      <span>&copy; UCT 2019</span>
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
    }),
    created () {
      //this.$vuetify.theme.dark = false
    },
  }
</script>
