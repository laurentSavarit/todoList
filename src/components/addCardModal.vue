<template>
  <div class="modal addCardModal">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      <form
        action=""
        method="POST"
        id="addCard"
        enctype="multipart/form-data"
        @submit.prevent="addNewCard"
      >
        <header class="modal-card-head">
          <p class="modal-card-title">Ajouter une Carte</p>
          <button
            class="delete close"
            type="button"
            aria-label="close"
            @click="closeModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Nom</label>
            <div class="control">
              <input
                type="text"
                class="input"
                name="title"
                value=""
                placeholder="Nom de la liste"
              />
              <input
                type="hidden"
                class="input"
                name="list_id"
                :value="list_id"
              />
            </div>
            <label class="label">Tag</label>
            <div class="control">
              <input
                type="text"
                class="input"
                name="tag"
                value=""
                placeholder="Nom du tag"
              />
            </div>
            <label class="label">Choisir une couleur</label>
            <div class="control has-icons-left">
              <input type="color" class="input" name="color" value="#000000" />
              <span class="icon is-left has-text-success">
                <i class="fas fa-palette"></i>
              </span>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Valider la carte</button>
          <button class="button close" type="button" @click="closeModal">
            Annuler
          </button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
import { fetchApi } from "../modules/tools.js";

export default {
  name: "addCardModal",

  props: {
    list_id: Number,
  },

  methods: {
    closeModal() {
      document
        .querySelectorAll(".addCardModal")
        .forEach((modal) => modal.classList.remove("is-active"));
    },

    async addNewCard(event) {
      const newCard = new FormData(event.target);
      const request = await fetchApi("/card", "POST", newCard);
      if (request) {
        event.target.reset();
        this.$emit("newCard", request);
        this.closeModal();
      } else {
        alert("Nous n'avons pas réussi à créer la nouvelle carte...");
      }
    },
  },
};
</script>
