<template>
  <div class="column is-one-quarter panel listDrop" :data-list-id="id">
    <div class="panel-heading has-background-info">
      <div class="columns">
        <div class="column">
          <h2
            class="has-text-white"
            @dblclick="handleChangeTitle"
            :class="{ 'is-hidden': hidden }"
          >
            {{ title === newTitle ? title : newTitle }}
          </h2>

          <form
            action=""
            method="POST"
            :class="{ 'is-hidden': !hidden }"
            enctype="multipart/form-data"
            @submit.prevent="patchTitleList"
          >
            <input type="hidden" name="list_id" :value="id" />
            <div class="field has-addons">
              <div class="control">
                <input
                  type="text"
                  class="input is-small"
                  name="title"
                  :value="title === newTitle ? title : newTitle"
                  placeholder="Nom de la liste"
                  @keyup.esc="escapeChangeTitle"
                />
              </div>
              <div class="control">
                <button class="button is-small is-success">Valider</button>
              </div>
            </div>
          </form>
        </div>

        <div class="column is-narrow">
          <button
            class="is-pulled-right add-card-link button is-info"
            aria-label="Ajouter une carte dans la liste"
            title="Ajouter une carte dans la liste"
            @click="addCardOnList"
          >
            <span class="icon is-small has-text-white">
              <i class="fas fa-plus"></i>
            </span>
          </button>
          <button
            class="button is-info"
            aria-label="supprimer la liste"
            @click="deleteList"
            title="Supprimer la liste"
          >
            <span class="icon is-small has-text-danger">
              <i class="fas fa-trash-alt"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="panel-block is-block has-background-light">
      <card
        v-for="card of cards"
        v-bind:key="card.id"
        :title="card.title"
        :id="card.id"
        :order="card.order"
        :color="card.color"
      ></card>
    </div>
    <add-card-modal></add-card-modal>
  </div>
</template>

<script>
import { fetchApi } from "../modules/tools.js";
import card from "./card.vue";
import addCardModal from "./addCardModal.vue";

export default {
  name: "list",

  components: {
    card,
    addCardModal
  },

  props: {
    title: String,
    id: Number,
    cards: Array,
  },

  data() {
    return {
      connected: this.connect,
      hidden: false,
      newTitle: this.title,
    };
  },

  methods: {
    async allList() {
      console.log("valeur dans list", this.connected);
      if (this.connect) {
        return await fetchApi("/list");
      } else {
        return false;
      }
    },

    handleChangeTitle() {
      console.log("change title");
      this.hidden = true;
    },

    escapeChangeTitle() {
      this.hidden = false;
    },

    async patchTitleList(event) {
      const patchData = new FormData(event.target);

      const request = await fetchApi(`/list/${this.id}`, "PATCH", patchData);

      if (request) {
        this.newTitle = request.title;
        this.hidden = false;
        console.log(this.newTitle);
      } else {
        alert("Nous n'avons pas réussi à mettre à jour la liste...");
      }
    },

    async deleteList() {
      const requestDelete = await fetchApi(`/list/${this.id}`, "DELETE");
      if (requestDelete) {
        this.$emit("deleteList", this.id);
      } else {
        alert("Nous n'avons pas pu supprimer la liste...");
      }
    },

    addCardOnList(){
      this.$el.querySelector(".addCardModal").classList.add("is-active");
    }
  },
};
</script>
