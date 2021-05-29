<template>
  <div class="column is-one-quarter panel listDrop" data-list-id="A">
            <div class="panel-heading has-background-info">
                <div class="columns">

                    <div class="column">
                        <h2 class="has-text-white">Perso</h2>

                        <form action="" method="POST" class="is-hidden" enctype="multipart/form-data">
                            <input type="hidden" name="list_id" value="1">
                            <div class="field has-addons">
                                <div class="control">
                                    <input type="text" class="input is-small" name="title" value=""
                                        placeholder="Nom de la liste">
                                </div>
                                <div class="control">
                                    <button class="button is-small is-success">Valider</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="column is-narrow">
                        <button class="is-pulled-right add-card-link button is-info"
                            aria-label="Ajouter une carte dans la liste">
                            <span class="icon is-small has-text-white">
                                <i class="fas fa-plus"></i>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="panel-block is-block has-background-light">

            </div>
        </div>
</template>

<script>

import {fetchApi} from "../modules/tools.js";

export default {
    name:"list",

    data(){
        return{
            connected: this.connect
        }
    },

    methods:{
        async allList(){
            console.log("valeur dans list",this.connected);
            if(this.connect){
                return await fetchApi("/list");
            }else{
                return false;
            }
        }
    }
}
</script>
