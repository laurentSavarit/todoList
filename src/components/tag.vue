<template>
  <div class="tagList tags">
    <span
      class="tag icon add-tag-button has-text-primary"
      title="Ajouter un tag"
      @click="addTagOfCardForm"
    >
      <i class="far fa-plus-square fa-lg"></i>
    </span>
    <span class="tag" v-for="tag of allTags" :key="tag.id">
      {{ tag.title }}
      <button
        class="delete is-small"
        aria-label="supprimer le tag"
        :data-tag-id="tag.id"
        @click="deleteTagOfCard($event, tag.id)"
      ></button>
    </span>
    <form
      action=""
      method="POST"
      class="is-hidden formAddTag"
      enctype="multipart/form-data"
      @submit.prevent="addNewTag"
    >
      <div class="field has-addons">
        <div class="control">
          <input
            type="text"
            class="input is-small"
            name="title"
            value=""
            placeholder="Nom tu tag"
            @keyup.esc="exitFormAddTag"
          />
        </div>
        <div class="control">
          <button class="button is-small is-success">Valider</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { fetchApi } from "../modules/tools.js";

export default {
  name: "tag",

  props: {
    tags: Array,
    cardId: Number,
  },

  data() {
    return {
      allTags: this.tags,
    };
  },

  methods: {
    async deleteTagOfCard(event, tagId) {
      const requestDeleteAssoc = await fetchApi(
        `/card/${this.cardId}/tag/${tagId}`,
        "DELETE"
      );
      requestDeleteAssoc
        ? event.target.parentNode.remove()
        : alert("Nous n'avons pas réussi à supprimer le tag...");
    },

    async addNewTag(event) {
      const tag = new FormData(event.target);
      const responseTag = await fetchApi("/tag", "POST", tag);
      responseTag
        ? responseTag
        : alert("Nous n'avons pas réussi à récupérer ou créer le tag...");
      const tagId = new FormData();
      tagId.set("tagId", responseTag[0].id);
      const assoCardTag = await fetchApi(
        `/card/${this.cardId}/tag`,
        "POST",
        tagId
      );
      assoCardTag
        ? assoCardTag
        : alert("Nous n'avons pas réussi à faire l'association...");
      this.exitFormAddTag();

      //on verifie si le tag est déja présent sur la carte...
      const allTags = this.$el.querySelectorAll(".tag");

      let control = true;
      allTags.forEach(tag=>tag.textContent == responseTag[0].title ? control=false : null);

      if (this) {
        this.allTags.push(responseTag[0]);
      } else {
        alert("Le tag existe déja sur cette carte...");
      }
      event.target.reset();
    },

    addTagOfCardForm() {
      this.$el
        .querySelectorAll(".tag")
        .forEach((tag) => tag.classList.add("is-hidden"));
      const form = this.$el.querySelector(".formAddTag");
      form.classList.remove("is-hidden");
    },

    exitFormAddTag() {
      this.$el
        .querySelectorAll(".tag")
        .forEach((tag) => tag.classList.remove("is-hidden"));
      const form = this.$el.querySelector(".formAddTag");
      form.classList.add("is-hidden");
    },
  },

  computed: {},
};
</script>
