<template>
  <q-card class="form-card">
    <q-card-section>
      <div class="text-h6 heading">{{ action }} Plat</div>
    </q-card-section>

    <q-card-section>

      <div class="row q-mb-md">
        <!-- NOM -->
        <q-input
          :rules="[
            value => !!value || 'Le nom est obligatoire',
            value => value.length <= 20 || 'Maximum de 20 caractères'
          ]"
          filled
          v-model="dish.name"
          label="Nom (Burger)"
          ref="name"
          class="col"/>
      </div>

      <div class="row q-mb-md">
        <!-- DESCRIPTION -->
        <q-input
          :rules="[
          value => value.length <= 155 || 'Maximum 155 caractères',
          ]"
          filled
          v-model="dish.description"
          label="Description"
          type="textarea"
          ref="description"
          class="col"/>
      </div>

      <div class="row q-mb-md">
        <!-- IMAGE -->
        <q-input
          filled
          v-model="dish.image"
          label="URL de l'image"
          class="col"/>
        <q-img
          :src="dish.image ? dish.image : 'statics/image-placeholder.png'"
          class="q-ml-sm"
          contain/>
      </div>

      <div class="q-mb-md">
        <div class="row">
          <p class="q-mb-none">Note:</p>
        </div>
        <div class="row">
          <!-- NOTE -->
          <q-rating
            v-model="dish.rating"
            size="2em"
            color="orange"/>
        </div>
      </div>

    </q-card-section>

    <q-card-actions align="right">
      <!-- BOUTON ANNULER -->
      <q-btn
        label="Annuler"
        color="grey"
        v-close-popup/>
      <!-- BOUTON SAUVEGARDER -->
      <q-btn
        label="Sauvegarder"
        color="primary"
        @click="formSubmit"/>
    </q-card-actions>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['action', 'dishToEdit'],
  data () {
    return {
      dish: {
        name: '',
        description: '',
        rating: 1,
        image: ''
      }
    }
  },
  methods: {
    ...mapActions('dishes', ['addDish', 'deleteDish', 'editDish']),
    /**
     * Valide le formulaire
     */
    formSubmit () {
      // Teste s'il n'y a pas d'erreurs
      if (this.$refs.name.validate() && this.$refs.description.validate()) {
        this.$emit('close')
        this.manageDish()
      }
    },
    /**
     * Permet d'ajouter ou de modifier un plat
     */
    manageDish () {
      // Si c'est un ajout
      if (this.action === 'ajouter') {
        this.addDish(this.dish)
        // Sinon, si c'est une modification
      } else if (this.action === 'modifier') {
        this.editDish(this.dish)
      }
    }
  },
  mounted () {
    // Si c'est une modification
    if (this.action === 'modifier') {
      // Assigne le plat à modifier au plat
      this.dish = Object.assign({}, this.dishToEdit)
    }
  }
}
</script>

<style>
.form-card {
  min-width: 400px;
}

.form-card .heading {
  text-transform: capitalize;
}

.form-card .q-card-section {
  width: 100%;
}

.thumbnail {
  max-width: 50px;
  max-height: 50px;
}

.form-card .q-img {
  height: 56px;
  width: 56px;
  border-radius: 10px;
}

.form-card .q-img__image {
  background-size: cover !important;
}

.form-card .q-rating__icon {
  opacity: 0.2;
}

.form-card .q-rating__icon--active {
  opacity: 1;
}
</style>
