<template>
  <div class="modal addCardModal">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-card">
      <form action="" method="POST" id="addCard" enctype="multipart/form-data">
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
              <input type="hidden" class="input" name="list_id" value="" />
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
          <button class="button is-success">Save changes</button>
          <button class="button close" type="button" @click="closeModal">Cancel</button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "addCardModal",

  methods: {
    closeModal() {
      document.querySelectorAll(".addCardModal").forEach(modal=>modal.classList.remove("is-active"));
    },
  },
};
</script>
