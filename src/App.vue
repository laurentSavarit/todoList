<template>
  <section class="section">
    <div class="container">
      <h1 class="title">oKanban</h1>
      <token></token>

      <div class="columns">
        <div class="column is-full">
          <div class="card-lists columns"></div>
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

export default {
  components: {
    token
  }
};
</script>

