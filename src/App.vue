<template>
  <section class="section">
    <div class="container">
      <h1 class="title">todosList</h1>
      <token @connect="connected"></token>

      <div class="columns">
        <div class="column is-full">
          <div class="card-lists columns" v-if="connect">
            <list v-for="list of allLists" v-bind:key="list.id" :title="list.title" :id="list.id">
            </list>
          </div>
        </div>
        <div class="column buttons">
          <button class="button is-success is-fullwidth" id="addListButton">
            <span class="icon is-small">
              <i class="fas fa-plus"></i>
            </span>
            &nbsp; Ajouter une liste
          </button>
          <button class="button is-danger is-fullwidth" id="deleteListButton">
            <span class="icon is-small">
              <i class="fas fa-ban"></i>
            </span>
            &nbsp; Supprimer une liste
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import token from "./components/token.vue";
import list from "./components/list.vue";
import {fetchApi} from "./modules/tools.js";


export default {
  components: {
    token,
    list
  },

  data() {
    return {
      connect: false,
      allLists: null,
    };
  },

  methods: {
    async connected(event) {
    this.connect = event;
     this.allLists = await fetchApi("/list");
    },
  },
};
</script>