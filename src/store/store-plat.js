// State : données du magasin
import { uid } from 'quasar'

const state = {
  dishes: [
    {
      id: 1,
      image: 'https://i.imgur.com/0umadnY.jpg',
      name: 'Burger',
      description: "Un hamburger est un sandwich composé d'une ou plusieurs tranches de viande hachée, généralement du bœuf, placées dans un petit pain ou une brioche.",
      rating: 4
    },
    {
      id: 2,
      image: 'https://i.imgur.com/b9zDbyb.jpg',
      name: 'Pizza',
      description: "La pizza est un plat savoureux d'origine italienne, consistant en une base généralement ronde et aplatie de pâte levée à base de blé.",
      rating: 5
    },
    {
      id: 3,
      image: 'https://i.imgur.com/wbAGiHi.jpeg',
      name: 'Petits choux',
      description:
        'Le chou de Bruxelles est une variété de chou, plante herbacée de la famille des Brassicaceae. C’est vraiment pas bon...',
      rating: 1
    },
    {
      id: 4,
      image: 'https://i.imgur.com/xAuhNVg.jpg',
      name: 'BBQ Ribs',
      description: 'Les BBQ ribs ou barbecue ribs sont des grands classiques très appréciés partout dans le monde.',
      rating: 5
    }
  ]
}

/*
Mutations : méthode qui manipule les données.
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  /**
   * Supprime un plat
   * @param state l'état
   * @param id l'id
   */
  deleteDish (state, id) {
    // Filtre les données du tableau et garde les plats dont l'id est différent de celui à supprimer
    state.dishes = state.dishes.filter(el => el.id !== id)
  },
  /**
   * Ajoute un plat
   * @param state l'état
   * @param plat le plat
   */
  addDish (state, plat) {
    state.dishes.push(plat)
  },
  /**
   * Modifie le plat
   * @param state l'état
   * @param plat le plat
   */
  editDish (state, plat) {
    // Récupère l'index du plat
    const index = state.dishes.findIndex(el => el.id === plat.id)
    // Si l'index existe
    if (index !== -1) {
      // Modifie le plat
      Object.assign(state.dishes[index], plat)
    }
  }
}

/*
Actions : méthodes du magasin qui font appel aux mutations.
Elles peuvent être asynchrones !
 */
const actions = {
  /**
   * Appelle la mutation qui supprime un plat
   * @param commit permet de déclencher la mutation
   * @param id l'id du plat
   */
  deleteDish ({ commit }, id) {
    commit('deleteDish', id)
  },
  /**
   * Appelle la mutation qui ajoute un plat
   * @param commit permet de déclencher la mutation
   * @param plat le plat
   */
  addDish ({ commit }, plat) {
    plat.id = uid()
    commit('addDish', plat)
  },
  /**
   * Appelle la mutation qui modifie un plat
   * @param commit permet de déclencher la mutation
   * @param plat le plat
   */
  editDish ({ commit }, plat) {
    commit('editDish', plat)
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les données
 */
const getters = {
  // Retourne les plats
  dishes: (state) => {
    return state.dishes
  }
}

/*
Exporte les constantes, variables du fichier
On pourra ainsi les récupérer, les importer dans un autre fichier JS.

namespace: true, ajoute un namespace à notre objet retourné.
 */
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
