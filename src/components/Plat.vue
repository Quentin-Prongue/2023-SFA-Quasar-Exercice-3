<template>
  <q-card
    class="card">
    <!-- IMAGE -->
    <q-img
      :src="dish.image"
      basic
      contain
    >
      <!-- NOM -->
      <div class="absolute-bottom text-h6">
        {{ dish.name }}
      </div>
    </q-img>

    <!-- NOTE -->
    <q-card-section>
      <q-rating
        readonly
        :model-value="dish.rating"
        size="2em"
        color="orange"
        class="q-mt-sm"
      />
    </q-card-section>

    <!-- DESCRIPTION -->
    <q-card-section class="description">
      <p v-if="dish.description">{{ dish.description }}</p>
      <i v-else>Aucune description fournie</i>
    </q-card-section>

    <q-card-actions
      class="absolute-bottom"
      align="right">
      <!-- BOUTON MODIFIER -->
      <q-btn
        @click="afficherFormPlat = true"
        icon="edit"
        color="blue"
        flat>Modifier
      </q-btn>
      <!-- BOUTON SUPPRIMER -->
      <q-btn
        @click.stop="confirmDeletion(dish.id)"
        icon="delete"
        color="red"
        flat>Supprimer
      </q-btn>
    </q-card-actions>

    <q-dialog
      v-model="afficherFormPlat">
      <form-plat action="modifier" @close="afficherFormPlat = false" :dishToEdit="dish"/>
    </q-dialog>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['dish'],
  data () {
    return {
      afficherFormPlat: false
    }
  },
  methods: {
    // Mappage des actions
    ...mapActions('plats', ['deleteDish']),
    // Ouvre une boite de dialogue pour confirmer la suppression
    confirmDeletion (id) {
      this.$q.dialog({
        title: 'Supprimer plat',
        message: 'Voulez-vous vraiment supprimer ce plat ?',
        cancel: 'Annuler',
        ok: 'Supprimer',
        persistent: true
      }).onOk(() => {
        this.deleteDish(id)
      })
    }
  },
  components: {
    'form-plat': require('components/FormPlat.vue').default
  }
}
</script>

<style>
.card {
  min-height: 400px;
  max-width: 250px;
  width: 250px;
  transition: background 0.3s;
}

.card-clickable {
  cursor: pointer;
}

.card-clickable:hover {
  background: #bdbdbd !important;
}

.card .q-img {
  max-height: 180px;
}

.card .q-img__image {
  background-size: cover !important;
}

.card .q-rating__icon {
  opacity: 0.2;
}

.card .q-rating__icon--active {
  opacity: 1;
}

.card .description {
  padding: 5px 16px;

}
</style>
