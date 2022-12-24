<template>
  <div>
    <q-toolbar class="bg-red-10 text-white q-my-md shadow-2" id="toolbarHeader">
      <p class="text-h2 text-weight-bolder">MARMITECH</p>
      <p class="text-weight-bold text-h5 q-pl-lg q-mt-lg">
        Livorno Restaurante
      </p>
      <q-space />

      <q-btn-toggle v-model="model" flat stretch toggle-color="yellow" :options="options" />
    </q-toolbar>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      model: ref("cardapio"),

      options: [
        { label: "Cardápio", value: "cardapio", href: "/cardapio" },
        { label: "Sair", value: "sair", href: "/sair" },
      ],
    };
  },
};
</script>

<style>
#toolbarHeader {
  margin: 0;
}
</style>
