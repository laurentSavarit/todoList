<!--component LIST-->
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
    <div
      class="panel-block is-block has-background-light"
      @dragover="dragOver"
      @drop="drop"
    >
      <card
        v-for="card of allCards"
        v-bind:key="card.id"
        :title="card.title"
        :id="card.id"
        :order="card.order"
        :color="card.color"
        :tags="card.tags"
        @deleteCard="deleteCard"
      ></card>
    </div>
    <add-card-modal :list_id="id" @newCard="newCard"></add-card-modal>
  </div>
</template>

<script>
//on importe les modules et component nécessaires
import { fetchApi, dragAndDrop } from "../modules/tools.js";
import card from "./card.vue";
import addCardModal from "./addCardModal.vue";

export default {
  name: "list",

  //nous allons avoir besoin des components suivants:
  components: {
    card,
    addCardModal,
  },

  //on récuperes les data suivantes du component parent:
  props: {
    title:{
      type: String,
      required: true
    }, 
    id:{
      type: Number,
      required: true
    }, 
    cards:{
      type: Array,
      required: false
    } 
  },

  //les datas locales:
  data() {
    return {
      connected: this.connect,
      hidden: false,
      newTitle: this.title,
      allCards: this.cards,
    };
  },

  methods: {
    //methode permettant de récupérer toutes les listes
    async allList() {

      if (this.connect) {

        try {
          return await fetchApi("/list");

        } catch (err) {

          console.error(err);
        }
      } else {

        return false;
      }
    },

    //methode permettant d'afficher le formulaire pour modifier le titre
    handleChangeTitle() {
      this.hidden = true;
    },

    //methode permettant d'annuler la modification du titre
    escapeChangeTitle() {
      this.hidden = false;
    },

    //methode permettant de valider la modification de la liste via l'API
    async patchTitleList(event) {

      try {
        const patchData = new FormData(event.target);

        const request = await fetchApi(`/list/${this.id}`, "PATCH", patchData);

        if (request) {

          this.newTitle = request.title;
          this.hidden = false;
  
        } else {

          alert("Nous n'avons pas réussi à mettre à jour la liste...");
        }
      } catch (err) {

        console.error(err);
      }
    },

    //methode permttant de supprimer une liste via l'API
    async deleteList() {

      try {
        const requestDelete = await fetchApi(`/list/${this.id}`, "DELETE");

        if (requestDelete) {

          this.$emit("deleteList", this.id);

        } else {

          alert("Nous n'avons pas pu supprimer la liste...");
        }
      } catch (err) {
        
        console.error(err);
      }
    },

    //methode permttant d'afficher la modale pour ajouter une liste
    addCardOnList() {
      this.$el.querySelector(".addCardModal").classList.add("is-active");
    },

    //methode permettant d'ajouter une carte dans la liste
    newCard(event) {
      this.allCards.push(event);
    },

    //methode permettant de supprimer une carte de la liste
    deleteCard(event) {
      this.allCards = this.allCards.filter((card) => {
        return card.id != event;
      });
    },

    //methodes permettant de gérer le drag and drop au niveau de la liste
    dragOver(event) {
      dragAndDrop.dragOverList(event);
    },

    drop(event) {
      dragAndDrop.dropList(event);
    },
  },
};
</script>
