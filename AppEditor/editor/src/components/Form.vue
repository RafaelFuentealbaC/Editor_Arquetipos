<template>
    <blockquote class="blockquote">
        <form>
          <v-text-field
            v-model="organization"
            :error-messages="organizationErrors"
            :counter="10"
            label="Organización"
            required
            @input="$v.organization.$touch()"
            @blur="$v.organization.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="model"
            :error-messages="modelErrors"
            :counter="10"
            label="Modelo"
            required
            @input="$v.model.$touch()"
            @blur="$v.model.$touch()"
          ></v-text-field>
          <v-select
            v-model="classSelect"
            :items="items"
            :error-messages="classSelectErrors"
            label="Clase"
            required
            @change="$v.classSelect.$touch()"
            @blur="$v.classSelect.$touch()"
          ></v-select>
          <v-text-field
            v-model="concept"
            :error-messages="conceptErrors"
            :counter="15"
            label="Concepto"
            required
            @input="$v.concept.$touch()"
            @blur="$v.concept.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="subconcept"
            :error-messages="subconceptErrors"
            :counter="10"
            label="Sub concepto"
            @input="$v.subconcept.$touch()"
            @blur="$v.subconcept.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="version"
            :error-messages="versionErrors"
            label="Versión"
            @input="$v.subconcept.$touch()"
            @blur="$v.subconcept.$touch()"
          ></v-text-field>
          <v-checkbox
            v-model="checkbox"
            :error-messages="checkboxErrors"
            label="¿Confirmar los datos?"
            required
            @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"
          ></v-checkbox>

          <v-btn class="mr-4" @click="submit">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </form>
    </blockquote>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength } from 'vuelidate/lib/validators'

  class Arquetipo {
    constructor(organization, model, classSelect, concept, subconcept, version) {
      this.organization = organization;
      this.model = model;
      this.classSelect = classSelect;
      this.concept = concept;
      this.subconcept = subconcept;
      this.version = version;
    }
  }

  export default {
    mixins: [validationMixin],

    validations: {
      organization: { required, maxLength: maxLength(10) },
      model: { required, maxLength: maxLength(10)},
      classSelect: { required },
      concept: { required, maxLength: maxLength(15) },
      subconcept: { maxLength: maxLength(10) },
      version: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data: () => ({
      organization: '',
      model: '',
      classSelect: null,
      items: [
        'Cluster',
        'Composition',
        'Element',
        'Entry',
        'Folder',
        'Section',
      ],
      concept: '',
      subconcept: '',
      version: 'v1',
      checkbox: false,
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('Debes aceptar para continuar')
        return errors
      },
      classSelectErrors () {
        const errors = []
        if (!this.$v.classSelect.$dirty) return errors
        !this.$v.classSelect.required && errors.push('Clase es requerida')
        return errors
      },
      organizationErrors () {
        const errors = []
        if (!this.$v.organization.$dirty) return errors
        !this.$v.organization.maxLength && errors.push('Organización debe tener como máximo 10 caracteres')
        !this.$v.organization.required && errors.push('Nombre organización es requerido.')
        return errors
      },
      modelErrors () {
        const errors = []
        if (!this.$v.model.$dirty) return errors
        !this.$v.model.maxLength && errors.push('Modelo debe tener como máximo 10 caracteres')
        !this.$v.model.required && errors.push('Modelo es requerido.')
        return errors
      },
      conceptErrors () {
        const errors = []
        if (!this.$v.concept.$dirty) return errors
        !this.$v.concept.maxLength && errors.push('Concepto debe tener como máximo 15 caracteres')
        !this.$v.concept.required && errors.push('Concepto es requerido.')
        return errors
      },
      subconceptErrors () {
        const errors = []
        if (!this.$v.subconcept.$dirty) return errors
        !this.$v.subconcept.maxLength && errors.push('Sub concepto debe tener como máximo 10 caracteres')
        return errors
      },
      versionErrors () {
        const errors = []
        if (!this.$v.version.$dirty) return errors
        !this.$v.version.required && errors.push('Versión es requerido.')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.organization = ''
        this.model = ''
        this.classSelect = null
        this.concept = ''
        this.subconcept = ''
        this.version = 'v1'
        this.checkbox = false
      },
    },
  }
</script>