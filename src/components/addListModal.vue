<!--component ListModal-->
<template>
  <div class="modal" id="addListModal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <form
        action=""
        method="POST"
        id="addList"
        enctype="multipart/form-data"
        @submit.prevent="postNewList"
      >
        <header class="modal-card-head">
          <p class="modal-card-title">Ajouter une liste</p>
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
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Save changes</button>
          <button class="button close" type="button" @click="closeModal">
            Cancel
          </button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
//on importe les modules nécessaires
import { fetchApi } from "../modules/tools.js";

export default {
  name: "modalAddList",

  methods: {
    //methode permettant de fermer la modale
    closeModal() {
      document.querySelector("#addListModal").classList.remove("is-active");
    },

    //methode permettant de valider via l'API l'ajout d'une liste
    async postNewList(event) {
      try {
        const newList = new FormData(event.target);
        const request = await fetchApi("/list", "POST", newList);
        if (request) {
          this.closeModal();
          this.$emit("newList", request);
          event.target.reset();
        } else {
          alert("Nous n'avons pas réussi à créer la liste...");
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
