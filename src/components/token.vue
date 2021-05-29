<template>
  <div v-if="!connected">
    <div class="field has-addons has-addons-centered div-token-add">
      <p class="control">
        <button class="button is-primary callNewToken" @click="fetchToken">
          Demander un token
        </button>
      </p>
      <p class="control is-expanded">
        <input
          class="input"
          type="text"
          placeholder="Votre token"
          id="token"
          readonly
          :value="newToken"
        />
      </p>
    </div>

    <form
      class="field has-addons has-addons-centered"
      method="POST"
      action=""
      id="connectApiWithToken"
    >
      <p class="control is-expanded">
        <input
          class="input"
          type="text"
          name="token"
          placeholder="Coller ici votre token"
          v-model="tokenValue"
        />
      </p>
      <p class="control">
        <button
          type="submit"
          class="button is-primary"
          @click.prevent="connect"
        >
          Se connecter
        </button>
      </p>
    </form>
  </div>
</template>
<script>
import { fetchApi, token } from "../modules/tools.js";

export default {
  name: "token",

  data() {
    return {
      newToken: "",
      tokenValue: "",
      connected: false,
    };
  },

  methods: {
    async fetchToken() {
      const response = await fetchApi();
      this.newToken = response;
    },

    connect() {
      token.push(this.tokenValue);
      this.connected = true;
      this.$emit("connect", this.connected);
    },
  },
};
</script>