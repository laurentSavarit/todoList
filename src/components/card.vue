<!--Component CARD-->
<template>
  <div
    class="box"
    :data-card-id="id"
    :data-card-order="card.order"
    draggable="true"
    :style="`border-bottom: solid 4px ${card.color}`"
    @dragstart="dragStart"
    @dragend="dragEnd"
  >
    <div class="tagList tags">
      <span
        class="tag icon add-tag-button has-text-primary"
        title="Ajouter un tag"
      >
        <i class="far fa-plus-square fa-lg"></i>
      </span>

      <form
        action=""
        method="POST"
        class="is-hidden formAddTag"
        enctype="multipart/form-data"
      >
        <div class="field has-addons">
          <div class="control">
            <input
              type="text"
              class="input is-small"
              name="title"
              value=""
              placeholder="Nom tu tag"
            />
          </div>
          <div class="control">
            <button class="button is-small is-success">Valider</button>
          </div>
        </div>
      </form>
    </div>
    <div class="columns">
      <div class="addCard column">
        {{ card.title }}
      </div>
      <form
        action=""
        method="POST"
        class="is-hidden formUpdateCard"
        enctype="multipart/form-data"
        @submit.prevent="modifyCardSubmit"
      >
        <input type="hidden" name="id" :value="id" />
        <div class="field has-addons">
          <div class="control">
            <input
              type="text"
              class="input is-small"
              name="title"
              :value="card.title"
              placeholder="Nom de la carte"
              @keyup.esc="deleteForm"
            />
          </div>
          <div class="control has-icons-left">
            <span class="icon is-left has-text-success">
              <i class="fas fa-palette"></i>
            </span>

            <input
              type="color"
              class="input is-small"
              name="color"
              :value="card.color"
            />
          </div>
          <div class="control">
            <button class="button is-small is-success">Valider</button>
          </div>
        </div>
      </form>
      <div class="column is-narrow">
        <button
          class="link-modify-card button is-white"
          aria-label="modifier la carte"
          @click="modifyCardForm"
        >
          <span class="icon is-small has-text-primary">
            <i class="fas fa-pencil-alt"></i>
          </span>
        </button>
        <button
          class="link-delete-card button is-white"
          aria-label="supprimer la carte"
          @click="deleteCard"
        >
          <span class="icon is-small has-text-danger">
            <i class="fas fa-trash-alt"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// on importe les outils nécessaires
import { fetchApi, dragAndDrop } from "../modules/tools.js";

export default {
  name: "card",

  //on recupere des datas du component parent
  props: {
    title: String,
    id: Number,
    order: Number,
    color: String,
  },
  //les datas locals
  data() {
    return {
      card: {
        title: this.title,
        order: this.order,
        color: this.color,
      },
    };
  },

  methods: {
    //methode permettant d'effacer une carte via l'API
    async deleteCard() {
      try {
        const request = await fetchApi(`/card/${this.id}`, "DELETE");
        if (request) {
          this.$emit("deleteCard", this.id);
        } else {
          alert("Nous n'avons pas réussi à supprimer la carte...");
        }
      } catch (err) {
        console.error(err);
      }
    },

    //methode permettant d'afficher le formulaire de midification de carte
    modifyCardForm() {
      this.$el.querySelector(".addCard").classList.add("is-hidden");
      this.$el.querySelector(".formUpdateCard").classList.remove("is-hidden");
    },

    //methode permettant de valider la modification de carte via l'API
    async modifyCardSubmit(event) {
      try {
        const modifyData = new FormData(event.target);
        const request = await fetchApi(`/card/${this.id}`, "PATCH", modifyData);
        if (request) {
          this.card = request;
          event.target.reset();
          this.deleteForm();
        } else {
          alert("Nous n'avons pas réussi a modifer la carte...");
        }
      } catch (err) {
        console.error(err);
      }
    },

    //methode permettant d'effacer le formulaire de modification de carte
    deleteForm() {
      this.$el.querySelector(".addCard").classList.remove("is-hidden");
      this.$el.querySelector(".formUpdateCard").classList.add("is-hidden");
    },

    //methodes pour gérer le drag and drop
    dragStart(event) {
      dragAndDrop.dragStartCard(event);
    },

    dragEnd(event) {
      dragAndDrop.dragEndCard(event);
    },
  },
};
</script>
