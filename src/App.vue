<!--component PARENT-->
<template>
  <section class="section">
    <div class="container">
      <h1 class="title">todosList</h1>
      <token @connect="connected"></token>

      <div class="columns">
        <div class="column is-full">
          <div class="card-lists columns" v-if="connect">
            <list
              v-for="list of allLists"
              v-bind:key="list.id"
              :title="list.title"
              :id="list.id"
              :cards="list.cards"
              @deleteList="deleteList"
            >
            </list>
          </div>
        </div>
        <div class="column buttons">
          <button
            class="button is-success is-fullwidth"
            id="addListButton"
            @click="openAddListModal"
            v-if="connect"
          >
            <span class="icon is-small">
              <i class="fas fa-plus"></i>
            </span>
            &nbsp; Ajouter une liste
          </button>
        </div>
      </div>
    </div>
    <add-list-modal @newList="newList"></add-list-modal>
  </section>
</template>

<script>
//on importe l'ensemble des modules et components nécessaires
import token from "./components/token.vue";
import list from "./components/list.vue";
import addListModal from "./components/addListModal.vue";
import { fetchApi } from "./modules/tools.js";

export default {
  //les components dont nous allons avoir besoins:
  components: {
    token,
    list,
    addListModal,
  },

  //les datas locales
  data() {
    return {
      connect: false,
      allLists: null,
      isActiveAddList: false,
    };
  },

  methods: {
    //methode permettant de récuperer les listes une fois connecter
    async connected(event) {
      try {
        this.connect = event;
        this.allLists = await fetchApi("/list");
      } catch (err) {
        console.error(err);
      }
    },

    //methode permettant d'afficher une liste créer via l'API
    newList(event) {
      this.allLists.push(event);
    },

    //methode permttant d'ouvri la modal pour ajouter une liste
    openAddListModal() {
      this.$el.querySelector("#addListModal").classList.add("is-active");
    },

    //methode permettant de supprimer du DOM une liste supprimer via l'API
    deleteList(event) {
      
      this.allLists = this.allLists.filter((list) => {
        return list.id != event;
      });
    },
  },
};
</script>