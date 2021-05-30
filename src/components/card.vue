<template>
  <div class="box" :data-card-id="id" :data-card-order="order" draggable="true" :style="`border-bottom: solid 4px ${color}`">
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
        {{ title }}
      </div>
      <form
        action=""
        method="POST"
        class="is-hidden formUpdateCard"
        enctype="multipart/form-data"
      >
        <input type="hidden" name="id" value="1" />
        <div class="field has-addons">
          <div class="control">
            <input
              type="text"
              class="input is-small"
              name="title"
              value=""
              placeholder="Nom de la carte"
            />
          </div>
          <div class="control has-icons-left">
            <span class="icon is-left has-text-success">
              <i class="fas fa-palette"></i>
            </span>

            <input type="color" class="input is-small" name="color" value="" />
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
        >
          <span class="icon is-small has-text-primary">
            <i class="fas fa-pencil-alt"></i>
          </span>
        </button>
        <button
          class="link-delete-card button is-white"
          aria-label="supprimer la carte"
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
export default {
  name: "card",

  props: {
    title: String,
    id: Number,
    order: Number,
    color: String
  },
};
</script>
